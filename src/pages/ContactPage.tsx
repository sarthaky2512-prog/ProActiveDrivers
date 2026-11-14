import React from 'react';
import { Globe, Mail, MessageCircle, Phone } from 'lucide-react';
import { OFFICIAL_CONTACT } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import { LocationMapSection } from '../components/LocationMapSection';

export function ContactPage() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <div>
      <PageHeader
        kicker={c.kicker}
        title={c.heading}
        subtitle={c.subheading}
        breadcrumbCurrent={t.nav.contact}
      />

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Official Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <a
              href={OFFICIAL_CONTACT.phoneHref}
              className="bg-white border border-slate-200 hover:border-navy-700/40 rounded-xl p-6 space-y-2 transition-colors"
            >
              <Phone className="w-5 h-5 text-crimson-600" aria-hidden="true" />
              <p className="text-xs font-semibold text-slate-500">{c.phoneTitle}</p>
              <p className="font-display font-bold text-lg text-navy-900 tabular-nums">
                {OFFICIAL_CONTACT.phoneDisplay}
              </p>
              <p className="text-xs font-semibold text-crimson-700">{c.callNow} →</p>
            </a>

            <a
              href={OFFICIAL_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-200 hover:border-navy-700/40 rounded-xl p-6 space-y-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-emerald-700" aria-hidden="true" />
              <p className="text-xs font-semibold text-slate-500">{c.whatsappTitle}</p>
              <p className="font-display font-bold text-lg text-navy-900 tabular-nums">
                {OFFICIAL_CONTACT.whatsappDisplay}
              </p>
              <p className="text-xs font-semibold text-emerald-700">{c.chatWhatsapp} →</p>
            </a>

            <a
              href={OFFICIAL_CONTACT.emailHref}
              className="bg-white border border-slate-200 hover:border-navy-700/40 rounded-xl p-6 space-y-2 transition-colors"
            >
              <Mail className="w-5 h-5 text-blue-700" aria-hidden="true" />
              <p className="text-xs font-semibold text-slate-500">{c.emailTitle}</p>
              <p className="font-display font-bold text-base text-navy-900 break-all">
                {OFFICIAL_CONTACT.email}
              </p>
              <p className="text-xs font-semibold text-blue-700">{c.sendEmail} →</p>
            </a>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2">
              <Globe className="w-5 h-5 text-navy-900" aria-hidden="true" />
              <p className="text-xs font-semibold text-slate-500">{c.websiteTitle}</p>
              <p className="font-display font-bold text-base text-navy-900">
                {OFFICIAL_CONTACT.websiteDisplay}
              </p>
              <p className="text-xs text-slate-600">{c.spanishLabel}</p>
            </div>
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
