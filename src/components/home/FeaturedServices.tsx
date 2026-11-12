// src/components/home/FeaturedServices.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useSiteContext } from '../../context/useSiteContext';
import { renderServiceIcon } from '../../utils/serviceIcons';

export const FeaturedServices: React.FC = () => {
  const { services } = useSiteContext();
  const topServices = services && services.length > 0 ? services.slice(0, 3) : [];

  return (
    <div className="flex flex-col gap-6" id="layanan-unggulan">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-secondary font-heading text-xs uppercase tracking-wider font-bold mb-1">
            <Radio className="w-4 h-4" />
            <span>Pilar Pelayanan Teknis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
            Layanan Unggulan P2TP
          </h2>
        </div>
        <Link
          to="/layanan"
          className="inline-flex items-center gap-1 text-secondary font-heading text-sm font-bold hover:text-primary transition-colors"
        >
          <span>Semua Layanan Publik</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topServices.map((srv) => (
          <Link
            key={srv.id}
            to="/layanan"
            className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-border-subtle hover:shadow-lg transition-all duration-300 flex flex-col justify-between group focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
          >
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-badge-activity-bg text-secondary flex items-center justify-center transition-transform group-hover:scale-110">
                {renderServiceIcon(srv.icon, 'w-6 h-6')}
              </div>
              <h3 className="text-lg font-heading font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2">
                {srv.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                {srv.description}
              </p>
            </div>
            <div className="pt-6 mt-4 flex items-center justify-between border-t border-border-subtle">
              <span className="text-xs text-secondary font-semibold truncate mr-2">
                {srv.tag || 'Layanan Publik'}
              </span>
              <ArrowUpRight className="w-4 h-4 text-secondary flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
