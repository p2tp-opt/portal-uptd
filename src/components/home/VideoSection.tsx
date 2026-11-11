import React, { useEffect, useState } from 'react';
import { Play, PlayCircle, ExternalLink, X } from 'lucide-react';
import { Video } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { defaultSiteSettings } from '../../data/defaultSiteSettings';
import { formatDateWITA } from '../../utils/date';
import { SampleBadge } from '../common/SampleBadge';

export const VideoSection: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [videoSettings, setVideoSettings] = useState(defaultSiteSettings.videoSection);

  useEffect(() => {
    contentRepository.listVideos({ limit: 4 }).then(setVideos);
    contentRepository.getSiteSettings().then((s) => {
      if (s?.videoSection) setVideoSettings(s.videoSection);
    });
  }, []);

  const featured = videos[0];
  const playlist = videos.slice(1);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
      <div className="flex flex-col gap-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-secondary font-heading text-xs uppercase tracking-wider font-bold mb-1">
            <PlayCircle className="w-4 h-4" />
            <span>{videoSettings.badge || 'Media Audio Visual'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
            {videoSettings.title || 'Video Edukasi & Pengendalian OPT'}
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            {videoSettings.subtitle ||
              'Panduan praktis berformat video untuk mempermudah pekebun mengendalikan hama dan penyakit secara terpadu.'}
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
                <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm text-on-primary text-xs font-bold px-2.5 py-1 rounded-full">
                  Video Pilihan
                </div>
                {featured.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded font-mono">
                    {featured.duration}
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-heading font-bold text-secondary uppercase tracking-wider">
                      {featured.category}
                    </span>
                    {featured.isSample && <SampleBadge />}
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-primary leading-snug">
                    {featured.title}
                  </h3>
                  {featured.description && (
                    <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
                      {featured.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
                  <span>Dipublikasikan: {formatDateWITA(featured.publishedAt)}</span>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(featured)}
                    className="inline-flex items-center gap-1.5 text-secondary font-heading font-bold hover:underline"
                  >
                    <span>Putar Sekarang</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            </div>

            {/* Playlist Samping (5-col) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="font-heading font-bold text-sm text-primary">
                  Daftar Putar Terkait ({videos.length} Video)
                </span>
                <a
                  href={videoSettings.ctaLink || 'https://www.youtube.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-secondary hover:text-primary font-heading font-semibold flex items-center gap-1"
                >
                  <span>{videoSettings.ctaText || 'Saluran Video YouTube UPTD'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex flex-col gap-3 flex-1">
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
                    className="flex gap-4 p-3 bg-surface-container-lowest hover:bg-surface-container rounded-2xl border border-border-subtle transition-all cursor-pointer group"
                  >
                    <div className="relative w-32 aspect-video rounded-xl overflow-hidden bg-surface-container-high flex-shrink-0">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center group-hover:bg-primary/10">
                        <div className="w-8 h-8 rounded-full bg-kaltim-gold/90 text-on-tertiary-fixed flex items-center justify-center">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                      </div>
                      {item.duration && (
                        <div className="absolute bottom-1 right-1 bg-black/75 text-white text-[10px] px-1.5 rounded font-mono">
                          {item.duration}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between min-w-0 py-0.5 flex-1">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-secondary tracking-wider block mb-1">
                          {item.category}
                        </span>
                        <h4 className="font-heading font-bold text-xs text-on-surface line-clamp-2 group-hover:text-secondary transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-[11px] text-text-muted mt-1">
                        {formatDateWITA(item.publishedAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Player Video Aman (youtube-nocookie.com) */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full border border-border-subtle flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
                <span className="font-heading font-bold text-xs truncate pr-4">
                  {activeVideo.title}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Tutup pemutar video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full aspect-video bg-black">
                {activeVideo.videoUrl.startsWith('data:') || activeVideo.videoUrl.includes('.mp4') || activeVideo.videoUrl.includes('.webm') ? (
                  <video
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={activeVideo.videoUrl}
                    title={activeVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              <div className="p-4 flex items-center justify-between text-xs text-text-muted">
                <span>Kategori: <strong className="text-secondary">{activeVideo.category}</strong></span>
                <a
                  href={activeVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-secondary hover:underline font-bold"
                >
                  <span>Buka di Tab Baru</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
