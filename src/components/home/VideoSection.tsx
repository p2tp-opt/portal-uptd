import React, { useEffect, useState } from 'react';
import { Play, PlayCircle, ExternalLink, X } from 'lucide-react';
import { Video } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { formatDateWITA } from '../../utils/date';
import { SampleBadge } from '../common/SampleBadge';

export const VideoSection: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    contentRepository.listVideos({ limit: 4 }).then(setVideos);
  }, []);

  const featured = videos[0];
  const playlist = videos.slice(1);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
      <div className="flex flex-col gap-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-secondary font-heading text-xs uppercase tracking-wider font-bold mb-1">
            <PlayCircle className="w-4 h-4" />
            <span>Media Audio Visual</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
            Video Edukasi & Pengendalian OPT
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Panduan praktis berformat video untuk mempermudah pekebun mengendalikan hama dan penyakit secara terpadu.
          </p>
        </div>

        {featured && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Video Utama (Featured 7-col) */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md border border-border-subtle flex flex-col group">
              <div
                className="relative w-full aspect-video bg-surface-container-high overflow-hidden cursor-pointer"
                onClick={() => setActiveVideo(featured)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveVideo(featured);
                  }
                }}
                aria-label={`Putar video: ${featured.title}`}
              >
                <img
                  src={featured.thumbnailUrl}
                  alt={featured.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/30 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                  <div className="w-16 h-16 rounded-full bg-kaltim-gold text-on-tertiary-fixed flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>
                {featured.duration && (
                  <div className="absolute bottom-3 right-3 bg-primary/90 text-on-primary text-xs font-bold px-2.5 py-1 rounded">
                    {featured.duration}
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="bg-badge-opt-bg text-badge-opt-text text-xs font-heading px-2.5 py-0.5 rounded-full font-bold">
                    Video Utama
                  </span>
                  <span className="text-xs text-text-muted">
                    {formatDateWITA(featured.publishedAt)}
                  </span>
                  {featured.isSample && <SampleBadge />}
                </div>

                <h3 className="text-lg font-heading font-bold text-primary group-hover:text-secondary transition-colors">
                  {featured.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {featured.description}
                </p>
              </div>
            </div>

            {/* Playlist Video Pendukung (5-col) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {playlist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveVideo(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveVideo(item);
                    }
                  }}
                  className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-border-subtle hover:shadow-md transition-all flex gap-4 items-center group cursor-pointer"
                  aria-label={`Putar video: ${item.title}`}
                >
                  <div className="relative w-32 aspect-video rounded-xl overflow-hidden bg-surface-container-high flex-shrink-0">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                      <PlayCircle className="w-6 h-6 text-white" />
                    </div>
                    {item.duration && (
                      <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[10px] px-1 rounded">
                        {item.duration}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-[11px] text-secondary font-bold">
                      {item.category}
                    </span>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-primary group-hover:text-secondary transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}

              {/* YouTube Channel Banner */}
              <div className="p-4 rounded-2xl bg-surface-container-low border border-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center flex-shrink-0">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-xs sm:text-sm text-primary">
                      Saluran YouTube Resmi
                    </span>
                    <span className="text-[11px] text-text-muted">
                      Video bimbingan teknis & penyuluhan
                    </span>
                  </div>
                </div>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-primary hover:bg-secondary text-on-primary font-heading text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                >
                  <span>Kunjungi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal Pemutar Video Aman */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label={`Memutar ${activeVideo.title}`}
          >
            <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Tutup video"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full">
                <iframe
                  src={activeVideo.videoUrl}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              <div className="p-4 bg-surface-container-lowest text-on-surface">
                <h3 className="font-heading font-bold text-base text-primary">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  {activeVideo.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
