import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PageHeaderProps {
  kicker: string;
  title: string;
  subtitle: string;
  breadcrumbCurrent: string;
}

export function PageHeader({
  kicker,
  title,
  subtitle,
  breadcrumbCurrent,
}: PageHeaderProps) {
  const { t } = useLanguage();

  return (
    <section className="bg-navy-900 text-white border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300">
          <Link to="/" className="hover:text-white transition-colors">
            {t.nav.home}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span className="text-white font-medium">{breadcrumbCurrent}</span>
        </nav>

        <p className="text-xs font-semibold tracking-wide text-blue-200">{kicker}</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance max-w-3xl">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
