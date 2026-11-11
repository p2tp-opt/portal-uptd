import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import { Photo } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { defaultSiteSettings } from '../../data/defaultSiteSettings';
import { formatDateWITA } from '../../utils/date';
import { SampleBadge } from '../common/SampleBadge';

export const GallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [gallerySettings, setGallerySettings] = useState(defaultSiteSettings.gallerySection);

  useEffect(() => {
    contentRepository.listPhotos({ limit: 4 }).then(setPhotos);
    contentRepository.getSiteSettings().then((s) => {
      if (s?.gallerySection) setGallerySettings(s.gallerySection);
    });
  }, []);

  return (
    <section className="bg-surface-container-low py-12 lg:py-16 w-full border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-secondary font-heading text-xs uppercase tracking-wider font-bold mb-1">
              <Camera className="w-4 h-4" />
              <span>{gallerySettings.badge || 'Dokumentasi Tindakan Nyata'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
              {gallerySettings.title || 'Galeri Kegiatan Perlindungan'}
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-xl">
              {gallerySettings.subtitle ||
                'Aktivitas pengawalan kesehatan tanaman perkebunan bersama petani dan penyuluh se-Kalimantan Timur.'}
            </p>
          </div>
          <Link
            to={gallerySettings.ctaLink || '/galeri'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary text-primary font-heading text-xs font-bold rounded-xl transition-all shadow-sm border border-border-subtle"
          >
            <span>{gallerySettings.ctaText || 'Lihat Semua Dokumentasi Foto'}</span>
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

              <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
                <div>
                  <h3 className="font-heading font-bold text-sm text-on-surface line-clamp-2 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-text-muted line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
                  <span>{item.takenAt ? formatDateWITA(item.takenAt) : 'Kalimantan Timur'}</span>
                  <span className="text-secondary font-semibold group-hover:underline">Detail</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
