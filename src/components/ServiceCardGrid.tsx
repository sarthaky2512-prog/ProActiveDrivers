import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  FileWarning,
  Languages,
  Scale,
  Shield,
  Truck,
  Users,
} from 'lucide-react';
import { SERVICES_LIST, type ServiceItem } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP = {
  Shield,
  Award,
  Scale,
  Briefcase,
  FileWarning,
  Truck,
  BookOpen,
  Users,
  Languages,
} as const;

type ServiceCategoryFilter = 'all' | 'cdl' | 'rights' | 'community';

export function ServiceCardGrid({
  showFilter = true,
  expandInline = false,
}: {
  showFilter?: boolean;
  expandInline?: boolean;
}) {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<ServiceCategoryFilter>('all');
  const [expandedId, setExpandedId] = useState<string>('');

  const items =
    filter === 'all'
      ? SERVICES_LIST
      : SERVICES_LIST.filter((s) => s.category === filter);

  return (
    <div className="space-y-8">
      {/* Legal information vs direct representation clarity notice */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 text-sm text-navy-900 leading-relaxed">
        {t.services.disclaimerBanner}
      </div>

      {showFilter && (
        <div
          role="tablist"
          aria-label="Service categories"
          className="inline-flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-lg"
        >
          {(
            [
              { key: 'all', label: t.services.filterAll },
              { key: 'cdl', label: t.services.filterCdl },
              { key: 'rights', label: t.services.filterRights },
              { key: 'community', label: t.services.filterCommunity },
            ] as Array<{ key: ServiceCategoryFilter; label: string }>
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={filter === tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filter === tab.key
                  ? 'bg-white text-navy-900 shadow-xs'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((service: ServiceItem) => {
          const IconComponent = ICON_MAP[service.iconName];
          const title = lang === 'es' ? service.titleEs : service.titleEn;
          const summary = lang === 'es' ? service.summaryEs : service.summaryEn;
          const details = lang === 'es' ? service.detailsEs : service.detailsEn;
          const scopeNote = lang === 'es' ? service.scopeNoteEs : service.scopeNoteEn;
          const isExpanded = expandedId === service.id;

          return (
            <article
              key={service.id}
              id={service.id}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-navy-700/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-navy-900 shrink-0">
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums">
                    {service.number}.
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-navy-900 leading-snug">
                  {title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>

                {expandInline && isExpanded && (
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <p className="text-sm text-slate-700 leading-relaxed">{details}</p>
                    <p className="text-xs font-medium text-slate-500">{scopeNote}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                {expandInline ? (
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? '' : service.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-crimson-700 transition-colors cursor-pointer"
                  >
                    <span>
                      {isExpanded
                        ? lang === 'es'
                          ? 'Ocultar Detalles'
                          : 'Hide Details'
                        : t.services.learnMore}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                ) : (
                  <Link
                    to={`/services#${service.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-crimson-700 transition-colors"
                  >
                    <span>{t.services.learnMore}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}

                <Link
                  to="/request-support"
                  className="text-xs font-semibold text-blue-700 hover:text-navy-900 whitespace-nowrap"
                >
                  {t.services.requestHelp}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
