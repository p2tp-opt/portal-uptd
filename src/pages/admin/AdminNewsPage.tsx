import React, { useEffect, useState, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Search, CalendarDays, Upload } from 'lucide-react';
import { News } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { formatDateWITA } from '../../utils/date';
import { processImageFile } from '../../utils/fileUpload';

export const AdminNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Gerakan Pengendalian',
    excerpt: '',
    content: '',
    author: 'Tim Lapangan P2TP',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
  });

  const loadData = async () => {
    setLoading(true);
    const data = await contentRepository.listNews();
    setNewsList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Gerakan Pengendalian',
      excerpt: '',
      content: '',
      author: 'Tim Lapangan P2TP',
      coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: News) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      excerpt: item.excerpt,
      content: item.content,
      author: item.author,
      coverImage: item.coverImage || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Hapus artikel "${title}"?`)) {
      await contentRepository.deleteNews(id);
      await loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await contentRepository.updateNews(editingId, {
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        coverImage: formData.coverImage,
      });
    } else {
      await contentRepository.createNews({
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        coverImage: formData.coverImage,
        publishedAt: new Date().toISOString(),
      });
    }
    setModalOpen(false);
    await loadData();
  };

  const filtered = newsList.filter(
    (n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-primary">
            Kelola Berita & Artikel
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Publikasikan siaran pers, edukasi hama, dan liputan kegiatan perlindungan perkebunan.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-secondary text-on-primary font-heading text-xs font-bold rounded-xl transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Berita Baru</span>
        </button>
      </div>

      {/* Pencarian */}
      <div className="relative max-w-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari berita berdasarkan judul/kategori..."
          className="w-full pl-9 pr-3 py-2 text-xs bg-surface-container-lowest border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
        />
        <Search className="w-4 h-4 text-outline absolute left-3 top-2.5 pointer-events-none" />
      </div>

      {/* Tabel Data Berita */}
      <div className="bg-surface-container-lowest rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-text-muted">Memuat data artikel...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-text-muted">Tidak ada artikel berita ditemukan.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-text-muted font-heading font-bold border-b border-border-subtle">
                <tr>
                  <th className="p-4">Cover & Judul Artikel</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Tanggal Rilis</th>
                  <th className="p-4">Penulis</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4 max-w-xs sm:max-w-md">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover bg-surface-container-high flex-shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="font-heading font-bold text-primary truncate">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-text-muted line-clamp-1">
                            {item.excerpt}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-badge-opt-bg text-badge-opt-text px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-text-muted whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5 text-secondary" />
                        <span>{formatDateWITA(item.publishedAt)}</span>
                      </div>
                    </td>
                    <td className="p-4 text-text-muted">{item.author}</td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-secondary hover:text-on-secondary transition-colors"
                          title="Edit artikel"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg bg-surface-container-low text-error hover:bg-error hover:text-white transition-colors"
                          title="Hapus artikel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form Tambah/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-border-subtle max-h-[90vh] overflow-y-auto flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h2 className="text-lg font-heading font-extrabold text-primary">
                {editingId ? 'Edit Artikel Berita' : 'Tambah Artikel Berita Baru'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-outline hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Judul Berita</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Gerakan Pengendalian Hama Ulat Api di Perkebunan..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                  >
                    <option value="Gerakan Pengendalian">Gerakan Pengendalian</option>
                    <option value="Inovasi Hayati">Inovasi Hayati</option>
                    <option value="Mitigasi Iklim">Mitigasi Iklim</option>
                    <option value="Bimtek Petani">Bimtek Petani</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Penulis / Seksi</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-heading font-bold text-on-surface">Gambar Sampul Berita</label>
                  <div>
                    <input
                      ref={coverImageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const compressed = await processImageFile(file, 1200, 0.85);
                            setFormData({ ...formData, coverImage: compressed });
                          } catch (err) {
                            alert('Gagal memproses gambar: ' + String(err));
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => coverImageInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-on-secondary rounded-lg font-heading font-bold text-xs hover:bg-primary transition-colors shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-kaltim-gold" />
                      <span>Unggah Foto dari Komputer</span>
                    </button>
                  </div>
                </div>

                {formData.coverImage && (
                  <div className="w-full h-36 rounded-xl overflow-hidden bg-surface-container-high border border-border-subtle relative my-1">
                    <img
                      src={formData.coverImage}
                      alt="Pratinjau Cover Berita"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://... atau klik tombol Unggah Foto di atas"
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Ringkasan Singkat (Excerpt)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu depan..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Konten Lengkap Berita</label>
                <textarea
                  rows={6}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Tuliskan isi berita atau narasi kegiatan lapangan..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold font-mono"
                />
              </div>

              <div className="pt-3 border-t border-border-subtle flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-surface-container-low text-on-surface rounded-xl font-heading font-semibold hover:bg-surface-container"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-secondary text-on-primary rounded-xl font-heading font-bold shadow-sm"
                >
                  Simpan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
