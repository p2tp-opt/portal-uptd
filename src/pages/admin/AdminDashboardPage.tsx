import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Newspaper,
  Calendar,
  FileText,
  Image,
  Video,
  PlusCircle,
  Settings,
  ExternalLink,
  AlertTriangle,
  Sliders,
  Cloud,
} from 'lucide-react';
import { contentRepository } from '../../services/contentRepository';
import { formatDateWITA } from '../../utils/date';
import { News, ProfileContact } from '../../types/content';

export const AdminDashboardPage: React.FC = () => {
  const [newsCount, setNewsCount] = useState(0);
  const [agendaCount, setAgendaCount] = useState(0);
  const [pubCount, setPubCount] = useState(0);
  const [photoCount, setPhotoCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [profile, setProfile] = useState<ProfileContact | null>(null);

  useEffect(() => {
    contentRepository.listNews().then((data) => {
      setNewsCount(data.length);
      setLatestNews(data.slice(0, 5));
    });
    contentRepository.listAgenda().then((data) => setAgendaCount(data.length));
    contentRepository.listPublications().then((data) => setPubCount(data.length));
    contentRepository.listPhotos().then((data) => setPhotoCount(data.length));
    contentRepository.listVideos().then((data) => setVideoCount(data.length));
    contentRepository.getProfile().then(setProfile);
  }, []);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Sambutan Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-border-subtle shadow-sm">
        <div>
          <span className="text-secondary font-heading text-xs uppercase tracking-wider font-bold">
            Pusat Kendali Konten
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary mt-0.5">
            Selamat Datang di Panel Operator UPTD P2TP
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Kelola seluruh konten, publikasi kegiatan, dan informasi kontak resmi yang tampil di halaman depan website.
          </p>
        </div>

        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-secondary text-on-primary rounded-xl font-heading text-xs font-bold transition-colors shadow-sm self-start sm:self-auto flex-shrink-0"
        >
          <span>Buka Website Publik</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Status Basis Data & Integrasi Supabase Cloud */}
      <div className="p-4 rounded-xl bg-badge-activity-bg text-badge-activity-text border border-green-300 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-secondary text-on-secondary flex-shrink-0 mt-0.5">
          <Cloud className="w-4 h-4 text-kaltim-gold" />
        </div>
        <div className="text-xs flex-1">
          <strong className="font-heading font-bold text-secondary block">
            Status Basis Data: Terhubung ke Supabase Cloud (Live Multi-Perangkat)
          </strong>
          <span className="text-secondary/90">
            Proyek Supabase: <code className="font-bold font-mono">smbmebkindtrqbhnygti.supabase.co</code>. Setiap perubahan konten (berita, agenda, publikasi, hero banner, teks sambutan, sidebar, foto, dan video) langsung tersinkronisasi ke cloud dan dapat dilihat langsung oleh pengunjung di perangkat mana pun secara realtime.
          </span>
        </div>
      </div>

      {/* Kartu Metrik Konten */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Link
          to="/admin/berita"
          className="bg-surface-container-lowest p-5 rounded-2xl border border-border-subtle hover:border-secondary transition-all shadow-xs flex flex-col gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-badge-opt-bg text-badge-opt-text flex items-center justify-center">
            <Newspaper className="w-5 h-5" />
          </div>
          <span className="text-2xl font-heading font-extrabold text-primary group-hover:text-secondary">
            {newsCount}
          </span>
          <span className="text-xs text-text-muted font-medium">Berita & Artikel</span>
        </Link>

        <Link
          to="/admin/agenda"
          className="bg-surface-container-lowest p-5 rounded-2xl border border-border-subtle hover:border-secondary transition-all shadow-xs flex flex-col gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-badge-activity-bg text-badge-activity-text flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-2xl font-heading font-extrabold text-primary group-hover:text-secondary">
            {agendaCount}
          </span>
          <span className="text-xs text-text-muted font-medium">Agenda Lapangan</span>
        </Link>

        <Link
          to="/admin/publikasi"
          className="bg-surface-container-lowest p-5 rounded-2xl border border-border-subtle hover:border-secondary transition-all shadow-xs flex flex-col gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-2xl font-heading font-extrabold text-primary group-hover:text-secondary">
            {pubCount}
          </span>
          <span className="text-xs text-text-muted font-medium">Publikasi / SOP</span>
        </Link>

        <Link
          to="/admin/galeri"
          className="bg-surface-container-lowest p-5 rounded-2xl border border-border-subtle hover:border-secondary transition-all shadow-xs flex flex-col gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary flex items-center justify-center">
            <Image className="w-5 h-5" />
          </div>
          <span className="text-2xl font-heading font-extrabold text-primary group-hover:text-secondary">
            {photoCount}
          </span>
          <span className="text-xs text-text-muted font-medium">Dokumentasi Foto</span>
        </Link>

        <Link
          to="/admin/galeri"
          className="bg-surface-container-lowest p-5 rounded-2xl border border-border-subtle hover:border-secondary transition-all shadow-xs flex flex-col gap-2 group col-span-2 sm:col-span-1"
        >
          <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <span className="text-2xl font-heading font-extrabold text-primary group-hover:text-secondary">
            {videoCount}
          </span>
          <span className="text-xs text-text-muted font-medium">Video Edukasi</span>
        </Link>
      </div>

      {/* Akses Cepat & Berita Terkini */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Tindakan Cepat (1-col) */}
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-heading font-bold text-primary">Tindakan Cepat</h2>
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-border-subtle shadow-sm flex flex-col gap-3">
            <Link
              to="/admin/tampilan"
              className="flex items-center gap-3 p-3 rounded-xl bg-gold-light hover:bg-gold-light/80 text-primary font-heading font-bold text-xs transition-colors border border-kaltim-gold/40 shadow-xs"
            >
              <Sliders className="w-4 h-4 text-secondary flex-shrink-0" />
              <span>Edit Tampilan & Konten Website (Hero, Slider, Sambutan, Sidebar, Footer)</span>
            </Link>

            <Link
              to="/admin/berita"
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-heading font-semibold text-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-secondary" />
              <span>Tulis Berita / Artikel Baru</span>
            </Link>

            <Link
              to="/admin/agenda"
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-heading font-semibold text-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-secondary" />
              <span>Tambah Jadwal Agenda Lapangan</span>
            </Link>

            <Link
              to="/admin/publikasi"
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-heading font-semibold text-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-secondary" />
              <span>Unggah Dokumen SOP / Regulasi</span>
            </Link>

            <Link
              to="/admin/pengaturan"
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-heading font-semibold text-xs transition-colors"
            >
              <Settings className="w-4 h-4 text-kaltim-gold" />
              <span>Edit Kontak & Jam Layanan</span>
            </Link>
          </div>

          {/* Status Data Instansi */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-border-subtle shadow-sm flex flex-col gap-3">
            <h3 className="text-xs font-heading font-bold text-primary flex items-center justify-between">
              <span>Status Verifikasi Data Resmi</span>
              {profile?.verified ? (
                <span className="text-[10px] bg-badge-activity-bg text-badge-activity-text px-2 py-0.5 rounded-full font-bold">
                  Terverifikasi
                </span>
              ) : (
                <span className="text-[10px] bg-gold-light text-tertiary px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-kaltim-gold" />
                  <span>Placeholder</span>
                </span>
              )}
            </h3>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Alamat, nomor telepon, dan jam kerja saat ini berstatus draft placeholder. Anda dapat memperbaruinya di halaman pengaturan kontak.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Tabel Publikasi Berita Terkini (2-col) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-bold text-primary">Artikel Berita Terakhir</h2>
            <Link
              to="/admin/berita"
              className="text-xs font-heading font-bold text-secondary hover:underline"
            >
              Kelola Semua
            </Link>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
            <div className="divide-y divide-border-subtle">
              {latestNews.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-heading font-bold text-primary truncate">
                      {item.title}
                    </h3>
                    <span className="text-[11px] text-text-muted">
                      {formatDateWITA(item.publishedAt)} • Oleh: {item.author}
                    </span>
                  </div>

                  <Link
                    to="/admin/berita"
                    className="px-3 py-1 bg-surface-container-low text-primary hover:bg-secondary hover:text-on-secondary rounded-lg text-xs font-heading font-semibold transition-colors flex-shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
