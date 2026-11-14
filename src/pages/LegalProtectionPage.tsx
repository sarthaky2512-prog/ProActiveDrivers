import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Scale, ShieldAlert } from 'lucide-react';
import { SITE_IMAGES } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { ImageWithFallback } from '../components/ImageWithFallback';

export function LegalProtectionPage() {
  const { lang, t } = useLanguage();

  const pillars =
    lang === 'es'
      ? [
          {
            title: 'Protección Proactiva de la CDL',
            body: 'Comprenda cómo las multas de tránsito, inspecciones DOT, puntos CSA y registros del Clearinghouse afectan su carrera comercial antes de que escalen.',
          },
          {
            title: 'Educación sobre Derechos del Conductor',
            body: 'Acceso a guías claras sobre inspecciones en carretera, normas de Horas de Servicio y protecciones federales contra represalias laborales.',
          },
          {
            title: 'Canalización Estructurada de Apoyo',
            body: 'Cuando necesita orientación específica, nuestro equipo bilingüe recopila datos generales de su consulta para conectarlo con recursos adecuados.',
          },
        ]
      : [
          {
            title: 'Proactive CDL Safeguards',
            body: 'Understand how traffic citations, DOT inspections, CSA scores, and Clearinghouse reporting impact your commercial license before issues escalate.',
          },
          {
            title: 'Driver Rights Awareness',
            body: 'Access plain-language briefings covering roadside inspection procedures, Hours of Service compliance, and federal anti-coercion protections.',
          },
          {
            title: 'Structured Resource Connections',
            body: 'When a situation requires specialized review, our bilingual intake team organizes your general inquiry to connect you with external support pathways.',
          },
        ];

  return (
    <div>
      <PageHeader
        kicker={t.hero.kicker}
        title={
          lang === 'es'
            ? 'Protección Legal para Sus Derechos, CDL y Sustento'
            : 'Legal Protection for Your Rights, CDL & Livelihood'
        }
        subtitle={t.hero.subheadline}
        breadcrumbCurrent={t.nav.legalProtection}
      />

      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Important Legal Distinction Callout */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-6 flex items-start gap-4">
            <Scale className="w-6 h-6 text-navy-900 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1.5">
              <h2 className="font-display font-bold text-lg text-navy-900">
                {lang === 'es'
                  ? 'Información Legal y Apoyo vs. Representación Legal Directa'
                  : 'Legal Information & Support Connections vs. Direct Legal Representation'}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {t.services.disclaimerBanner}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 space-y-6">
              {pillars.map((p, idx) => (
                <div key={p.title} className="border border-slate-200 rounded-xl p-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-crimson-700">
                    <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>0{idx + 1}.</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-navy-900">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              <div className="flex-1 min-h-[300px] rounded-xl overflow-hidden border border-slate-200">
                <ImageWithFallback
                  src={SITE_IMAGES.cdlSupport}
                  alt="Truck driver reviewing CDL compliance records"
                  className="w-full h-full object-cover"
                  fallbackTitle="CDL Protection"
                />
              </div>

              <div className="bg-navy-900 text-white rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {lang === 'es'
                      ? '¿Enfrenta una multa, inspección o duda sobre su CDL? Solicite orientación hoy mismo.'
                      : 'Facing a roadside citation, inspection concern, or CDL compliance question? Connect with support today.'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/request-support"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-crimson-600 hover:bg-crimson-700 rounded-md"
                  >
                    <span>{t.hero.secondaryCta}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/join"
                    className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-navy-900 bg-white hover:bg-slate-100 rounded-md"
                  >
                    {t.nav.joinNow}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
