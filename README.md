# Bali Web Studio — Next.js project

A clean, professional business website built with Next.js 14 and Tailwind CSS. Dynamic pages, an email contact form, and structured content.

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
- `GEMINI_API_KEY`: Google Gemini API key that powers the AI widget (omit it to use the built-in offline fallback copy)

### Notes

- All marketing copy is paraphrased in English based on your brief.
- Replace placeholder assets in `/public` and update portfolio items in `/app/portfolio/page.tsx`.
