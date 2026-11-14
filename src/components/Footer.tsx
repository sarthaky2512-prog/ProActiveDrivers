import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, MessageCircle, Phone } from 'lucide-react';
import { OFFICIAL_CONTACT } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-950 text-slate-200 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={OFFICIAL_CONTACT.logoPath}
                alt={OFFICIAL_CONTACT.companyName}
                className="w-12 h-12 rounded-full object-cover border border-white/20 shrink-0"
              />
              <div>
                <p className="font-display font-bold text-base text-white leading-snug">
                  {OFFICIAL_CONTACT.companyName}
                </p>
                <p className="text-xs text-slate-300 mt-0.5">{t.footer.slogan}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="text-xs font-semibold tracking-wide text-blue-200">
              {t.footer.motto}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-display text-sm font-bold text-white mb-4">
              {t.footer.quickLinks}
            </h2>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link to="/membership-benefits" className="hover:text-white transition-colors">
                  {t.nav.benefits}
                </Link>
              </li>
              <li>
                <Link to="/request-support" className="hover:text-white transition-colors">
                  {t.nav.requestSupport}
                </Link>
              </li>
              <li>
                <Link to="/bilingual-support" className="hover:text-white transition-colors">
                  Ayuda Legal Unidos en Español
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  {t.nav.faq}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-display text-sm font-bold text-white mb-4">
              {t.footer.contactInfo}
            </h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a
                  href={OFFICIAL_CONTACT.phoneHref}
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
                  <span>{OFFICIAL_CONTACT.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors tabular-nums"
                >
                  <MessageCircle className="w-4 h-4 text-blue-300 shrink-0" aria-hidden="true" />
                  <span>WhatsApp: {OFFICIAL_CONTACT.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_CONTACT.emailHref}
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-300 shrink-0" aria-hidden="true" />
                  <span>{OFFICIAL_CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_CONTACT.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4 text-blue-300 shrink-0" aria-hidden="true" />
                  <span>{OFFICIAL_CONTACT.websiteDisplay}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h2 className="font-display text-sm font-bold text-white mb-4">
              {t.footer.legalAndPolicies}
            </h2>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link to="/legal-disclaimer" className="hover:text-white transition-colors">
                  {t.footer.disclaimer}
                </Link>
              </li>
              <li>
                <Link to="/sms-terms" className="hover:text-white transition-colors">
                  {t.footer.smsTerms}
                </Link>
              </li>
              <li>
                <Link
                  to="/legal-disclaimer#accessibility"
                  className="hover:text-white transition-colors"
                >
                  {t.footer.accessibility}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.footer.copyright}</p>
          <p className="max-w-xl leading-relaxed">{t.footer.nonFirmNote}</p>
        </div>
      </div>
    </footer>
  );
}
