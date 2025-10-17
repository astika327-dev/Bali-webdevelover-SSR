export type Certificate = { title: string; href: string };
export type Plan = {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
  cta: string;
  eta: string;
  badge?: string;
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

export const services = [
  {
    title: "Custom Websites",
    desc: "Modern, responsive builds with a premium feel, from portfolios to full business sites."
  },
  {
    title: "Performance & SEO",
    desc: "Core Web Vitals minded markup, accessible structure, and clean on‑page SEO setup."
  },
  {
    title: "Care & Maintenance",
    desc: "Small content edits, uptime watching, and scheduled backups so your site stays healthy."
  }
];

export const plans: Plan[] = [
  {
    name: "Starter",
    subtitle: "Launch‑ready landing page",
    price: "Rp 1.500.000 - Rp 2.500.000",
    features: [
      "1–3 sections, custom look",
      "Responsive and accessible",
      "Light copy refinement (EN/ID)",
      "Semantic HTML for basic SEO",
      "Standard analytics wiring"
    ],
    cta: "Start Now",
    eta: "3–5 days • 1 revision"
  },
  {
    name: "Growth",
    subtitle: "Small business website",
    price: "Rp 4.000.000 - Rp 6.000.000",
    features: [
      "Up to 5–7 custom pages",
      "Checked against Core Web Vitals",
      "Copy polish (EN/ID, 2 rounds)",
      "Baseline SEO + perf tuning",
      "Simple analytics dashboard",
      "3‑month Care Plan"
    ],
    cta: "Start Growth",
    eta: "1–2 weeks • 2 revisions",
    badge: "Most Popular"
  },
  {
    name: "Premium",
    subtitle: "Brand‑level experience",
    price: "Rp 8.000.000 - Rp 12.000.000",
    features: [
      "12–15 uniquely designed pages",
      "Premium UI with tasteful motion",
      "Full copy refinement (EN/ID, 4 rounds)",
      "Complete performance tuning",
      "Advanced on‑page SEO",
      "Analytics setup and reporting",
      "6‑month Care Plan"
    ],
    cta: "Get Premium",
    eta: "3–4 weeks • 4 revisions"
  }
];

export const addons = [
  {
    title: "Custom Feature AI",
    desc: "Separate pricing for custom features requiring dedicated backend and API integration (e.g., Gemini, complex booking systems).",
    from: "from Rp 4,000,000"
  },
  {
    title: "Booking Integration",
    desc: "Channel manager or booking widget (e.g., SiteMinder, Cloudbeds, or a custom form)",
    from: "from Rp 1.700.000"
  },
  {
    title: "Brand Content Pack",
    desc: "Copy refinement, menu/rooms descriptions (EN/ID), asset organization",
    from: "from Rp 550.000"
  },
  {
    title: "Photo Optimization",
    desc: "Hero and gallery curation, compression, EXIF/alt text, lazy‑load setup",
    from: "from Rp 300.000"
  }
];

export const portfolio = [
  {
    title: 'MiniTools — Developer Utilities Suite',
  description:
    'A fast, privacy-friendly collection of micro utilities for everyday work: formatters, encoders/decoders, generators, and quick helpers. Built with Next.js and Tailwind for snappy UX.',
    link: 'https://astika327-dev.github.io/minitools/',
    images: [
      '/screenshot/ssminitool1.png',
      '/screenshot/ssminitool2.png',
      '/screenshot/ssminitool3.png',
      '/screenshot/ssminitool4.png'
    ]
  },
  {
    title: 'OpsPlaybook — Hospitality Toolkit',
    description:
      'Operational guide and digital SOP dashboard for villa and hospitality management. Focused on team clarity, scalability, and workflow automation.',
    link: 'https://astika327-dev.github.io/opsplaybook-hospitality/',
    images: [
      '/screenshot/ssops1.png',
      '/screenshot/ssops2.png',
      '/screenshot/ssops3.png'
    ]
  },
  {
    title: 'Personal Site — astika.is-a.dev',
    description:
      'Personal branding website built with minimalism and performance in mind. Showcasing portfolio, ideas, and technical notes.',
    link: 'https://astika.is-a.dev',
    images: [
      '/screenshot/ssporto1.png',
      '/screenshot/ssporto2.png'
    ]
  }
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

