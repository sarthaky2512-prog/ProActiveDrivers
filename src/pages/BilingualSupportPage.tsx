import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Phone, Check } from 'lucide-react';
import { OFFICIAL_CONTACT, SITE_IMAGES } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { ImageWithFallback } from '../components/ImageWithFallback';

export function BilingualSupportPage() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div>
      <PageHeader
        kicker="People 1st | Gente Primero"
        title="Ayuda Legal Unidos en Español · English & Spanish Support"
        subtitle="Estamos comprometidos a conectar a los conductores con información, recursos y apoyo para proteger sus derechos, su CDL y su medio de vida."
        breadcrumbCurrent={t.nav.bilingual}
      />

      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-crimson-700">
              <Globe className="w-4 h-4" aria-hidden="true" />
              <span>English &amp; Español</span>
            </div>

            <h2 className="font-display font-bold text-3xl text-navy-900">
              {lang === 'es'
                ? 'Apoyo Completo en Su Idioma'
                : 'Full Driver Support in Your Preferred Language'}
            </h2>

            <p className="text-base text-slate-700 leading-relaxed">
              {lang === 'es'
                ? 'Las barreras del idioma nunca deben poner en riesgo sus derechos ni su licencia comercial CDL. Proactive Drivers United Legal Help ofrece atención bilingüe, formularios traducidos y recursos educativos en inglés y español.'
                : 'Language barriers should never put a professional driver’s rights or CDL at risk. Proactive Drivers United Legal Help provides bilingual intake, translated guidance, and English/Spanish community resources.'}
            </p>

            <ul className="space-y-3 text-sm text-slate-700">
              {[
                'Ayuda Legal Unidos en Español — Atención directa en español',
                'Bilingual Membership Registration & Legal Support Forms',
                `Teléfono / Phone: ${OFFICIAL_CONTACT.phoneDisplay}`,
                `WhatsApp Bilingüe: ${OFFICIAL_CONTACT.whatsappDisplay}`,
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-crimson-600 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`px-5 py-3 text-sm font-bold rounded-md border cursor-pointer ${
                  lang === 'es'
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-navy-900 border-slate-300 hover:bg-slate-50'
                }`}
              >
                Ver Sitio en Español
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-5 py-3 text-sm font-bold rounded-md border cursor-pointer ${
                  lang === 'en'
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-navy-900 border-slate-300 hover:bg-slate-50'
                }`}
              >
                View Site in English
              </button>
              <Link
                to="/request-support"
                className="px-5 py-3 text-sm font-bold text-white bg-crimson-600 hover:bg-crimson-700 rounded-md"
              >
                OBTENER AYUDA
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="h-[320px] rounded-xl overflow-hidden border border-slate-200">
              <ImageWithFallback
                src={SITE_IMAGES.spanishSupport}
                alt="Hispanic American commercial driver standing beside his semi-truck"
                className="w-full h-full object-cover"
                fallbackTitle="Ayuda Legal Unidos en Español"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={OFFICIAL_CONTACT.phoneHref}
                className="border border-slate-200 rounded-xl p-5 hover:border-navy-700/40 transition-colors"
              >
                <Phone className="w-5 h-5 text-crimson-600 mb-2" aria-hidden="true" />
                <p className="text-xs font-semibold text-slate-500">{t.contact.phoneTitle}</p>
                <p className="font-display font-bold text-base text-navy-900 tabular-nums">
                  {OFFICIAL_CONTACT.phoneDisplay}
                </p>
              </a>

              <a
                href={OFFICIAL_CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-200 rounded-xl p-5 hover:border-navy-700/40 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-emerald-700 mb-2" aria-hidden="true" />
                <p className="text-xs font-semibold text-slate-500">{t.contact.whatsappTitle}</p>
                <p className="font-display font-bold text-base text-navy-900 tabular-nums">
                  {OFFICIAL_CONTACT.whatsappDisplay}
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
