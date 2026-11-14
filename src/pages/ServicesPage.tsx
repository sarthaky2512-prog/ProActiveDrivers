import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { ServiceCardGrid } from '../components/ServiceCardGrid';

export function ServicesPage() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader
        kicker={t.services.kicker}
        title={t.services.heading}
        subtitle={t.services.subheading}
        breadcrumbCurrent={t.nav.services}
      />

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <ServiceCardGrid showFilter={true} expandInline={true} />

          <div className="bg-navy-900 text-white rounded-xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <h2 className="font-display font-bold text-2xl">{t.supportForm.heading}</h2>
              <p className="text-sm text-slate-300">{t.supportForm.subheading}</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/request-support"
                className="px-5 py-3 text-sm font-bold text-white bg-crimson-600 hover:bg-crimson-700 rounded-md whitespace-nowrap"
              >
                {t.hero.secondaryCta}
              </Link>
              <Link
                to="/join"
                className="px-5 py-3 text-sm font-bold text-navy-900 bg-white hover:bg-slate-100 rounded-md whitespace-nowrap"
              >
                {t.nav.joinNow}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
