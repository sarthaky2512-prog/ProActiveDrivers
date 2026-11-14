import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { OFFICIAL_CONTACT } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { SupportRequestForm } from '../components/SupportRequestForm';

export function RequestSupportPage() {
  const { lang, t } = useLanguage();

  return (
    <div>
      <PageHeader
        kicker={t.supportForm.kicker}
        title={t.supportForm.heading}
        subtitle={t.supportForm.subheading}
        breadcrumbCurrent={t.nav.requestSupport}
      />

      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <SupportRequestForm />

          <div className="bg-navy-900 text-white rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="font-display font-bold text-base">
                {lang === 'es'
                  ? '¿Prefiere hablar directamente por teléfono o WhatsApp?'
                  : 'Prefer to speak directly by phone or WhatsApp?'}
              </p>
              <p className="text-xs text-slate-300">
                {lang === 'es'
                  ? 'Atención bilingüe en inglés y español.'
                  : 'Bilingual English and Spanish support coordinators available.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={OFFICIAL_CONTACT.phoneHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-crimson-600 hover:bg-crimson-700 text-white rounded-md tabular-nums"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                {OFFICIAL_CONTACT.phoneDisplay}
              </a>
              <a
                href={OFFICIAL_CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-white text-navy-900 hover:bg-slate-100 rounded-md tabular-nums"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                {OFFICIAL_CONTACT.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
