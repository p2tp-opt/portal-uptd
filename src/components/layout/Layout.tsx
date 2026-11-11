import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Skip to Content Link (A11y WCAG AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-kaltim-gold focus:text-on-tertiary-fixed focus:rounded-md focus:font-bold focus:shadow-lg"
      >
        Menuju konten utama
      </a>

      <Header />
      <Navbar />

      <main id="main-content" className="flex-1 flex flex-col w-full focus:outline-none" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
