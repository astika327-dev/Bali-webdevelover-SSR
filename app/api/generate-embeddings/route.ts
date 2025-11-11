
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAllPostsMetaCached } from '@/app/lib/posts';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Re-importing 'server-only' to ensure this module doesn't run on the client
import 'server-only';

const contentDirectory = path.join(process.cwd(), 'content');

// --- Configuration ---
const REDIS_URL = process.env.REDIS_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const INDEXING_SECRET = process.env.INDEXING_SECRET; // Secret to protect this endpoint
const EMBEDDING_MODEL = 'text-embedding-004';
const REDIS_INDEX_NAME = 'blog-posts-index';
const REDIS_KEY_PREFIX = 'post:';

// Helper to chunk text for better embedding accuracy
function chunkText(text, chunkSize = 500, overlap = 50) {
    const chunks = [];
    let i = 0;
    while (i < text.length) {
        chunks.push(text.slice(i, i + chunkSize));
        i += chunkSize - overlap;
    }
    return chunks;
}

export async function POST(req: NextRequest) {
    // 1. Authenticate the request
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${INDEXING_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!REDIS_URL || !GEMINI_API_KEY) {
        return NextResponse.json(
            { error: "Missing required environment variables: REDIS_URL and/or GEMINI_API_KEY" },
            { status: 500 }
        );
    }

    try {
        console.log("Connecting to services...");
        const redisClient = createClient({ url: REDIS_URL });
        await redisClient.connect();

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });

        console.log("Fetching all blog posts metadata...");
        const posts = await getAllPostsMetaCached();
        console.log(`Found ${posts.length} posts to process.`);

        // Clear old data
        const oldKeys = await redisClient.keys(`${REDIS_KEY_PREFIX}*`);
        if(oldKeys.length > 0) {
            console.log(`Deleting ${oldKeys.length} old keys...`);
            await redisClient.del(oldKeys);
        }

        console.log("Processing and generating embeddings for each post...");
        for (const post of posts) {
            const filePath = path.join(contentDirectory, 'blog', `${post.slug}.mdx`);
            const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
            const { content } = matter(fileContent);

            const cleanedContent = content.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, ' ').trim();
            const chunks = chunkText(cleanedContent);

            console.log(`  - Processing post: ${post.frontmatter.title} (${chunks.length} chunks)`);

            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                const embeddingResult = await model.embedContent(chunk);
                const embedding = embeddingResult.embedding.values;

                const key = `${REDIS_KEY_PREFIX}${post.slug}:${i}`;

                // Storing as JSON strings
                await redisClient.json.set(key, '$', {
                    slug: post.slug,
                    title: post.frontmatter.title,
                    content: chunk,
                    embedding: embedding, // Store as array of numbers
                });
            }
        }

        console.log("Embeddings generated and stored in Redis as JSON.");

        console.log("Checking for existing Redis index...");
        try {
            await redisClient.ft.dropIndex(REDIS_INDEX_NAME);
            console.log("Existing index dropped.");
        } catch (e) {
            if (e.message.includes('Unknown Index name')) {
                console.log("No existing index found. Creating a new one.");
            } else {
                throw e;
            }
        }

        console.log("Creating new Redis search index...");
        await redisClient.ft.create(
            REDIS_INDEX_NAME,
            {
                '$.slug': { AS: 'slug', type: 'TAG' },
                '$.title': { AS: 'title', type: 'TEXT' },
                '$.content': { AS: 'content', type: 'TEXT' },
                '$.embedding': {
                    AS: 'embedding',
                    type: 'VECTOR',
                    ALGORITHM: 'HNSW',
                    TYPE: 'FLOAT32',
                    DIM: 768, // Dimension for text-embedding-004
                    DISTANCE_METRIC: 'COSINE',
                },
            },
            {
                ON: 'JSON',
                PREFIX: REDIS_KEY_PREFIX,
            }
        );

        await redisClient.quit();
        console.log("Index created successfully.");
        return NextResponse.json({ success: true, message: `Successfully indexed ${posts.length} posts.` });

    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred.";
        console.error("Indexing failed:", message);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
