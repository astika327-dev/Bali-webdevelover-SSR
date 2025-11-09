import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { getTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';
import { Mail, MessageSquare, MapPin, Instagram, Facebook, Github } from 'lucide-react';

// Generate params for each language
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate metadata for the page
export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const t = getTranslation(params.lang);
  return {
    title: t('contact.meta.title'),
    description: t('contact.meta.description'),
  };
}

/* =========================
   Contact Card Component
   ========================= */
interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLink: string;
  buttonText: string;
}

function ContactCard({ icon, title, description, buttonLink, buttonText }: ContactCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200/80">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 text-[var(--brown)]">{icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[var(--brown)]">{title}</h3>
          <p className="text-[var(--brown)]/80 mt-1">{description}</p>
        </div>
      </div>
      <div className="mt-4">
        <Link
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-[var(--brown)] hover:bg-gray-50 transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

/* =========================
   Contact Page
   ========================= */
export default function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);

  const contactCards = [
    {
      icon: <Mail size={24} />,
      title: t('contact.email.title'),
      description: t('contact.email.description'),
      buttonLink: 'mailto:baliwebdevelover@gmail.com',
      buttonText: 'baliwebdevelover@gmail.com',
    },
    {
      icon: <MessageSquare size={24} />,
      title: t('contact.whatsapp.title'),
      description: t('contact.whatsapp.description'),
      buttonLink: 'https://wa.me/62881037549162',
      buttonText: t('contact.whatsapp.button'),
    },
    {
      icon: <MapPin size={24} />,
      title: t('contact.office.title'),
      description: `${t('contact.office.line1')}\n${t('contact.office.line2')}`,
    },
  ];

  const socialLinks = [
    { icon: <Instagram size={24} />, href: 'https://www.instagram.com/baliwebdevelover/' },
    { icon: <Facebook size={24} />, href: 'https://www.facebook.com/profile.php?id=61562916962359' },
    { icon: <Github size={24} />, href: 'https://github.com/skepen' },
  ];

  return (
    <section className="container max-w-3xl py-12 md:py-20">

      {/* New Contact Info Section */}
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          {contactCards.map((card, index) =>
            // The office card is not a link, so we render it differently.
            index === 2 ? (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200/80">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 text-[var(--brown)]">{card.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--brown)]">{card.title}</h3>
                    <p className="text-[var(--brown)]/80 mt-1 whitespace-pre-line">{card.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <ContactCard key={index} {...card} buttonLink={card.buttonLink!} buttonText={card.buttonText!} />
            )
          )}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-[var(--brown)]">
            {t('contact.social.title')}
          </h2>
          <div className="flex justify-center items-center space-x-4 mt-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border border-gray-300 rounded-full text-[var(--brown)] hover:bg-gray-50 transition-colors"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Existing Contact Form Section */}
      <div className="mt-20">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)]">
            {t('contact.form.title')}
          </h1>
          <p className="text-[var(--brown)]/80 max-w-2xl mx-auto">
            {t('contact.form.description')}
          </p>
        </header>

        <div className="mt-12">
          <ContactForm
            namePlaceholder={t('contact.form.name_placeholder')}
            emailPlaceholder={t('contact.form.email_placeholder')}
            messagePlaceholder={t('contact.form.message_placeholder')}
            submitButtonText={t('contact.form.submit_button')}
            successMessage={t('contact.form.success_message')}
            errorMessage={t('contact.form.error_message')}
          />
        </div>
      </div>
    </section>
  );
}
