import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center my-16">
      <div className="w-16 h-16 rounded-2xl bg-badge-opt-bg text-badge-opt-text flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <span className="text-4xl font-heading font-extrabold text-primary mb-2">404</span>
      <h1 className="text-xl sm:text-2xl font-heading font-bold text-on-surface mb-2">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-xs sm:text-sm text-text-muted max-w-md mb-6 leading-relaxed">
        Maaf, halaman yang Anda tuju tidak ditemukan atau telah dipindahkan ke alamat lain.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-secondary text-on-primary font-heading text-xs font-bold rounded-xl transition-colors shadow-sm"
      >
        <Home className="w-4 h-4" />
        <span>Kembali ke Beranda Utama</span>
      </Link>
    </div>
  );
};
