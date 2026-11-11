import React, { useEffect, useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FileText, Download, CalendarDays, Search, Tag } from 'lucide-react';
import { Publication } from '../types/content';
import { contentRepository } from '../services/contentRepository';
import { formatDateWITA } from '../utils/date';
import { SampleBadge } from '../components/common/SampleBadge';

export const PublicationPage: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    contentRepository
      .listPublications({
        query,
        category: selectedCategory === 'Semua' ? undefined : selectedCategory,
      })
      .then((data) => {
        setPublications(data);
        setLoading(false);
      });
  }, [query, selectedCategory]);

  const categories = ['Semua', 'Buku Saku Teknis', 'Pedoman Teknis', 'Regulasi & SOP'];

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="bg-surface-container-lowest border-b border-border-subtle">
        <Breadcrumb items={[{ label: 'Publikasi & Dokumen' }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-secondary font-heading text-xs uppercase tracking-wider font-bold">
              Pusat Unduhan Resmi
            </span>
            <SampleBadge />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">
            Publikasi & Pedoman Teknis OPT
          </h1>
          <p className="text-sm sm:text-base text-text-muted mt-2 max-w-2xl">
            Kumpulan dokumen SOP perbanyakan agens hayati, modul bimbingan teknis, dan buku saku pengenalan hama perkebunan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-8">
        {/* Kontrol Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-border-subtle shadow-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-secondary hidden sm:inline" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-secondary text-on-secondary shadow-xs'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama dokumen..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-container-low text-on-surface rounded-full focus:outline-none focus:ring-2 focus:ring-kaltim-gold placeholder:text-outline border border-border-subtle"
            />
            <Search className="w-4 h-4 absolute left-3 top-2 text-outline pointer-events-none" />
          </div>
        </div>

        {/* Daftar Publikasi */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-surface-container-high animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : publications.length === 0 ? (
          <div className="bg-surface-container-lowest p-12 rounded-2xl border border-border-subtle text-center flex flex-col items-center gap-3">
            <FileText className="w-12 h-12 text-outline" />
            <h3 className="font-heading font-bold text-lg text-primary">Dokumen Tidak Ditemukan</h3>
            <p className="text-xs text-text-muted">Tidak ada publikasi yang sesuai kriteria pencarian.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-border-subtle hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-error/10 text-error flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-error" />
                  </div>

                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-surface-container-low text-secondary text-[11px] font-heading font-semibold px-2.5 py-0.5 rounded-full">
                        {pub.category}
                      </span>
                      {pub.isSample && <SampleBadge />}
                    </div>

                    <h2 className="text-base font-heading font-bold text-primary">
                      {pub.title}
                    </h2>

                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                      {pub.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-text-muted pt-1">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5 text-secondary" />
                        <span>{formatDateWITA(pub.publishedAt)}</span>
                      </div>
                      <span>•</span>
                      <span>Format: {pub.fileType || 'PDF'}</span>
                      <span>•</span>
                      <span>Ukuran: {pub.fileSize || 'Dokumen Resmi'}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={pub.documentUrl || '#'}
                  onClick={(e) => {
                    if (!pub.documentUrl || pub.documentUrl === '#') {
                      e.preventDefault();
                      alert('Dokumen ini merupakan data contoh (placeholder). Berkas PDF asli akan diunggah oleh instansi.');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary hover:bg-secondary font-heading text-xs font-bold rounded-xl transition-colors shadow-sm flex-shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Dokumen</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
