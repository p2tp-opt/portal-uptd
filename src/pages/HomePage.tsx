import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { QuickStats } from '../components/home/QuickStats';
import { WelcomeSection } from '../components/home/WelcomeSection';
import { FeaturedServices } from '../components/home/FeaturedServices';
import { NewsSection } from '../components/home/NewsSection';
import { AgendaPublicationSection } from '../components/home/AgendaPublicationSection';
import { Sidebar } from '../components/home/Sidebar';
import { GallerySection } from '../components/home/GallerySection';
import { VideoSection } from '../components/home/VideoSection';
import { CtaBanner } from '../components/home/CtaBanner';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Banner Slider */}
      <HeroSlider />

      {/* 2. Floating Quick Stats */}
      <QuickStats />

      {/* 3. Main Dual-Column Architecture (Grid 8 + 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Kolom Kiri: Aliran Konten Utama (8-col) */}
          <div className="lg:col-span-8 flex flex-col gap-12 sm:gap-14 min-w-0">
            <WelcomeSection />
            <FeaturedServices />
            <NewsSection />
            <AgendaPublicationSection />
          </div>

          {/* Kolom Kanan: Sidebar Pelayanan (4-col) */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </section>

      {/* 4. Galeri Foto Dokumentasi Lapangan */}
      <GallerySection />

      {/* 5. Video Edukasi & Pengendalian OPT */}
      <VideoSection />

      {/* 6. Banner Ajakan Konsultasi / Siaga */}
      <CtaBanner />
    </div>
  );
};
