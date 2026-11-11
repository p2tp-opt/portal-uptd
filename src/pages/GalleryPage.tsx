import React, { useEffect, useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Camera, PlayCircle, Play, X, CalendarDays, Maximize2 } from 'lucide-react';
import { Photo, Video } from '../types/content';
import { contentRepository } from '../services/contentRepository';
import { formatDateWITA } from '../utils/date';
import { SampleBadge } from '../components/common/SampleBadge';

export const GalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'foto' | 'video'>('foto');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    contentRepository.listPhotos().then(setPhotos);
    contentRepository.listVideos().then(setVideos);
  }, []);

  // Keyboard accessibility: Escape menutup modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="bg-surface-container-lowest border-b border-border-subtle">
        <Breadcrumb items={[{ label: 'Galeri Dokumentasi' }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-secondary font-heading text-xs uppercase tracking-wider font-bold">
              Dokumentasi Visual
            </span>
            <SampleBadge />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">
            Galeri Kegiatan & Video Edukasi
          </h1>
          <p className="text-sm sm:text-base text-text-muted mt-2 max-w-2xl">
            Dokumentasi foto lapangan, produksi agens hayati laboratorium, dan materi video edukasi perlindungan tanaman.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-8">
        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-surface-container-lowest p-2 rounded-xl border border-border-subtle self-start shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('foto')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-heading font-semibold transition-colors ${
              activeTab === 'foto'
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Dokumentasi Foto ({photos.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-heading font-semibold transition-colors ${
              activeTab === 'video'
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            <span>Video Edukasi ({videos.length})</span>
          </button>
        </div>

        {/* Tab 1: Galeri Foto */}
        {activeTab === 'foto' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedPhoto(photo);
                  }
                }}
                className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-border-subtle hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                aria-label={`Buka foto: ${photo.title}`}
              >
                <div className="relative w-full aspect-[4/3] bg-surface-container-high overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.altText}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-surface-container-lowest/90 text-primary flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1">
                    <span className="bg-primary/80 backdrop-blur-sm text-on-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {photo.category}
                    </span>
                    {photo.isSample && <SampleBadge />}
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
                  <div>
                    {photo.takenAt && (
                      <span className="text-[11px] text-text-muted flex items-center gap-1 mb-1">
                        <CalendarDays className="w-3.5 h-3.5 text-secondary" />
                        <span>{formatDateWITA(photo.takenAt)}</span>
                      </span>
                    )}
                    <h2 className="font-heading font-bold text-sm text-primary group-hover:text-secondary line-clamp-2">
                      {photo.title}
                    </h2>
                  </div>
                  {photo.description && (
                    <p className="text-xs text-text-muted line-clamp-2">
                      {photo.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Video Edukasi */}
        {activeTab === 'video' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedVideo(vid);
                  }
                }}
                className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-border-subtle hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                aria-label={`Putar video: ${vid.title}`}
              >
                <div className="relative w-full aspect-video bg-surface-container-high overflow-hidden">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/30 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                    <div className="w-12 h-12 rounded-full bg-kaltim-gold text-on-tertiary-fixed flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  {vid.duration && (
                    <div className="absolute bottom-2.5 right-2.5 bg-primary/90 text-on-primary text-[10px] font-bold px-2 py-0.5 rounded">
                      {vid.duration}
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-1">
                    <span className="bg-badge-opt-bg text-badge-opt-text text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {vid.category}
                    </span>
                    {vid.isSample && <SampleBadge />}
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
                  <div>
                    <span className="text-[11px] text-text-muted flex items-center gap-1 mb-1">
                      <CalendarDays className="w-3.5 h-3.5 text-secondary" />
                      <span>{formatDateWITA(vid.publishedAt)}</span>
                    </span>
                    <h2 className="font-heading font-bold text-sm text-primary group-hover:text-secondary line-clamp-2">
                      {vid.title}
                    </h2>
                  </div>
                  {vid.description && (
                    <p className="text-xs text-text-muted line-clamp-2">
                      {vid.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Lightbox Foto (A11y) */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.title}
          >
            <div className="relative max-w-4xl w-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Tutup foto"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full max-h-[70vh] bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.altText}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-5 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-surface-container-low text-secondary font-bold px-2.5 py-0.5 rounded-full">
                    {selectedPhoto.category}
                  </span>
                  {selectedPhoto.takenAt && (
                    <span className="text-xs text-text-muted">
                      {formatDateWITA(selectedPhoto.takenAt)}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-base text-primary">
                  {selectedPhoto.title}
                </h3>
                {selectedPhoto.description && (
                  <p className="text-xs text-text-muted">{selectedPhoto.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Video Player */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label={`Memutar ${selectedVideo.title}`}
          >
            <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                aria-label="Tutup video"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full bg-black">
                {selectedVideo.videoUrl.startsWith('data:') || selectedVideo.videoUrl.includes('.mp4') || selectedVideo.videoUrl.includes('.webm') ? (
                  <video
                    src={selectedVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={selectedVideo.videoUrl}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                )}
              </div>

              <div className="p-4 bg-surface-container-lowest text-on-surface">
                <h3 className="font-heading font-bold text-base text-primary">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs text-text-muted mt-1">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
