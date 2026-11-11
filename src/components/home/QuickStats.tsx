import React from 'react';
import { Map, AlertTriangle, Sprout } from 'lucide-react';
import { SampleBadge } from '../common/SampleBadge';

export const QuickStats: React.FC = () => {
  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Kartu 1: Wilayah Kerja */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-lg border border-border-subtle flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-badge-activity-bg flex items-center justify-center text-badge-activity-text flex-shrink-0">
            <Map className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-heading font-extrabold text-primary leading-none">
                10 Wilayah
              </span>
              <SampleBadge />
            </div>
            <div className="font-heading font-bold text-sm text-on-surface mt-1">
              Kabupaten & Kota Pantauan
            </div>
            <p className="text-xs text-text-muted mt-0.5 truncate">
              Wilayah kerja pengamatan rutin OPT perkebunan
            </p>
          </div>
        </div>

        {/* Kartu 2: Pelayanan Siaga */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-lg border border-border-subtle flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-badge-opt-bg flex items-center justify-center text-badge-opt-text flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-heading font-extrabold text-badge-opt-text leading-none">
                Siaga OPT
              </span>
              <SampleBadge />
            </div>
            <div className="font-heading font-bold text-sm text-on-surface mt-1">
              Konsultasi & Deteksi Dini
            </div>
            <p className="text-xs text-text-muted mt-0.5 truncate">
              Pendampingan dan respon cepat petugas lapangan
            </p>
          </div>
        </div>

        {/* Kartu 3: Agens Hayati */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-lg border border-border-subtle flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-gold-light flex items-center justify-center text-tertiary flex-shrink-0">
            <Sprout className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-heading font-extrabold text-tertiary-container leading-none">
                Agens Hayati
              </span>
              <SampleBadge />
            </div>
            <div className="font-heading font-bold text-sm text-on-surface mt-1">
              Pengendalian Berkelanjutan
            </div>
            <p className="text-xs text-text-muted mt-0.5 truncate">
              Produksi mikroba Trichoderma & Beauveria di Lab APH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
