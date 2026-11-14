import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { FaqAccordion } from '../components/FaqAccordion';

export function FaqPage() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader
        kicker={t.faq.kicker}
        title={t.faq.heading}
        subtitle={t.faq.subheading}
        breadcrumbCurrent={t.nav.faq}
      />

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <FaqAccordion showFilters={true} />

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-display font-bold text-lg text-navy-900">
                {t.supportForm.heading}
              </h2>
              <p className="text-sm text-slate-600">{t.contact.subheading}</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/request-support"
                className="px-5 py-2.5 text-sm font-bold text-white bg-crimson-600 hover:bg-crimson-700 rounded-md"
              >
                {t.hero.secondaryCta}
              </Link>
              <Link
                to="/contact"
                className="px-5 py-2.5 text-sm font-semibold text-navy-900 border border-slate-300 hover:bg-slate-50 rounded-md"
              >
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
