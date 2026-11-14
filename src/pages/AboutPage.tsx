import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { SITE_IMAGES } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { ImageWithFallback } from '../components/ImageWithFallback';

export function AboutPage() {
  const { lang, t } = useLanguage();

  return (
    <div>
      <PageHeader
        kicker={t.about.kicker}
        title={t.about.heading}
        subtitle={t.about.lead}
        breadcrumbCurrent={t.nav.about}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy-900">
              {lang === 'es'
                ? 'Nuestra Misión y Estándar Comunitario'
                : 'Our Mission & Community Standard'}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">{t.about.mission}</p>
            <p className="text-base text-slate-600 leading-relaxed">{t.peopleFirst.message}</p>

            <div className="pt-2">
              <h3 className="font-display font-bold text-base text-navy-900 mb-4">
                {t.about.commitmentsTitle}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.about.commitments.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-crimson-600 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                to="/join"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-crimson-600 hover:bg-crimson-700 rounded-md"
              >
                <span>{t.nav.joinNow}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-6 py-3 text-sm font-semibold text-navy-900 border border-slate-300 hover:bg-slate-50 rounded-md"
              >
                {t.nav.services}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[340px] rounded-xl overflow-hidden border border-slate-200">
              <ImageWithFallback
                src={SITE_IMAGES.peopleFirst}
                alt="Diverse American commercial truck drivers standing together"
                className="w-full h-full object-cover"
                fallbackTitle={t.about.heading}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
