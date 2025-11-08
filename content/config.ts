
export type Certificate = { title: string; href: string };
export type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
};

export type Stat = {
  value: string;
  label: string;
  description: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  locale?: 'en' | 'id';
};

export type Client = {
  name: string;
  href?: string;
};
export const site = {
  company: "Bali-WebDevelover",
  tagline: "Clean, speedy websites that convert",
  blurb:
    "We craft lean, high‑polish websites, landing pages, and micro apps for founders, villas, cafés, and growing brands. Built with solid fundamentals so Google and humans both approve.",
  location: "Bali, Indonesia",
  taglineId: "Website profesional yang terasa premium namun tetap ringan",
  mission:
    "We help hospitality brands, founders, and boutique businesses look global-ready without losing their local soul.",
}; 

export const certificates: Certificate[] = [
  { title: "freeCodeCamp — Front End Development Libraries", href: "https://www.freecodecamp.org/certification/astika/front-end-development-libraries" },
  { title: "freeCodeCamp — Responsive Web Design", href: "https://www.freecodecamp.org/certification/astika/responsive-web-design" },
  { title: "freeCodeCamp — JavaScript Algorithms & Data Structures", href: "https://www.freecodecamp.org/certification/astika/javascript-algorithms-and-data-structures-v8" }
];

export const portfolio = [
  {
    title: 'MiniTools — Developer Utilities Suite',
  description:
    'A fast, privacy-friendly collection of micro utilities for everyday work: formatters, encoders/decoders, generators, and quick helpers. Built with Next.js and Tailwind for snappy UX.',
    link: 'https://astika327-dev.github.io/minitools/',
    images: [
      '/screenshot/minitools-1.png',
      '/screenshot/minitools-2.png',
      '/screenshot/minitools-3.png',
      '/screenshot/minitools-4.png'
    ]
  },
  {
    title: 'OpsPlaybook — Hospitality Toolkit',
    description:
      'Operational guide and digital SOP dashboard for villa and hospitality management. Focused on team clarity, scalability, and workflow automation.',
    link: 'https://astika327-dev.github.io/opsplaybook-hospitality/',
    images: [
      '/screenshot/opsplaybook-1.png',
      '/screenshot/opsplaybook-2.png',
      '/screenshot/opsplaybook-3.png'
    ]
  },
  {
    title: 'Personal Site — astika.is-a.dev',
    description:
      'Personal branding website built with minimalism and performance in mind. Showcasing portfolio, ideas, and technical notes.',
    link: 'https://astika.is-a.dev',
    images: [
      '/screenshot/personalsite-1.png',
      '/screenshot/personalsite-2.png'
    ]
  },
  {
    title: 'U2CleanPro',
    description:
      'A clean, modern, and responsive website for U2Cleanpro. Professional cleaning services.',
    link: 'https://cleanpro-beryl.vercel.app/',
    images: [
      '/screenshot/cleanpro-1.png',
      '/screenshot/cleanpro-2.png',
      '/screenshot/cleanpro-3.png'
    ]
  },
  {
    title: 'PromptCraft',
    description:
      'AI prompt engineering platform for creating, sharing, and discovering high-quality prompts across various AI models.',
    link: 'https://promptcraft-v2.vercel.app/',
    images: [
      '/screenshot/promptcraft-1.png',
    ]
  },
];

export const stats: Stat[] = [
  {
    value: '3–5 hari',
    label: 'Landing page turnaround',
    description: 'Perkiraan waktu pengerjaan paket Starter dari kickoff hingga handover.',
  },
  {
    value: 'Next.js + Tailwind',
    label: 'Tech stack utama',
    description: 'Teknologi modern yang kami gunakan untuk performa cepat dan mudah dirawat.',
  },
  {
    value: '24h',
    label: 'Response time',
    description: 'Akses langsung via WhatsApp/email dengan balasan maksimal hari kerja berikutnya.',
  },
];

export const testimonials: Testimonial[] = [];

export const clients: Client[] = [
  { name: 'OpsPlaybook', href: 'https://astika327-dev.github.io/opsplaybook-hospitality/' },
  { name: 'MiniTools', href: 'https://astika327-dev.github.io/minitools/' },
  { name: 'Villa Atmaja' },
  { name: 'Café Lago' },
  { name: 'Astika Personal' },
];
