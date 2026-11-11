import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, CalendarDays, ArrowRight } from 'lucide-react';
import { News } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { formatDateWITA } from '../../utils/date';
import { SampleBadge } from '../common/SampleBadge';

export const NewsSection: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentRepository.listNews({ limit: 3 }).then((data) => {
      setNewsList(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-secondary font-heading text-xs uppercase tracking-wider font-bold mb-1">
            <Newspaper className="w-4 h-4" />
            <span>Kabar dari Lapangan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
            Berita & Artikel Terkini
          </h2>
        </div>
        <Link
          to="/berita"
          className="inline-flex items-center gap-1 text-secondary font-heading text-sm font-bold hover:text-primary transition-colors"
        >
          <span>Indeks Berita Selengkapnya</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 bg-surface-container-high animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsList.map((item) => (
            <article
              key={item.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-border-subtle hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Gambar Cover */}
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

              {/* Konten Berita */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <CalendarDays className="w-3.5 h-3.5 text-secondary" />
                    <span>{formatDateWITA(item.publishedAt)}</span>
                  </div>

                  <h3 className="text-base font-heading font-bold text-primary group-hover:text-secondary line-clamp-2 transition-colors">
                    <Link to={`/berita/${item.slug}`} className="focus:outline-none">
                      {item.title}
                    </Link>
                  </h3>

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
                    <span>Baca</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
