import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { CalendarDays, User, ArrowLeft, Tag, Newspaper } from 'lucide-react';
import { News } from '../types/content';
import { contentRepository } from '../services/contentRepository';
import { formatDateWITA } from '../utils/date';
import { SampleBadge } from '../components/common/SampleBadge';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      contentRepository.getNewsBySlug(slug).then((data) => {
        setNews(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-text-muted">Memuat artikel...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center flex flex-col items-center gap-4">
        <Newspaper className="w-16 h-16 text-outline" />
        <h1 className="text-2xl font-heading font-bold text-primary">Artikel Tidak Ditemukan</h1>
        <p className="text-xs text-text-muted">
          Berita yang Anda cari tidak tersedia atau tautan sudah diperbarui.
        </p>
        <Link
          to="/berita"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold font-heading hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Indeks Berita</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="bg-surface-container-lowest border-b border-border-subtle">
        <Breadcrumb
          items={[
            { label: 'Berita & Artikel', path: '/berita' },
            { label: news.title },
          ]}
        />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-8">
        {/* Header Artikel */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-badge-opt-bg text-badge-opt-text text-xs font-heading font-bold px-3 py-1 rounded-full">
              {news.category}
            </span>
            {news.isSample && <SampleBadge />}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-primary leading-tight">
            {news.title}
          </h1>

          {/* Metadata Penulis & Waktu */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted border-y border-border-subtle py-3">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-secondary" />
              <span>{formatDateWITA(news.publishedAt)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-secondary" />
              <span>Penulis: {news.author}</span>
            </div>
          </div>
        </div>

        {/* Gambar Cover Utama */}
        {news.coverImage && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md bg-surface-container-high border border-border-subtle">
            <img
              src={news.coverImage}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Isi Artikel (Paragraf Bersih) */}
        <div className="prose prose-sm sm:prose max-w-none text-on-surface leading-relaxed flex flex-col gap-4 text-xs sm:text-sm whitespace-pre-line">
          {news.content}
        </div>

        {/* Footer Artikel & Tombol Navigasi */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Tag className="w-3.5 h-3.5" />
            <span>Kategori: {news.category}</span>
          </div>
        </div>
      </article>
    </div>
  );
};
