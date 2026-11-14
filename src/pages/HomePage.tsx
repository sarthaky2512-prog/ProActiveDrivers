import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { OFFICIAL_CONTACT, SITE_IMAGES } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ServiceCardGrid } from '../components/ServiceCardGrid';
import { MembershipForm } from '../components/MembershipForm';
import { SupportRequestForm } from '../components/SupportRequestForm';
import { FaqAccordion } from '../components/FaqAccordion';
import { ContactForm } from '../components/ContactForm';
import { LocationMapSection } from '../components/LocationMapSection';

export function HomePage() {
  const { lang, setLang, t, benefits } = useLanguage();
  const [activeIntakeTab, setActiveIntakeTab] = useState<'join' | 'support'>('join');

  return (
    <div>
      {/* 1. Full-Width Hero Section */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={SITE_IMAGES.heroDriver}
            alt="Professional American truck driver standing beside a modern semi-truck on an open highway"
            className="w-full h-full object-cover object-center"
            fallbackTitle={OFFICIAL_CONTACT.companyName}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-950/78 to-navy-950/45"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-22 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-blue-200">
              {t.hero.kicker}
            </p>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] leading-[1.08] tracking-tight text-balance">
              {t.hero.headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              {t.hero.subheadline}
            </p>

            {/* Three Highlight Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {t.hero.pillars.map((pillar) => (
                <div
                  key={pillar}
                  className="bg-navy-900/75 backdrop-blur-sm border border-white/15 rounded-lg px-4 py-3 text-sm font-display font-bold text-white"
                >
                  {pillar}
                </div>
              ))}
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/join"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold tracking-wide text-white bg-crimson-600 hover:bg-crimson-700 rounded-md transition-colors whitespace-nowrap"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Link>

              <Link
                to="/request-support"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold tracking-wide text-navy-900 bg-white hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap"
              >
                {t.hero.secondaryCta}
              </Link>
            </div>

            <p className="text-xs text-slate-300 pt-1">{t.hero.trustLine}</p>
          </div>
        </div>
      </section>

      {/* 2. About Us — People 1st | Gente Primero */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div>
              <p className="text-xs font-bold tracking-wide text-crimson-700 mb-2">
                {t.about.kicker}
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 tracking-tight text-balance">
                {t.about.heading}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">{t.about.lead}</p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.about.mission}
            </p>

            <div className="pt-2">
              <h3 className="font-display font-bold text-sm text-navy-900 mb-3">
                {t.about.commitmentsTitle}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {t.about.commitments.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-crimson-600 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-crimson-700 transition-colors"
              >
                <span>{t.about.learnMore}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[320px] rounded-xl overflow-hidden border border-slate-200">
              <ImageWithFallback
                src={SITE_IMAGES.cdlSupport}
                alt="Commercial truck driver reviewing CDL compliance logs inside a modern semi-truck cab"
                className="w-full h-full object-cover"
                fallbackTitle="CDL Protection Resources"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Services — 9 Core Driver Resources */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-bold tracking-wide text-crimson-700">{t.services.kicker}</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 tracking-tight text-balance">
              {t.services.heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">{t.services.subheading}</p>
          </div>

          <ServiceCardGrid showFilter={true} expandInline={false} />
        </div>
      </section>

      {/* 4. Why Join Proactive Drivers — Configurable Benefits */}
      <section className="py-16 sm:py-20 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-bold tracking-wide text-blue-200">{t.benefits.kicker}</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-balance">
                {t.benefits.heading}
              </h2>
              <p className="text-base font-medium text-blue-100">{t.benefits.supporting}</p>
            </div>

            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-crimson-600 hover:bg-crimson-700 rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.benefits.cta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed border border-white/15 bg-navy-950/40 rounded-lg px-4 py-3">
            {t.benefits.configurableNote}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit) => (
              <div
                key={benefit.slot_key}
                className="bg-navy-800/70 border border-white/10 rounded-xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-blue-200">
                    <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
                    <span>
                      {lang === 'es'
                        ? benefit.availability_note_es
                        : benefit.availability_note_en}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {lang === 'es' ? benefit.title_es : benefit.title_en}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === 'es' ? benefit.description_es : benefit.description_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works — 4-Step Process */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-bold tracking-wide text-crimson-700">
                {t.howItWorks.kicker}
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 tracking-tight">
                {t.howItWorks.heading}
              </h2>
              <p className="text-base text-slate-600">{t.howItWorks.subheading}</p>
            </div>

            <Link
              to="/join"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-crimson-600 hover:bg-crimson-700 rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              {t.howItWorks.cta}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.howItWorks.steps.map((item) => (
              <div
                key={item.step}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3"
              >
                <span className="font-mono text-xs font-bold text-crimson-700 tabular-nums">
                  {item.step}
                </span>
                <h3 className="font-display font-bold text-xl text-navy-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. People 1st Community Spotlight */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6">
            <div className="h-full min-h-[320px] rounded-xl overflow-hidden border border-slate-200">
              <ImageWithFallback
                src={SITE_IMAGES.peopleFirst}
                alt="Diverse American commercial truck drivers standing together in front of semi-trucks"
                className="w-full h-full object-cover"
                fallbackTitle="People 1st | Gente Primero"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <p className="text-xs font-bold tracking-wide text-crimson-700">
              {t.peopleFirst.kicker}
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 tracking-tight text-balance">
              {t.peopleFirst.heading}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">{t.peopleFirst.message}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/join"
                className="px-5 py-3 text-sm font-bold text-white bg-navy-900 hover:bg-navy-800 rounded-md transition-colors"
              >
                {t.peopleFirst.ctaPrimary}
              </Link>
              <Link
                to="/about"
                className="px-5 py-3 text-sm font-semibold text-navy-900 border border-slate-300 bg-white hover:bg-slate-50 rounded-md transition-colors"
              >
                {t.peopleFirst.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Spanish Language Section — Ayuda Legal Unidos en Español */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            <p className="text-xs font-bold tracking-wide text-crimson-700">
              {t.spanishSection.kicker}
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 tracking-tight text-balance">
              AYUDA LEGAL UNIDOS EN ESPAÑOL
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              Estamos comprometidos a conectar a los conductores con información, recursos y apoyo
              para proteger sus derechos, su CDL y su medio de vida.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/bilingual-support"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-crimson-600 hover:bg-crimson-700 rounded-md transition-colors"
              >
                <span>OBTENER AYUDA</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="px-5 py-3.5 text-sm font-semibold text-navy-900 border border-slate-300 hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
              >
                {lang === 'es' ? 'View Website in English' : 'Cambiar Sitio a Español'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full min-h-[300px] rounded-xl overflow-hidden border border-slate-200">
              <ImageWithFallback
                src={SITE_IMAGES.spanishSupport}
                alt="Hispanic American commercial truck driver standing beside a blue semi-truck"
                className="w-full h-full object-cover"
                fallbackTitle="Ayuda Legal Unidos en Español"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Membership Registration & Legal Support Intake */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-xs font-bold tracking-wide text-crimson-700">
              {activeIntakeTab === 'join' ? t.membershipForm.kicker : t.supportForm.kicker}
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 tracking-tight text-balance">
              {activeIntakeTab === 'join' ? t.membershipForm.heading : t.supportForm.heading}
            </h2>
            <p className="text-base text-slate-600">
              {activeIntakeTab === 'join' ? t.membershipForm.subheading : t.supportForm.subheading}
            </p>
          </div>

          {/* Interactive Intake Mode Switcher */}
          <div className="flex justify-center">
            <div
              role="tablist"
              aria-label="Choose form"
              className="inline-flex p-1 bg-slate-200/80 border border-slate-300 rounded-lg"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeIntakeTab === 'join'}
                onClick={() => setActiveIntakeTab('join')}
                className={`px-5 py-2.5 text-sm font-bold rounded-md transition-colors cursor-pointer ${
                  activeIntakeTab === 'join'
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'text-slate-700 hover:text-navy-900'
                }`}
              >
                {t.nav.joinNow}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeIntakeTab === 'support'}
                onClick={() => setActiveIntakeTab('support')}
                className={`px-5 py-2.5 text-sm font-bold rounded-md transition-colors cursor-pointer ${
                  activeIntakeTab === 'support'
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'text-slate-700 hover:text-navy-900'
                }`}
              >
                {t.supportForm.submit}
              </button>
            </div>
          </div>

          {activeIntakeTab === 'join' ? <MembershipForm compact /> : <SupportRequestForm />}
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-wide text-crimson-700">{t.faq.kicker}</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 tracking-tight">
                {t.faq.heading}
              </h2>
            </div>
            <Link
              to="/faq"
              className="text-sm font-semibold text-blue-700 hover:text-navy-900 whitespace-nowrap"
            >
              {lang === 'es' ? 'Ver Todas las Preguntas' : 'View Full FAQ Page'} →
            </Link>
          </div>

          <FaqAccordion showFilters={false} />
        </div>
      </section>

      {/* 10. Contact Us & Configurable Location Map */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-bold tracking-wide text-crimson-700">{t.contact.kicker}</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 tracking-tight">
              {t.contact.heading}
            </h2>
            <p className="text-base text-slate-600">{t.contact.subheading}</p>
          </div>

          {/* Direct Action Contact Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href={OFFICIAL_CONTACT.phoneHref}
              className="bg-white border border-slate-200 hover:border-navy-700/40 rounded-xl p-5 flex items-start gap-3.5 transition-colors"
            >
              <Phone className="w-5 h-5 text-crimson-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold text-slate-500">{t.contact.phoneTitle}</p>
                <p className="font-display font-bold text-base text-navy-900 tabular-nums mt-0.5">
                  {OFFICIAL_CONTACT.phoneDisplay}
                </p>
              </div>
            </a>

            <a
              href={OFFICIAL_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-200 hover:border-navy-700/40 rounded-xl p-5 flex items-start gap-3.5 transition-colors"
            >
              <MessageCircle
                className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-semibold text-slate-500">{t.contact.whatsappTitle}</p>
                <p className="font-display font-bold text-base text-navy-900 tabular-nums mt-0.5">
                  {OFFICIAL_CONTACT.whatsappDisplay}
                </p>
              </div>
            </a>

            <a
              href={OFFICIAL_CONTACT.emailHref}
              className="bg-white border border-slate-200 hover:border-navy-700/40 rounded-xl p-5 flex items-start gap-3.5 transition-colors"
            >
              <Mail className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-500">{t.contact.emailTitle}</p>
                <p className="font-display font-bold text-sm sm:text-base text-navy-900 truncate mt-0.5">
                  {OFFICIAL_CONTACT.email}
                </p>
              </div>
            </a>

            <Link
              to="/bilingual-support"
              className="bg-navy-900 text-white rounded-xl p-5 flex flex-col justify-between hover:bg-navy-800 transition-colors"
            >
              <p className="text-xs font-semibold text-blue-200">{t.contact.spanishTitle}</p>
              <p className="font-display font-bold text-base mt-1">{t.contact.spanishLabel} →</p>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <ContactForm />
            </div>
            <div className="lg:col-span-7">
              <LocationMapSection />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
