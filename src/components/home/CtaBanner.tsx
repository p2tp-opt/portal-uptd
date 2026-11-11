import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Send, MessageCircle } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
      <div className="bg-gradient-to-r from-primary via-primary-container to-secondary rounded-3xl p-8 lg:p-12 text-on-primary flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden border border-secondary">
        <div className="flex flex-col gap-3 max-w-2xl text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 self-center md:self-start bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-heading font-bold shadow-sm">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Layanan Siaga Cepat Lapangan</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold leading-tight">
            Menemukan Gejala Serangan Hama di Kebun Anda?
          </h2>
          <p className="text-xs sm:text-sm text-surface-container-high leading-relaxed">
            Jangan tunggu hingga mewabah. Hubungi petugas pengamat atau klinik tanaman UPTD P2TP Dinas Perkebunan Kalimantan Timur untuk panduan identifikasi dan penanganan hayati ramah lingkungan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
          <Link
            to="/kontak"
            className="inline-flex items-center gap-2 bg-kaltim-gold hover:bg-tertiary-fixed-dim text-on-tertiary-fixed font-heading font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <Send className="w-4 h-4" />
            <span>Pusat Informasi & Kontak Petugas</span>
          </Link>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-on-primary font-heading font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all border border-secondary"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Konsultasi WA Petugas</span>
          </a>
        </div>
      </div>
    </section>
  );
};
