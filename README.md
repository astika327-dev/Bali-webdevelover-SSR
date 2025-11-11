# Bali Web Studio — Next.js project

A clean, professional business website built with Next.js 14 and Tailwind CSS. Dynamic pages, an email contact form, and structured content.

## Features

- **Blog System**: Fully-featured blog with posts written in MDX.
- **Portfolio Showcase**: A dedicated page to display portfolio projects.
- **Services Page**: A page to list and describe the services offered.
- **Contact Form**: A functional contact form with email notifications.
- **AI Chat Widget**: An integrated AI chat widget powered by Google Gemini for user assistance.
- **TensorFlow.js Integration**: On-page object detection using TensorFlow.js.
- **Multi-language Support (i18n)**: Supports English and Indonesian languages.
- **Dark/Light Mode**: Theme toggle for user preference.
- **Search Functionality**: A search bar to find content within the site.
- **Social Sharing**: Buttons to easily share blog posts on social media.
- **Comments Section**: A comments section for blog posts.
- **SEO Optimized**: Automatic sitemap generation and other SEO best practices.
- **Responsive Design**: Built with Tailwind CSS for a mobile-first responsive layout.

## Getting started

1. Install dependencies
```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in SMTP + contact details
```bash
cp .env.example .env.local
```

3. Run the dev server
```bash
npm run dev
```

4. Build for production
```bash
npm run build && npm start
```

### Environment variables

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`: SMTP credentials for contact form
- `CONTACT_TO`: where submissions are delivered
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: phone number for the WhatsApp link (digits only)
- `NEXT_PUBLIC_PUBLIC_EMAIL`: email shown on the contact page

- `GEMINI_API_KEY`: Google Gemini API key that powers the AI widget. The route uses the `gemini-2.5-flash` model on the v1 REST API; omit the key to fall back to the offline copy bundled with the site.

### Debugging the AI widget

- Hit [`/api/diag`](http://localhost:3000/api/diag) to confirm the deployed build is targeting the Gemini v1 REST endpoint and that the `GEMINI_API_KEY` is available.
- When Gemini is unreachable the API route responds with curated fallback advice and a `meta.warning` string that the widget displays inline, so you still see guidance even without a live model.


### Notes

- All marketing copy is paraphrased in English based on your brief.
- Replace placeholder assets in `/public` and update portfolio items in `/app/portfolio/page.tsx`.
