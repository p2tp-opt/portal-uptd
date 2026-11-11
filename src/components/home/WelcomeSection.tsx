import React from 'react';
import { Quote, User } from 'lucide-react';
import { SampleBadge } from '../common/SampleBadge';

export const WelcomeSection: React.FC = () => {
  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-border-subtle flex flex-col sm:flex-row gap-6 items-center sm:items-start relative overflow-hidden">
      {/* Background Glow Ringan */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-secondary/10 pointer-events-none blur-2xl" />

      {/* Avatar/Foto Pejabat (Placeholder Netral) */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md bg-surface-container-high border-2 border-border-subtle flex flex-col items-center justify-center text-text-muted relative">
          <User className="w-12 h-12 text-outline" />
          <span className="text-[10px] mt-1 text-center px-1 font-semibold">Foto Resmi</span>
          <div className="absolute top-1 right-1">
            <SampleBadge label="Draft" />
          </div>
        </div>
        <span className="inline-block mt-2 font-heading text-xs font-bold text-secondary uppercase tracking-wider">
          Kepala UPTD
        </span>
      </div>

      {/* Teks Sambutan */}
      <div className="flex flex-col gap-2 min-w-0 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Quote className="w-5 h-5 text-kaltim-gold" />
          <span className="text-xs uppercase font-heading font-bold text-tertiary-container tracking-wider">
            Komitmen Pelayanan Publik
          </span>
          <SampleBadge />
        </div>

        <h2 className="text-xl sm:text-2xl font-heading text-primary font-bold leading-snug">
          Menjaga Produktivitas & Kelestarian Perkebunan Bumi Etam
        </h2>

        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed italic">
          “Melalui prinsip <strong className="text-primary font-semibold">Profesional, Amanah dan Peduli</strong>, UPTD P2TP Dinas Perkebunan Provinsi Kalimantan Timur berdiri teguh di garda terdepan melindungi komoditas unggulan daerah — Kelapa Sawit, Karet, Kakao, Lada, dan Kelapa Dalam — dari ancaman hama dan penyakit. Kami mengedepankan pendekatan Pengendalian Hama Terpadu (PHT) yang berbasis biologi dan kelestarian ekosistem.”
        </p>

        <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
          <div className="flex flex-col">
            <span className="font-heading text-sm text-on-surface font-bold">
              Kepala UPTD P2TP Prov. Kaltim
            </span>
            <span className="text-xs text-text-muted">
              Dinas Perkebunan Provinsi Kalimantan Timur (Placeholder nama pejabat)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
