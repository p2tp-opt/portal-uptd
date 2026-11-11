import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import { Photo } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { formatDateWITA } from '../../utils/date';
import { SampleBadge } from '../common/SampleBadge';

export const GallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    contentRepository.listPhotos({ limit: 4 }).then(setPhotos);
  }, []);

  return (
    <section className="bg-surface-container-low py-12 lg:py-16 w-full border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-secondary font-heading text-xs uppercase tracking-wider font-bold mb-1">
              <Camera className="w-4 h-4" />
              <span>Dokumentasi Tindakan Nyata</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
              Galeri Kegiatan Perlindungan
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-xl">
              Aktivitas pengawalan kesehatan tanaman perkebunan bersama petani dan penyuluh se-Kalimantan Timur.
            </p>
          </div>
          <Link
            to="/galeri"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary text-primary font-heading text-xs font-bold rounded-xl transition-all shadow-sm border border-border-subtle"
          >
            <span>Lihat Semua Dokumentasi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Column Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((item) => (
            <div
              key={item.id}
              className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-border-subtle hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container-high">
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5 flex gap-1">
                  <span className="bg-primary/80 backdrop-blur-sm text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  {item.isSample && <SampleBadge />}
                </div>
              </div>

              <div className="p-4 flex flex-col gap-1 flex-1 justify-between">
                <div>
                  {item.takenAt && (
                    <span className="text-[11px] text-text-muted">
                      {formatDateWITA(item.takenAt)}
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-primary line-clamp-2 group-hover:text-secondary transition-colors mt-0.5">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
