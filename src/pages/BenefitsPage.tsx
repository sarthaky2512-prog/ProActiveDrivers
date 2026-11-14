import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';

export function BenefitsPage() {
  const { lang, t, benefits } = useLanguage();

  return (
    <div>
      <PageHeader
        kicker={t.benefits.kicker}
        title={t.benefits.heading}
        subtitle={t.benefits.supporting}
        breadcrumbCurrent={t.nav.benefits}
      />

      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-700 leading-relaxed">
            {t.benefits.configurableNote}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.slot_key}
                className="bg-white border border-slate-200 rounded-xl p-6 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-navy-900">
                  <ShieldCheck className="w-4 h-4 text-crimson-600 shrink-0" aria-hidden="true" />
                  <span>{lang === 'es' ? b.availability_note_es : b.availability_note_en}</span>
                </div>
                <h2 className="font-display font-bold text-lg text-navy-900">
                  {lang === 'es' ? b.title_es : b.title_en}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {lang === 'es' ? b.description_es : b.description_en}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-crimson-600 hover:bg-crimson-700 rounded-md transition-colors"
            >
              <span>{t.benefits.cta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-bold tracking-wide text-crimson-700">
              {t.howItWorks.kicker}
            </p>
            <h2 className="font-display font-bold text-3xl text-navy-900">{t.howItWorks.heading}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.howItWorks.steps.map((s) => (
              <div key={s.step} className="bg-white border border-slate-200 rounded-xl p-6 space-y-2">
                <span className="font-mono text-xs font-bold text-crimson-700">{s.step}</span>
                <h3 className="font-display font-bold text-lg text-navy-900">{s.title}</h3>
                <p className="text-sm text-slate-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
