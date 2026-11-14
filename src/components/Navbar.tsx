import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import { OFFICIAL_CONTACT } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHowItWorksClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('how-it-works');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      e.preventDefault();
      navigate('/#how-it-works');
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 py-1 border-b-2 ${
      isActive
        ? 'text-navy-900 border-crimson-600'
        : 'text-slate-700 border-transparent hover:text-navy-900 hover:border-slate-300'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 lg:h-[72px] flex items-center justify-between gap-4 lg:gap-6">
        {/* Zone 1: Brand Lockup */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          aria-label={OFFICIAL_CONTACT.companyName}
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 rounded-md"
        >
          <img
            src={OFFICIAL_CONTACT.logoPath}
            alt={OFFICIAL_CONTACT.companyName}
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <span className="font-display font-bold text-sm sm:text-base tracking-tight text-navy-900 whitespace-nowrap shrink-0">
            Proactive Drivers
          </span>
        </Link>

        {/* Zone 2: Single-Line Navigation */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-5 xl:gap-6">
          <NavLink to="/" end className={navLinkClass}>
            {t.nav.home}
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            {t.nav.about}
          </NavLink>
          <NavLink to="/legal-protection" className={navLinkClass}>
            {t.nav.legalProtection}
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            {t.nav.services}
          </NavLink>
          <NavLink to="/membership-benefits" className={navLinkClass}>
            {t.nav.benefits}
          </NavLink>
          <a
            href="/#how-it-works"
            onClick={handleHowItWorksClick}
            className="text-[13px] font-medium text-slate-700 hover:text-navy-900 border-b-2 border-transparent hover:border-slate-300 py-1 whitespace-nowrap shrink-0 transition-colors duration-150"
          >
            {t.nav.howItWorks}
          </a>
          <NavLink to="/contact" className={navLinkClass}>
            {t.nav.contact}
          </NavLink>
        </nav>

        {/* Zone 3: Phone, Language Switcher, Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <a
            href={OFFICIAL_CONTACT.phoneHref}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs xl:text-[13px] font-semibold text-navy-900 hover:text-crimson-700 transition-colors whitespace-nowrap shrink-0 tabular-nums"
          >
            <Phone className="w-3.5 h-3.5 text-crimson-600 shrink-0" aria-hidden="true" />
            <span>{OFFICIAL_CONTACT.phoneDisplay}</span>
          </a>

          <div
            role="group"
            aria-label="Language selector"
            className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-md shrink-0"
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`px-2 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'en'
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang('es')}
              aria-pressed={lang === 'es'}
              className={`px-2 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'es'
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Español
            </button>
          </div>

          <Link
            to="/join"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold tracking-wide text-white bg-crimson-600 hover:bg-crimson-700 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600"
          >
            {t.nav.joinNow}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-slate-200 text-navy-900 hover:bg-slate-50 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg max-h-[82vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">
              {OFFICIAL_CONTACT.companyName}
            </span>
            <a
              href={OFFICIAL_CONTACT.phoneHref}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-crimson-700 tabular-nums"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {OFFICIAL_CONTACT.phoneDisplay}
            </a>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-1">
            {[
              { to: '/', label: t.nav.home },
              { to: '/about', label: t.nav.about },
              { to: '/legal-protection', label: t.nav.legalProtection },
              { to: '/services', label: t.nav.services },
              { to: '/membership-benefits', label: t.nav.benefits },
              { to: '/request-support', label: t.nav.requestSupport },
              { to: '/bilingual-support', label: t.nav.bilingual },
              { to: '/faq', label: t.nav.faq },
              { to: '/contact', label: t.nav.contact },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/#how-it-works"
              onClick={handleHowItWorksClick}
              className="px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
            >
              {t.nav.howItWorks}
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/join"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center px-4 py-3 text-sm font-bold text-white bg-crimson-600 hover:bg-crimson-700 rounded-md"
            >
              {t.nav.joinNow}
            </Link>
            <a
              href={OFFICIAL_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-4 py-2.5 text-sm font-semibold text-navy-900 bg-slate-100 hover:bg-slate-200 rounded-md"
            >
              WhatsApp: {OFFICIAL_CONTACT.whatsappDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
