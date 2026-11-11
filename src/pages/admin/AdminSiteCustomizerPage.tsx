import React, { useEffect, useState, useRef } from 'react';
import {
  Save,
  CheckCircle,
  Sliders,
  Layout,
  Layers,
  FileText,
  Sidebar as SidebarIcon,
  Video,
  Camera,
  Compass,
  Plus,
  Trash2,
  RefreshCw,
  Cloud,
  Upload,
} from 'lucide-react';
import { SiteSettings, SlideItem } from '../../types/siteSettings';
import { contentRepository } from '../../services/contentRepository';
import { defaultSiteSettings } from '../../data/defaultSiteSettings';

export const AdminSiteCustomizerPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [activeTab, setActiveTab] = useState<
    'header-navbar' | 'hero' | 'content' | 'sidebar' | 'agenda-pub' | 'media' | 'footer'
  >('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const leaderPhotoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    contentRepository.getSiteSettings().then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await contentRepository.updateSiteSettings(settings);
      setSettings(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      alert('Gagal menyimpan ke Supabase Cloud: ' + String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleAddSlide = () => {
    const newId = Date.now();
    const newSlide: SlideItem = {
      id: newId,
      title: 'Judul Slide Baru',
      subtitle: 'Subjudul atau Lokasi Pengamatan',
      description: 'Deskripsi singkat tindakan perlindungan tanaman perkebunan.',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80',
    };
    setSettings({
      ...settings,
      hero: {
        ...settings.hero,
        slides: [...settings.hero.slides, newSlide],
      },
    });
  };

  const handleRemoveSlide = (id: number) => {
    if (settings.hero.slides.length <= 1) {
      alert('Minimal harus ada 1 slide banner aktif.');
      return;
    }
    setSettings({
      ...settings,
      hero: {
        ...settings.hero,
        slides: settings.hero.slides.filter((s) => s.id !== id),
      },
    });
  };

  const handleUpdateSlide = (id: number, field: keyof SlideItem, value: string) => {
    setSettings({
      ...settings,
      hero: {
        ...settings.hero,
        slides: settings.hero.slides.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
      },
    });
  };

  const handleLeaderPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran berkas foto maksimal 2 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setSettings({
          ...settings,
          welcome: {
            ...settings.welcome,
            leaderPhoto: result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-text-muted flex flex-col items-center gap-3">
        <RefreshCw className="w-6 h-6 animate-spin text-secondary" />
        <span>Memuat konfigurasi tampilan dan konten website dari Supabase Cloud...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-12">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-badge-activity-bg text-secondary px-2.5 py-1 rounded-md text-[11px] font-heading font-bold mb-1">
            <Cloud className="w-3.5 h-3.5 text-secondary" />
            <span>Supabase Cloud Sync • Multi-Perangkat Terpusat</span>
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-primary">
            Pengaturan Tampilan & Konten Website
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Ubah seluruh elemen teks, banner hero slider, sambutan, sidebar, agenda & publikasi, hingga footer secara langsung.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-secondary text-on-primary font-heading text-xs font-bold rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-kaltim-gold disabled:opacity-50"
        >
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-kaltim-gold" />
              <span>Menyimpan ke Cloud...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-kaltim-gold" />
              <span>Simpan Perubahan ke Supabase</span>
            </>
          )}
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-badge-activity-bg text-badge-activity-text text-xs flex items-center gap-2 border border-green-300 animate-fadeIn">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span className="font-heading font-bold">
            Seluruh perubahan tampilan dan konten berhasil disimpan ke Supabase Cloud! Semua perangkat (laptop, smartphone, tablet) langsung melihat pembaruan ini secara serentak.
          </span>
        </div>
      )}

      {/* Tabs Navigasi */}
      <div className="flex items-center gap-1 border-b border-border-subtle overflow-x-auto pb-px text-xs font-heading font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'hero'
              ? 'border-kaltim-gold text-primary bg-surface-container-lowest font-bold shadow-xs'
              : 'border-transparent text-text-muted hover:text-on-surface'
          }`}
        >
          <Layers className="w-4 h-4 text-secondary" />
          <span>Hero Banner & Slider</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('header-navbar')}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'header-navbar'
              ? 'border-kaltim-gold text-primary bg-surface-container-lowest font-bold shadow-xs'
              : 'border-transparent text-text-muted hover:text-on-surface'
          }`}
        >
          <Compass className="w-4 h-4 text-secondary" />
          <span>Header & Navbar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'content'
              ? 'border-kaltim-gold text-primary bg-surface-container-lowest font-bold shadow-xs'
              : 'border-transparent text-text-muted hover:text-on-surface'
          }`}
        >
          <FileText className="w-4 h-4 text-secondary" />
          <span>Sambutan Pejabat & Konten</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sidebar')}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'sidebar'
              ? 'border-kaltim-gold text-primary bg-surface-container-lowest font-bold shadow-xs'
              : 'border-transparent text-text-muted hover:text-on-surface'
          }`}
        >
          <SidebarIcon className="w-4 h-4 text-secondary" />
          <span>Sidebar Informasi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('agenda-pub')}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'agenda-pub'
              ? 'border-kaltim-gold text-primary bg-surface-container-lowest font-bold shadow-xs'
              : 'border-transparent text-text-muted hover:text-on-surface'
          }`}
        >
          <Layout className="w-4 h-4 text-secondary" />
          <span>Agenda & Publikasi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'media'
              ? 'border-kaltim-gold text-primary bg-surface-container-lowest font-bold shadow-xs'
              : 'border-transparent text-text-muted hover:text-on-surface'
          }`}
        >
          <Video className="w-4 h-4 text-secondary" />
          <span>Kolom Video & Foto</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('footer')}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'footer'
              ? 'border-kaltim-gold text-primary bg-surface-container-lowest font-bold shadow-xs'
              : 'border-transparent text-text-muted hover:text-on-surface'
          }`}
        >
          <Sliders className="w-4 h-4 text-secondary" />
          <span>Footer Website</span>
        </button>
      </div>

      {/* Form Editor Tabbed */}
      <form onSubmit={handleSave} className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-sm flex flex-col gap-6 text-xs">
        {/* ========================================================================= */}
        {/* TAB 1: HERO BANNER & SLIDER */}
        {/* ========================================================================= */}
        {activeTab === 'hero' && (
          <div className="flex flex-col gap-6">
            <div className="border-b border-border-subtle pb-4">
              <h2 className="text-base font-heading font-bold text-primary">
                Headline Utama Hero Section
              </h2>
              <p className="text-[11px] text-text-muted">
                Judul besar, warna aksen teks, dan subheadline yang tampil pertama kali saat pengunjung membuka website.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Awalan Headline</label>
                <input
                  type="text"
                  value={settings.hero.headlinePrefix}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero: { ...settings.hero, headlinePrefix: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:ring-2 focus:ring-kaltim-gold"
                  placeholder="Mendukung Perlindungan"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Teks Sorotan Emas</label>
                <input
                  type="text"
                  value={settings.hero.headlineHighlight}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero: { ...settings.hero, headlineHighlight: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:ring-2 focus:ring-kaltim-gold text-tertiary font-bold"
                  placeholder="Tanaman Perkebunan"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Akhiran Headline</label>
                <input
                  type="text"
                  value={settings.hero.headlineSuffix}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero: { ...settings.hero, headlineSuffix: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:ring-2 focus:ring-kaltim-gold"
                  placeholder="Kalimantan Timur"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-heading font-bold text-on-surface">Subheadline / Deskripsi Utama</label>
              <textarea
                rows={2}
                value={settings.hero.subheadline}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    hero: { ...settings.hero, subheadline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:ring-2 focus:ring-kaltim-gold leading-relaxed"
              />
            </div>

            {/* Tombol CTA Hero */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border-subtle">
              <div className="flex flex-col gap-2 p-4 bg-surface-container-low rounded-2xl border border-border-subtle">
                <span className="font-heading font-bold text-secondary text-[11px] uppercase tracking-wider">
                  Tombol CTA Utama (Kuning Emas)
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-text-muted">Label Tombol:</label>
                  <input
                    type="text"
                    value={settings.hero.primaryCtaText}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero: { ...settings.hero, primaryCtaText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-surface-container-lowest rounded-lg border border-border-subtle"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-text-muted">Link Tujuan (Internal URL):</label>
                  <input
                    type="text"
                    value={settings.hero.primaryCtaLink}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero: { ...settings.hero, primaryCtaLink: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-surface-container-lowest rounded-lg border border-border-subtle"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-surface-container-low rounded-2xl border border-border-subtle">
                <span className="font-heading font-bold text-secondary text-[11px] uppercase tracking-wider">
                  Tombol CTA Kedua (Hijau Tua)
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-text-muted">Label Tombol:</label>
                  <input
                    type="text"
                    value={settings.hero.secondaryCtaText}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero: { ...settings.hero, secondaryCtaText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-surface-container-lowest rounded-lg border border-border-subtle"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-text-muted">Link Tujuan (Internal URL):</label>
                  <input
                    type="text"
                    value={settings.hero.secondaryCtaLink}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero: { ...settings.hero, secondaryCtaLink: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-surface-container-lowest rounded-lg border border-border-subtle"
                  />
                </div>
              </div>
            </div>

            {/* Slider Images Management */}
            <div className="flex flex-col gap-4 pt-4 border-t border-border-subtle">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-heading font-bold text-primary">
                    Slide Banner Gambar Hero
                  </h3>
                  <p className="text-[11px] text-text-muted">
                    Atur gambar latar belakang, judul, dan teks yang berputar di slider hero.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddSlide}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-on-secondary rounded-lg font-heading font-bold text-xs hover:bg-primary transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Slide</span>
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {settings.hero.slides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className="p-4 rounded-2xl bg-surface-container-low border border-border-subtle flex flex-col sm:flex-row gap-4 items-start"
                  >
                    {/* Pratinjau Gambar Slide */}
                    <div className="w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-surface-container-high border border-border-subtle flex-shrink-0 relative">
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <span className="absolute top-1.5 left-1.5 bg-primary/80 backdrop-blur-sm text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Slide {idx + 1}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col gap-2 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-text-muted">Judul Slide:</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => handleUpdateSlide(slide.id, 'title', e.target.value)}
                            className="px-2.5 py-1.5 bg-surface-container-lowest rounded-lg border border-border-subtle font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-text-muted">Subjudul:</label>
                          <input
                            type="text"
                            value={slide.subtitle}
                            onChange={(e) => handleUpdateSlide(slide.id, 'subtitle', e.target.value)}
                            className="px-2.5 py-1.5 bg-surface-container-lowest rounded-lg border border-border-subtle"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-text-muted">URL Gambar Banner:</label>
                        <input
                          type="text"
                          value={slide.imageUrl}
                          onChange={(e) => handleUpdateSlide(slide.id, 'imageUrl', e.target.value)}
                          className="px-2.5 py-1.5 bg-surface-container-lowest rounded-lg border border-border-subtle text-xs"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveSlide(slide.id)}
                      className="text-error hover:bg-red-50 p-2 rounded-lg transition-colors self-end sm:self-center"
                      title="Hapus Slide Ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Kotak Quick Stats */}
            <div className="flex flex-col gap-4 pt-4 border-t border-border-subtle">
              <h3 className="text-sm font-heading font-bold text-primary">
                3 Kotak Statistik Cepat (Quick Stats)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {settings.hero.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="p-3 bg-surface-container-low rounded-xl border border-border-subtle flex flex-col gap-2">
                    <span className="text-[10px] font-heading font-bold text-secondary">
                      Kotak Statistik #{sIdx + 1}
                    </span>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...settings.hero.stats];
                        newStats[sIdx] = { ...newStats[sIdx], value: e.target.value };
                        setSettings({
                          ...settings,
                          hero: { ...settings.hero, stats: newStats },
                        });
                      }}
                      className="px-2.5 py-1.5 bg-surface-container-lowest rounded-lg border border-border-subtle font-extrabold text-primary text-sm"
                      placeholder="Angka (e.g. 10)"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...settings.hero.stats];
                        newStats[sIdx] = { ...newStats[sIdx], label: e.target.value };
                        setSettings({
                          ...settings,
                          hero: { ...settings.hero, stats: newStats },
                        });
                      }}
                      className="px-2.5 py-1 bg-surface-container-lowest rounded-lg border border-border-subtle font-bold text-xs"
                      placeholder="Label (e.g. Kabupaten & Kota)"
                    />
                    <input
                      type="text"
                      value={stat.sublabel}
                      onChange={(e) => {
                        const newStats = [...settings.hero.stats];
                        newStats[sIdx] = { ...newStats[sIdx], sublabel: e.target.value };
                        setSettings({
                          ...settings,
                          hero: { ...settings.hero, stats: newStats },
                        });
                      }}
                      className="px-2.5 py-1 bg-surface-container-lowest rounded-lg border border-border-subtle text-[11px] text-text-muted"
                      placeholder="Sublabel"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: HEADER & NAVBAR */}
        {/* ========================================================================= */}
        {activeTab === 'header-navbar' && (
          <div className="flex flex-col gap-6">
            <div className="border-b border-border-subtle pb-4">
              <h2 className="text-base font-heading font-bold text-primary">
                Pengaturan Header & Navbar
              </h2>
              <p className="text-[11px] text-text-muted">
                Atur teks running ticker berita kilat, hotline bilah atas, brand title, dan tombol aksi navbar.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-heading font-bold text-secondary text-xs uppercase tracking-wider">
                Bilah Atas (Header Top Bar)
              </h3>
              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Teks Ticker Berjalan / Pengumuman</label>
                <input
                  type="text"
                  value={settings.header.tickerText}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      header: { ...settings.header, tickerText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Tautan Ticker Pengumuman</label>
                  <input
                    type="text"
                    value={settings.header.tickerLink}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        header: { ...settings.header, tickerLink: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Label Info Bilah Atas</label>
                  <input
                    type="text"
                    value={settings.header.topNotice}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        header: { ...settings.header, topNotice: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4 border-t border-border-subtle">
              <h3 className="font-heading font-bold text-secondary text-xs uppercase tracking-wider">
                Bilah Navigasi Utama (Navbar)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Nama Brand Navbar</label>
                  <input
                    type="text"
                    value={settings.navbar.brandTitle}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        navbar: { ...settings.navbar, brandTitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Subjudul Brand Navbar</label>
                  <input
                    type="text"
                    value={settings.navbar.brandSubtitle}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        navbar: { ...settings.navbar, brandSubtitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Teks Tombol Aksi Navbar</label>
                  <input
                    type="text"
                    value={settings.navbar.ctaText}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        navbar: { ...settings.navbar, ctaText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Link Tombol Aksi Navbar</label>
                  <input
                    type="text"
                    value={settings.navbar.ctaLink}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        navbar: { ...settings.navbar, ctaLink: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SAMBUTAN KEPALA UPTD & KONTEN */}
        {/* ========================================================================= */}
        {activeTab === 'content' && (
          <div className="flex flex-col gap-6">
            <div className="border-b border-border-subtle pb-4">
              <h2 className="text-base font-heading font-bold text-primary">
                Sambutan Kepala UPTD & Komitmen Pelayanan
              </h2>
              <p className="text-[11px] text-text-muted">
                Atur foto pejabat, nama, gelar, jabatan resmi, judul sambutan, dan kutipan sambutan resmi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start p-4 rounded-2xl bg-surface-container-low border border-border-subtle">
              {/* Foto Pejabat */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <span className="text-[11px] font-heading font-bold text-text-muted">Foto Pejabat:</span>
                <div className="w-28 h-28 rounded-2xl bg-white border border-border-subtle shadow-xs overflow-hidden flex items-center justify-center">
                  {settings.welcome.leaderPhoto ? (
                    <img
                      src={settings.welcome.leaderPhoto}
                      alt="Foto Pejabat"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-text-muted text-center p-2 font-semibold">
                      Belum ada foto (Klik unggah)
                    </span>
                  )}
                </div>
                <input
                  ref={leaderPhotoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLeaderPhotoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => leaderPhotoInputRef.current?.click()}
                  className="px-3 py-1 bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary rounded-lg border border-border-subtle text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  <span>Unggah Foto</span>
                </button>
              </div>

              {/* Data Pejabat */}
              <div className="flex-1 flex flex-col gap-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-heading font-bold text-on-surface">Nama Pejabat Beserta Gelar</label>
                    <input
                      type="text"
                      value={settings.welcome.leaderName}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          welcome: { ...settings.welcome, leaderName: e.target.value },
                        })
                      }
                      className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle font-bold"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-heading font-bold text-on-surface">Jabatan Resmi</label>
                    <input
                      type="text"
                      value={settings.welcome.leaderTitle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          welcome: { ...settings.welcome, leaderTitle: e.target.value },
                        })
                      }
                      className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Judul Sambutan</label>
                  <input
                    type="text"
                    value={settings.welcome.title}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        welcome: { ...settings.welcome, title: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle font-bold text-primary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Teks Isi Sambutan</label>
                  <textarea
                    rows={4}
                    value={settings.welcome.speechContent}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        welcome: { ...settings.welcome, speechContent: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SIDEBAR */}
        {/* ========================================================================= */}
        {activeTab === 'sidebar' && (
          <div className="flex flex-col gap-6">
            <div className="border-b border-border-subtle pb-4">
              <h2 className="text-base font-heading font-bold text-primary">
                Pengaturan Sidebar Informasi & Peringatan Dini
              </h2>
              <p className="text-[11px] text-text-muted">
                Atur kartu status peringatan dini OPT, komoditas rawan, jam pelayanan, dan nomor kontak siaga.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-border-subtle flex flex-col gap-4">
              <span className="font-heading font-bold text-secondary text-xs uppercase tracking-wider">
                Widget Peringatan Dini OPT
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Tingkat Status Siaga</label>
                  <input
                    type="text"
                    value={settings.sidebar.alertLevel}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sidebar: { ...settings.sidebar, alertLevel: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle font-bold text-tertiary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Komoditas Terdampak</label>
                  <input
                    type="text"
                    value={settings.sidebar.alertCommodity}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sidebar: { ...settings.sidebar, alertCommodity: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-heading font-bold text-on-surface">Judul Peringatan Cuaca/OPT</label>
                <input
                  type="text"
                  value={settings.sidebar.alertTitle}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      sidebar: { ...settings.sidebar, alertTitle: e.target.value },
                    })
                  }
                  className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle font-bold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-heading font-bold text-on-surface">Deskripsi Peringatan</label>
                <textarea
                  rows={2}
                  value={settings.sidebar.alertDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      sidebar: { ...settings.sidebar, alertDescription: e.target.value },
                    })
                  }
                  className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Teks Tombol Aksi</label>
                  <input
                    type="text"
                    value={settings.sidebar.alertCtaText}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sidebar: { ...settings.sidebar, alertCtaText: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Tautan Tombol Aksi</label>
                  <input
                    type="text"
                    value={settings.sidebar.alertCtaLink}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sidebar: { ...settings.sidebar, alertCtaLink: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-border-subtle flex flex-col gap-4">
              <span className="font-heading font-bold text-secondary text-xs uppercase tracking-wider">
                Widget Jam Pelayanan & Hotline
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Nomor Telepon Hotline</label>
                  <input
                    type="text"
                    value={settings.sidebar.hotlinePhone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sidebar: { ...settings.sidebar, hotlinePhone: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Jam Senin - Kamis</label>
                  <input
                    type="text"
                    value={settings.sidebar.hotlineHoursWeekday}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sidebar: { ...settings.sidebar, hotlineHoursWeekday: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Jam Jumat</label>
                  <input
                    type="text"
                    value={settings.sidebar.hotlineHoursFriday}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sidebar: { ...settings.sidebar, hotlineHoursFriday: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: AGENDA & PUBLIKASI */}
        {/* ========================================================================= */}
        {activeTab === 'agenda-pub' && (
          <div className="flex flex-col gap-6">
            <div className="border-b border-border-subtle pb-4">
              <h2 className="text-base font-heading font-bold text-primary">
                Pengaturan Kolom Agenda & Publikasi Teknis
              </h2>
              <p className="text-[11px] text-text-muted">
                Atur judul seksi, subjudul, serta label tombol tautan untuk agenda dan dokumen publikasi/SOP.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Judul Seksi</label>
                <input
                  type="text"
                  value={settings.agendaPubSection.title}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      agendaPubSection: { ...settings.agendaPubSection, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle font-bold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Subjudul Seksi</label>
                <input
                  type="text"
                  value={settings.agendaPubSection.subtitle}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      agendaPubSection: { ...settings.agendaPubSection, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Label Tombol Agenda</label>
                <input
                  type="text"
                  value={settings.agendaPubSection.agendaCtaText}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      agendaPubSection: { ...settings.agendaPubSection, agendaCtaText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Label Tombol Publikasi & SOP</label>
                <input
                  type="text"
                  value={settings.agendaPubSection.pubCtaText}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      agendaPubSection: { ...settings.agendaPubSection, pubCtaText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: MEDIA (GALERI FOTO & VIDEO) */}
        {/* ========================================================================= */}
        {activeTab === 'media' && (
          <div className="flex flex-col gap-6">
            <div className="border-b border-border-subtle pb-4">
              <h2 className="text-base font-heading font-bold text-primary">
                Pengaturan Kolom Foto & Video Edukasi
              </h2>
              <p className="text-[11px] text-text-muted">
                Atur judul, deskripsi, dan tombol aksi pada seksi galeri foto dan pemutar video edukasi.
              </p>
            </div>

            {/* Kolom Galeri Foto */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-border-subtle flex flex-col gap-3">
              <span className="font-heading font-bold text-secondary text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                <span>Kolom Galeri Foto</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Judul Seksi Galeri</label>
                  <input
                    type="text"
                    value={settings.gallerySection.title}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        gallerySection: { ...settings.gallerySection, title: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle font-bold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Label Tombol Lihat Semua</label>
                  <input
                    type="text"
                    value={settings.gallerySection.ctaText}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        gallerySection: { ...settings.gallerySection, ctaText: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-heading font-bold text-on-surface">Subjudul / Deskripsi Galeri</label>
                <input
                  type="text"
                  value={settings.gallerySection.subtitle}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      gallerySection: { ...settings.gallerySection, subtitle: e.target.value },
                    })
                  }
                  className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle"
                />
              </div>
            </div>

            {/* Kolom Video Edukasi */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-border-subtle flex flex-col gap-3">
              <span className="font-heading font-bold text-secondary text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-4 h-4" />
                <span>Kolom Video Edukasi OPT</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Judul Seksi Video</label>
                  <input
                    type="text"
                    value={settings.videoSection.title}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        videoSection: { ...settings.videoSection, title: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Label Tombol Saluran Video</label>
                  <input
                    type="text"
                    value={settings.videoSection.ctaText}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        videoSection: { ...settings.videoSection, ctaText: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-heading font-bold text-on-surface">Subjudul / Deskripsi Video</label>
                <input
                  type="text"
                  value={settings.videoSection.subtitle}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      videoSection: { ...settings.videoSection, subtitle: e.target.value },
                    })
                  }
                  className="px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: FOOTER */}
        {/* ========================================================================= */}
        {activeTab === 'footer' && (
          <div className="flex flex-col gap-6">
            <div className="border-b border-border-subtle pb-4">
              <h2 className="text-base font-heading font-bold text-primary">
                Pengaturan Footer Website
              </h2>
              <p className="text-[11px] text-text-muted">
                Atur deskripsi profil ringkas di footer dan teks hak cipta (copyright).
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Deskripsi Ringkas Instansi di Footer</label>
                <textarea
                  rows={3}
                  value={settings.footer.description}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      footer: { ...settings.footer, description: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Teks Hak Cipta (Copyright Notice)</label>
                <input
                  type="text"
                  value={settings.footer.copyrightText}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      footer: { ...settings.footer, copyrightText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle font-semibold"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Action */}
        <div className="pt-6 border-t border-border-subtle flex items-center justify-between">
          <span className="text-[11px] text-text-muted">
            Tersimpan langsung ke Supabase Cloud (Live Sync ke semua perangkat pengunjung)
          </span>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-secondary text-on-primary font-heading text-xs font-bold rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-kaltim-gold disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-kaltim-gold" />
                <span>Menyimpan ke Cloud...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-kaltim-gold" />
                <span>Simpan Perubahan ke Supabase Cloud</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
