import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { CalendarDays, Newspaper, Search, ArrowRight, Tag } from 'lucide-react';
import { News } from '../types/content';
import { contentRepository } from '../services/contentRepository';
import { formatDateWITA } from '../utils/date';
import { SampleBadge } from '../components/common/SampleBadge';

export const NewsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get('q') || '';
  const category = searchParams.get('kategori') || '';

  useEffect(() => {
    setLoading(true);
    contentRepository
      .listNews({ query, category })
      .then((data) => {
        setNewsList(data);
        setLoading(false);
      });
  }, [query, category]);

  const categories = ['Semua', 'Gerakan Pengendalian', 'Inovasi Hayati', 'Mitigasi Iklim'];

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="bg-surface-container-lowest border-b border-border-subtle">
        <Breadcrumb items={[{ label: 'Berita & Artikel' }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-secondary font-heading text-xs uppercase tracking-wider font-bold">
              Publikasi Informasi
            </span>
            <SampleBadge />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">
            Berita & Artikel Terkini
          </h1>
          <p className="text-sm sm:text-base text-text-muted mt-2 max-w-2xl">
            Kabar lapangan, bimbingan teknis, dan informasi perkembangan perlindungan tanaman perkebunan se-Kalimantan Timur.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-8">
        {/* Filter & Pencarian */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-border-subtle shadow-sm">
          {/* Tombol Kategori */}
          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            <Tag className="w-4 h-4 text-secondary hidden sm:inline" />
            {categories.map((cat) => {
              const isSelected =
                (cat === 'Semua' && !category) || category.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    if (cat === 'Semua') {
                      newParams.delete('kategori');
                    } else {
                      newParams.set('kategori', cat);
                    }
                    setSearchParams(newParams);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-colors ${
                    isSelected
                      ? 'bg-secondary text-on-secondary shadow-xs'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Form Pencarian */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                const newParams = new URLSearchParams(searchParams);
                if (e.target.value) {
                  newParams.set('q', e.target.value);
                } else {
                  newParams.delete('q');
                }
                setSearchParams(newParams);
              }}
              placeholder="Cari judul berita..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-container-low text-on-surface rounded-full focus:outline-none focus:ring-2 focus:ring-kaltim-gold placeholder:text-outline border border-border-subtle"
            />
            <Search className="w-4 h-4 absolute left-3 top-2 text-outline pointer-events-none" />
          </div>
        </div>

        {/* Daftar Berita */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-surface-container-high animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : newsList.length === 0 ? (
          <div className="bg-surface-container-lowest p-12 rounded-2xl border border-border-subtle text-center flex flex-col items-center gap-3">
            <Newspaper className="w-12 h-12 text-outline" />
            <h3 className="font-heading font-bold text-lg text-primary">Tidak Ada Berita Ditemukan</h3>
            <p className="text-xs text-text-muted max-w-sm">
              Tidak ada artikel yang cocok dengan filter atau kata kunci pencarian Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsList.map((item) => (
              <article
                key={item.id}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-border-subtle hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative w-full aspect-video overflow-hidden bg-surface-container-high">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-1">
                    <span className="bg-badge-opt-bg text-badge-opt-text font-heading text-[11px] px-2.5 py-1 rounded-full font-bold shadow-sm">
                      {item.category}
                    </span>
                    {item.isSample && <SampleBadge />}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <CalendarDays className="w-3.5 h-3.5 text-secondary" />
                      <span>{formatDateWITA(item.publishedAt)}</span>
                    </div>

                    <h2 className="text-base font-heading font-bold text-primary group-hover:text-secondary line-clamp-2 transition-colors">
                      <Link to={`/berita/${item.slug}`} className="focus:outline-none">
                        {item.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border-subtle text-xs text-text-muted">
                    <span className="truncate max-w-[150px]">Oleh: {item.author}</span>
                    <Link
                      to={`/berita/${item.slug}`}
                      className="font-bold text-secondary group-hover:underline flex items-center gap-1"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
