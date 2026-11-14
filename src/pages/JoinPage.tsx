import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { OFFICIAL_CONTACT } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { MembershipForm } from '../components/MembershipForm';

export function JoinPage() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader
        kicker={t.membershipForm.kicker}
        title={t.membershipForm.heading}
        subtitle={t.membershipForm.subheading}
        breadcrumbCurrent={t.nav.joinNow}
      />

      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <MembershipForm />

          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-700 font-medium">
              {t.contact.subheading}
            </p>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={OFFICIAL_CONTACT.phoneHref}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-navy-900 border border-slate-300 rounded-md hover:bg-slate-50 tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-crimson-600" aria-hidden="true" />
                {OFFICIAL_CONTACT.phoneDisplay}
              </a>
              <a
                href={OFFICIAL_CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-navy-900 rounded-md hover:bg-navy-800 tabular-nums"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                WhatsApp: {OFFICIAL_CONTACT.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
