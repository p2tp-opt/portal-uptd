import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Play, Pause, ShieldCheck, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: 'Pengamatan & Pengendalian Hama Terpadu',
    subtitle: 'Monitoring Rutin Kelapa Sawit, Karet & Kakao di Seluruh Wilayah',
    description:
      'Pendekatan ramah lingkungan berbasis kearifan ekologi dan pelestarian musuh alami untuk menjaga produktivitas kebun masyarakat.',
    imageUrl:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    title: 'Agens Pengendali Hayati Ramah Lingkungan',
    subtitle: 'Laboratorium APH UPTD P2TP Samarinda',
    description:
      'Isolasi, perbanyakan, dan distribusi Trichoderma sp., Beauveria bassiana, dan Metarhizium anisopliae untuk pekebun mandiri.',
    imageUrl:
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    title: 'Bimbingan Teknis & Penguatan Kelompok Tani',
    subtitle: 'Pendampingan Teknis Langsung Bersama Petani Lapangan',
    description:
      'Peningkatan kapasitas pekebun dalam identifikasi dini gejala penyakit perakaran dan aplikasi pestisida nabati.',
    imageUrl:
      'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 4,
    title: 'Mitigasi Cuaca & Peringatan Dini Serangan OPT',
    subtitle: 'Sistem Informasi Pemantauan Iklim Perkebunan',
    description:
      'Kesiapsiagaan menghadapi kelembaban tinggi guna mencegah ledakan jamur akar dan penyakit busuk pupus.',
    imageUrl:
      'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1600&q=80',
  },
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Periksa preferensi reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Timer auto-play
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const active = slides[currentSlide];

  return (
    <section
      aria-label="Hero Banner Utama"
      className="relative w-full bg-primary overflow-hidden min-h-[560px] lg:min-h-[640px] flex items-center"
    >
      {/* Background Image dengan Scrim Gradien Kontras Tinggi */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out transform scale-100"
        style={{ backgroundImage: `url('${active.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/30" />
      </div>

      {/* Konten Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-3xl flex flex-col gap-6">
          {/* Badge Wilayah */}
          <div className="inline-flex items-center gap-2 self-start bg-surface-container-lowest/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-tertiary-fixed border border-secondary/40">
            <span className="w-2 h-2 rounded-full bg-kaltim-gold animate-pulse" aria-hidden="true" />
            <span className="text-xs uppercase tracking-wider font-bold">
              Siaga OPT Wilayah Benua Etam
            </span>
          </div>

          {/* Headline Utama */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-on-primary font-extrabold leading-tight tracking-tight">
            Mendukung Perlindungan <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tertiary-fixed-dim via-kaltim-gold to-primary-fixed">
              Tanaman Perkebunan
            </span>{' '}
            Kalimantan Timur
          </h1>

          {/* Motto & Deskripsi Slide */}
          <p className="text-sm sm:text-base lg:text-lg text-surface-container-high leading-relaxed max-w-2xl font-normal">
            <strong className="text-tertiary-fixed font-semibold">“Profesional, Amanah dan Peduli”</strong> dalam mewujudkan tanaman perkebunan yang sehat, lestari, dan berdaya saing tinggi untuk kesejahteraan pekebun Kalimantan Timur.
          </p>

          {/* Tombol CTA Ganda */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/layanan"
              className="inline-flex items-center gap-2 bg-kaltim-gold hover:bg-tertiary-fixed-dim text-on-tertiary-fixed px-6 py-3.5 rounded-xl font-heading font-bold text-sm transition-all shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Kenali Layanan Kami</span>
            </Link>
            <Link
              to="/publikasi"
              className="inline-flex items-center gap-2 bg-primary-container/80 hover:bg-secondary text-on-primary px-6 py-3.5 rounded-xl font-heading font-semibold text-sm transition-all shadow-sm hover:-translate-y-0.5 border border-secondary focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
            >
              <BookOpen className="w-5 h-5" />
              <span>Lihat Publikasi & Panduan OPT</span>
            </Link>
          </div>

          {/* Kontrol Slider & Indikator (A11y) */}
          <div className="flex items-center justify-between pt-6 max-w-xl border-t border-secondary/40 mt-2">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Slide sebelumnya"
                className="w-9 h-9 rounded-full bg-primary-container/80 hover:bg-secondary text-on-primary flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Slide berikutnya"
                className="w-9 h-9 rounded-full bg-primary-container/80 hover:bg-secondary text-on-primary flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Jeda perputaran slide otomatis' : 'Putar slide otomatis'}
                className="w-9 h-9 rounded-full bg-primary-container/80 hover:bg-secondary text-on-primary flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <div className="ml-2 flex flex-col">
                <span className="text-xs font-heading text-tertiary-fixed font-bold tracking-wide">
                  Slide {currentSlide + 1} / {slides.length} • {active.title}
                </span>
                <span className="text-[11px] text-surface-container-high line-clamp-1">
                  {active.subtitle}
                </span>
              </div>
            </div>

            {/* Indikator Titik Slide */}
            <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSlide
                      ? 'w-6 bg-kaltim-gold'
                      : 'w-2 bg-surface-container-high/40 hover:bg-surface-container-high'
                  }`}
                  aria-label={`Beralih ke slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
