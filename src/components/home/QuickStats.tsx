import React, { useState, useEffect } from 'react';
import { Map, AlertTriangle, Sprout } from 'lucide-react';
import { contentRepository } from '../../services/contentRepository';
import { defaultSiteSettings } from '../../data/defaultSiteSettings';

export const QuickStats: React.FC = () => {
  const [stats, setStats] = useState(defaultSiteSettings.hero.stats);

  useEffect(() => {
    contentRepository.getSiteSettings().then((s) => {
      if (s?.hero?.stats && s.hero.stats.length === 3) {
        setStats(s.hero.stats);
      }
    });
  }, []);

  const icons = [
    <Map className="w-6 h-6" key="0" />,
    <AlertTriangle className="w-6 h-6" key="1" />,
    <Sprout className="w-6 h-6" key="2" />,
  ];

  const colors = [
    { bg: 'bg-badge-activity-bg', text: 'text-badge-activity-text', valueText: 'text-primary' },
    { bg: 'bg-badge-opt-bg', text: 'text-badge-opt-text', valueText: 'text-badge-opt-text' },
    { bg: 'bg-gold-light', text: 'text-tertiary', valueText: 'text-tertiary-container' },
  ];

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((item, idx) => {
          const c = colors[idx] || colors[0];
          const icon = icons[idx] || icons[0];
          return (
            <div
              key={idx}
              className="bg-surface-container-lowest p-6 rounded-2xl shadow-lg border border-border-subtle flex items-center gap-4 transition-transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center ${c.text} flex-shrink-0`}>
                {icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`text-xl sm:text-2xl font-heading font-extrabold ${c.valueText} leading-none`}>
                  {item.value}
                </span>
                <div className="font-heading font-bold text-sm text-on-surface mt-1 truncate">
                  {item.label}
                </div>
                <p className="text-xs text-text-muted mt-0.5 truncate">
                  {item.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
