import React from 'react';
import { Quote, User } from 'lucide-react';
import { useSiteContext } from '../../context/useSiteContext';
import { defaultSiteSettings } from '../../data/defaultSiteSettings';

export const WelcomeSection: React.FC = () => {
  const { siteSettings } = useSiteContext();
  const welcome = siteSettings.welcome || defaultSiteSettings.welcome;

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-border-subtle flex flex-col sm:flex-row gap-6 items-center sm:items-start relative overflow-hidden">
      {/* Background Glow Ringan */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-secondary/10 pointer-events-none blur-2xl" />

      {/* Avatar/Foto Pejabat Dinamis */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md bg-surface-container-high border-2 border-border-subtle flex flex-col items-center justify-center text-text-muted relative">
          {welcome.leaderPhoto ? (
            <img
              src={welcome.leaderPhoto}
              alt={welcome.leaderName || 'Kepala UPTD'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <User className="w-12 h-12 text-outline" />
              <span className="text-[10px] mt-1 font-semibold">Foto Resmi</span>
            </div>
          )}
        </div>
        <span className="inline-block mt-2 font-heading text-xs font-bold text-secondary uppercase tracking-wider text-center">
          {welcome.leaderTitle ? 'Kepala UPTD' : 'Pimpinan Instansi'}
        </span>
      </div>

      {/* Teks Sambutan Dinamis */}
      <div className="flex flex-col gap-2 min-w-0 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Quote className="w-5 h-5 text-kaltim-gold" />
          <span className="text-xs uppercase font-heading font-bold text-tertiary-container tracking-wider">
            {welcome.badge || 'Komitmen Pelayanan Publik'}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-heading text-primary font-bold leading-snug">
          {welcome.title || 'Menjaga Produktivitas & Kelestarian Perkebunan Bumi Etam'}
        </h2>

        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed italic">
          “{welcome.speechContent ||
            'Melalui prinsip Profesional, Amanah dan Peduli, UPTD P2TP Dinas Perkebunan Provinsi Kalimantan Timur berdiri teguh di garda terdepan melindungi komoditas unggulan daerah dari ancaman hama dan penyakit.'}”
        </p>

        <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
          <div className="flex flex-col">
            <span className="font-heading text-sm text-on-surface font-bold">
              {welcome.leaderName || 'Mahreni Kalsi, S.P., M.P.'}
            </span>
            <span className="text-xs text-text-muted">
              {welcome.leaderTitle || 'Kepala UPTD Pengembangan Perlindungan Tanaman Perkebunan'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
