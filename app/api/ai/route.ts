
import { NextRequest, NextResponse } from "next/server";
import { createClient } from 'redis';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuration
const REDIS_URL = process.env.REDIS_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EMBEDDING_MODEL = 'text-embedding-004';
const GENERATIVE_MODEL = 'gemini-1.5-flash';
const REDIS_INDEX_NAME = 'blog-posts-index';
const TOP_K = 3; // Number of relevant chunks to retrieve

// --- Client Initialization ---
if (!REDIS_URL || !GEMINI_API_KEY) {
    throw new Error("Missing required environment variables: REDIS_URL and/or GEMINI_API_KEY");
}
// Use a global variable to hold the client connection
let redisClient;

async function getRedisClient() {
    if (!redisClient) {
        redisClient = createClient({ url: REDIS_URL });
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
    }
    return redisClient;
}


const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });
const generativeModel = genAI.getGenerativeModel({ model: GENERATIVE_MODEL });
// --- End Client Initialization ---


// Helper to build conversation for Gemini
const buildConversation = (userQuery: string, context: string) => {
  const systemPrompt = `Anda adalah "BaliWebDev AI", asisten AI yang ramah dan sangat membantu di situs web pribadi Putu Astika.
Misi Anda adalah memberikan jawaban yang akurat, relevan, dan ringkas berdasarkan informasi yang diberikan.
Gunakan HANYA informasi dari konteks di bawah ini untuk menjawab pertanyaan pengguna.
Jangan pernah menyebutkan bahwa Anda memiliki akses ke "konteks" atau "informasi yang diberikan". Jawablah seolah-olah Anda sudah mengetahui informasi ini.
Jika konteks tidak cukup untuk menjawab pertanyaan, katakan dengan sopan bahwa Anda tidak dapat menemukan informasi yang relevan di dalam basis pengetahuan yang ada.

Berikut adalah konteks yang relevan dari beberapa artikel blog:
---
${context}
---

Selalu berkomunikasi dalam Bahasa Indonesia, kecuali jika diminta sebaliknya.`;

  return [
    { role: "user", parts: [{ text: systemPrompt }] },
    { role: "model", parts: [{ text: "Tentu, saya siap membantu. Apa pertanyaan Anda?" }] },
  ];
};


export async function POST(req: NextRequest) {
    try {
        const client = await getRedisClient();

        const payload = await req.json();
        const messages = payload?.messages ?? [];
        const lastUserMessage = messages.findLast((m) => m.role === 'user')?.content;

        if (!lastUserMessage) {
            return NextResponse.json({ reply: { content: "Maaf, saya tidak menerima pesan apa pun." } }, { status: 400 });
        }

        // 1. Create embedding for the user's query
        const embeddingResult = await embeddingModel.embedContent(lastUserMessage);
        const queryEmbedding = Buffer.from(new Float32Array(embeddingResult.embedding.values).buffer);

        // 2. Perform Vector Similarity Search in Redis
        const searchQuery = `*=>[KNN ${TOP_K} @embedding $query_vector AS vector_score]`;

        const searchResults = await client.ft.search(
            REDIS_INDEX_NAME,
            searchQuery,
            {
                PARAMS: {
                    query_vector: queryEmbedding,
                },
                RETURN: ['title', 'content', 'slug', 'vector_score'],
                DIALECT: 2,
            }
        );

        // 3. Construct the context from search results
        let context = "Tidak ada konteks relevan yang ditemukan dalam artikel blog.";
        if (searchResults.documents.length > 0) {
            context = searchResults.documents
                .map(doc => `Judul Artikel: ${doc.value.title}\nKonten: ${doc.value.content}`)
                .join("\n\n---\n\n");
        }

        // 4. Build the final prompt and call Gemini
        const conversationHistory = buildConversation(lastUserMessage, context);

        const chat = generativeModel.startChat({
            history: conversationHistory,
        });

        const result = await chat.sendMessage(lastUserMessage);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ reply: { content: text } });

    } catch (error) {
        console.error("[/api/ai] Error:", error);
        const message = error instanceof Error ? error.message : "Terjadi kesalahan internal.";
        return NextResponse.json({ reply: { content: `Maaf, terjadi kesalahan: ${message}` } }, { status: 500 });
    }
}
