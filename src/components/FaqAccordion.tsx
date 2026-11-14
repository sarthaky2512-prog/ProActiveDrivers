import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';

type FaqFilter = 'all' | 'general' | 'cdl' | 'membership' | 'contact';

export function FaqAccordion({ showFilters = true }: { showFilters?: boolean }) {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<FaqFilter>('all');
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const visibleItems =
    filter === 'all' ? FAQ_ITEMS : FAQ_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="space-y-6">
      {showFilters && (
        <div
          role="tablist"
          aria-label="FAQ categories"
          className="inline-flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-lg"
        >
          {(
            [
              { key: 'all', label: t.faq.all },
              { key: 'general', label: t.faq.general },
              { key: 'cdl', label: t.faq.cdl },
              { key: 'membership', label: t.faq.membership },
              { key: 'contact', label: t.faq.contact },
            ] as Array<{ key: FaqFilter; label: string }>
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

      <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
        {visibleItems.map((item) => {
          const isOpen = openId === item.id;
          const question = lang === 'es' ? item.questionEs : item.questionEn;
          const answer = lang === 'es' ? item.answerEs : item.answerEn;

          return (
            <div key={item.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? '' : item.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="font-display font-semibold text-base text-navy-900">
                  {question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-150 ${
                    isOpen ? 'rotate-180 text-crimson-600' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
