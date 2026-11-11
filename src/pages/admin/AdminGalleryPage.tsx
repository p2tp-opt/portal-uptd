import React, { useEffect, useState } from 'react';
import { Plus, Trash2, X, Camera, PlayCircle, CalendarDays } from 'lucide-react';
import { Photo, Video } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { formatDateWITA } from '../../utils/date';

export const AdminGalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'foto' | 'video'>('foto');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal Foto
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photoForm, setPhotoForm] = useState({
    title: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    category: 'Pengamatan Lapangan',
    altText: '',
    takenAt: new Date().toISOString().split('T')[0],
  });

  // Modal Video
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    category: 'Pengendalian Hayati',
    duration: '06:30',
  });

  const loadData = async () => {
    setLoading(true);
    const p = await contentRepository.listPhotos();
    const v = await contentRepository.listVideos();
    setPhotos(p);
    setVideos(v);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeletePhoto = async (id: string, title: string) => {
    if (window.confirm(`Hapus foto "${title}"?`)) {
      await contentRepository.deletePhoto(id);
      await loadData();
    }
  };

  const handleDeleteVideo = async (id: string, title: string) => {
    if (window.confirm(`Hapus video "${title}"?`)) {
      await contentRepository.deleteVideo(id);
      await loadData();
    }
  };

  const handleAddPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await contentRepository.createPhoto({
      title: photoForm.title,
      description: photoForm.description,
      imageUrl: photoForm.imageUrl,
      category: photoForm.category,
      altText: photoForm.altText || photoForm.title,
      takenAt: photoForm.takenAt,
    });
    setPhotoModalOpen(false);
    await loadData();
  };

  const handleAddVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await contentRepository.createVideo({
      title: videoForm.title,
      description: videoForm.description,
      thumbnailUrl: videoForm.thumbnailUrl,
      videoUrl: videoForm.videoUrl,
      category: videoForm.category,
      duration: videoForm.duration,
      publishedAt: new Date().toISOString(),
    });
    setVideoModalOpen(false);
    await loadData();
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-primary">
            Kelola Galeri Dokumentasi & Video
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Dokumentasi foto kegiatan surveilans lapangan dan video edukasi penanganan hama penyakit.
          </p>
        </div>

        <button
          type="button"
          onClick={() => (activeTab === 'foto' ? setPhotoModalOpen(true) : setVideoModalOpen(true))}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-secondary text-on-primary font-heading text-xs font-bold rounded-xl transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{activeTab === 'foto' ? 'Tambah Foto Baru' : 'Tambah Video Baru'}</span>
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 bg-surface-container-lowest p-2 rounded-xl border border-border-subtle self-start shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab('foto')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors ${
            activeTab === 'foto'
              ? 'bg-secondary text-on-secondary shadow-xs'
              : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Foto Dokumentasi ({photos.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('video')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors ${
            activeTab === 'video'
              ? 'bg-secondary text-on-secondary shadow-xs'
              : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          <span>Video Edukasi ({videos.length})</span>
        </button>
      </div>

      {/* Konten Foto */}
      {loading ? (
        <div className="p-8 text-center text-xs text-text-muted">Memuat galeri...</div>
      ) : activeTab === 'foto' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-border-subtle shadow-xs flex flex-col group"
            >
              <div className="relative aspect-[4/3] bg-surface-container-high overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.altText}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(photo.id, photo.title)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-error text-white transition-colors"
                  title="Hapus foto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-primary/80 text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {photo.category}
                </div>
              </div>

              <div className="p-3.5 flex flex-col gap-1">
                <h3 className="font-heading font-bold text-xs text-primary line-clamp-1">
                  {photo.title}
                </h3>
                <span className="text-[11px] text-text-muted">
                  Alt: {photo.altText}
                </span>
                {photo.takenAt && (
                  <span className="text-[10px] text-text-muted flex items-center gap-1 mt-1">
                    <CalendarDays className="w-3 h-3 text-secondary" />
                    <span>{formatDateWITA(photo.takenAt)}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-border-subtle shadow-xs flex flex-col"
            >
              <div className="relative aspect-video bg-surface-container-high overflow-hidden">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteVideo(vid.id, vid.title)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-error text-white transition-colors"
                  title="Hapus video"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {vid.duration && (
                  <div className="absolute bottom-2 right-2 bg-primary/90 text-on-primary text-[10px] font-bold px-2 py-0.5 rounded">
                    {vid.duration}
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">
                    {vid.category}
                  </span>
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-primary line-clamp-2 mt-0.5">
                    {vid.title}
                  </h3>
                  <p className="text-[11px] text-text-muted line-clamp-2 mt-1">
                    {vid.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Tambah Foto */}
      {photoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-border-subtle flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h2 className="text-lg font-heading font-extrabold text-primary">
                Tambah Foto Dokumentasi
              </h2>
              <button
                type="button"
                onClick={() => setPhotoModalOpen(false)}
                className="p-1.5 rounded-lg text-outline hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="flex flex-col gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-heading font-bold text-on-surface">Judul Foto Kegiatan</label>
                <input
                  type="text"
                  required
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  placeholder="Contoh: Pengamatan Lapang Hama Sawit di Kukar..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Kategori</label>
                  <select
                    value={photoForm.category}
                    onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                  >
                    <option value="Pengamatan Lapangan">Pengamatan Lapangan</option>
                    <option value="Laboratorium APH">Laboratorium APH</option>
                    <option value="Penyuluhan & Bimtek">Penyuluhan & Bimtek</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Tanggal Pengambilan</label>
                  <input
                    type="date"
                    value={photoForm.takenAt}
                    onChange={(e) => setPhotoForm({ ...photoForm, takenAt: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-heading font-bold text-on-surface">URL Gambar Foto</label>
                <input
                  type="url"
                  required
                  value={photoForm.imageUrl}
                  onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-heading font-bold text-on-surface">Teks Alternatif (Alt Text - Wajib WCAG)</label>
                <input
                  type="text"
                  required
                  value={photoForm.altText}
                  onChange={(e) => setPhotoForm({ ...photoForm, altText: e.target.value })}
                  placeholder="Deskripsikan isi gambar untuk tunanetra..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>

              <div className="pt-2 border-t border-border-subtle flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPhotoModalOpen(false)}
                  className="px-4 py-2 bg-surface-container-low rounded-xl font-heading font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-secondary text-on-primary rounded-xl font-heading font-bold shadow-sm"
                >
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Video */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-border-subtle flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h2 className="text-lg font-heading font-extrabold text-primary">
                Tambah Video Edukasi
              </h2>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-lg text-outline hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVideoSubmit} className="flex flex-col gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-heading font-bold text-on-surface">Judul Video</label>
                <input
                  type="text"
                  required
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  placeholder="Contoh: Video Bimbingan Teknis Agens Hayati..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Kategori</label>
                  <select
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                  >
                    <option value="Pengendalian Hayati">Pengendalian Hayati</option>
                    <option value="Edukasi Ekologi">Edukasi Ekologi</option>
                    <option value="Praktik Lapang">Praktik Lapang</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-heading font-bold text-on-surface">Durasi (MM:SS)</label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    placeholder="08:42"
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-heading font-bold text-on-surface">URL Sematan Video (youtube-nocookie.com)</label>
                <input
                  type="url"
                  required
                  value={videoForm.videoUrl}
                  onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-heading font-bold text-on-surface">URL Thumbnail Gambar</label>
                <input
                  type="url"
                  required
                  value={videoForm.thumbnailUrl}
                  onChange={(e) => setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-heading font-bold text-on-surface">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  required
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="Rangkuman isi materi video..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>

              <div className="pt-2 border-t border-border-subtle flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-4 py-2 bg-surface-container-low rounded-xl font-heading font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-secondary text-on-primary rounded-xl font-heading font-bold shadow-sm"
                >
                  Simpan Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
