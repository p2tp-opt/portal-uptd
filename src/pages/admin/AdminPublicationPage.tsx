import React, { useEffect, useState, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Search, FileText, Upload } from 'lucide-react';
import { Publication } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { formatDateWITA } from '../../utils/date';
import { processMediaFile } from '../../utils/fileUpload';

export const AdminPublicationPage: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const docFileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Pedoman Teknis',
    documentUrl: '#',
    fileSize: '3.5 MB',
    fileType: 'PDF',
  });

  const loadData = async () => {
    setLoading(true);
    const data = await contentRepository.listPublications();
    setPublications(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      category: 'Pedoman Teknis',
      documentUrl: '#',
      fileSize: '3.5 MB',
      fileType: 'PDF',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: Publication) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      documentUrl: item.documentUrl || '#',
      fileSize: item.fileSize || '3.5 MB',
      fileType: item.fileType || 'PDF',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Hapus dokumen "${title}"?`)) {
      await contentRepository.deletePublication(id);
      await loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await contentRepository.updatePublication(editingId, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        documentUrl: formData.documentUrl,
        fileSize: formData.fileSize,
        fileType: formData.fileType,
      });
    } else {
      await contentRepository.createPublication({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        documentUrl: formData.documentUrl,
        fileSize: formData.fileSize,
        fileType: formData.fileType,
        publishedAt: new Date().toISOString(),
      });
    }
    setModalOpen(false);
    await loadData();
  };

  const filtered = publications.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-primary">
            Kelola Dokumen Publikasi & SOP
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Unggah dan perbarui buku saku panduan petani, modul bimtek, dan SOP perbanyakan agens hayati.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-secondary text-on-primary font-heading text-xs font-bold rounded-xl transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Dokumen SOP</span>
        </button>
      </div>

      <div className="relative max-w-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari dokumen publikasi..."
          className="w-full pl-9 pr-3 py-2 text-xs bg-surface-container-lowest border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
        />
        <Search className="w-4 h-4 text-outline absolute left-3 top-2.5 pointer-events-none" />
      </div>

      {/* Tabel Publikasi */}
      <div className="bg-surface-container-lowest rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-text-muted">Memuat publikasi...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-text-muted">Belum ada dokumen publikasi.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-text-muted font-heading font-bold border-b border-border-subtle">
                <tr>
                  <th className="p-4">Nama Dokumen</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Format / Ukuran</th>
                  <th className="p-4">Tanggal Unggah</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4 max-w-xs sm:max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-error/10 text-error flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-heading font-bold text-primary truncate">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-text-muted line-clamp-1">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-surface-container-low text-secondary font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-text-muted whitespace-nowrap">
                      {item.fileType || 'PDF'} • {item.fileSize || 'Resmi'}
                    </td>
                    <td className="p-4 text-text-muted whitespace-nowrap">
                      {formatDateWITA(item.publishedAt)}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-secondary hover:text-on-secondary transition-colors"
                          title="Edit dokumen"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg bg-surface-container-low text-error hover:bg-error hover:text-white transition-colors"
                          title="Hapus dokumen"
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
          <div className="bg-surface-container-lowest max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-border-subtle max-h-[90vh] overflow-y-auto flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h2 className="text-lg font-heading font-extrabold text-primary">
                {editingId ? 'Edit Dokumen Publikasi' : 'Tambah Dokumen SOP Baru'}
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
                <label className="font-heading font-bold text-on-surface">Judul Dokumen</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: SOP Perbanyakan Jamur Trichoderma sp..."
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
                    <option value="Buku Saku Teknis">Buku Saku Teknis</option>
                    <option value="Pedoman Teknis">Pedoman Teknis</option>
                    <option value="Regulasi & SOP">Regulasi & SOP</option>
                    <option value="Modul Pelatihan">Modul Pelatihan</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Ukuran Berkas (Estimasi)</label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="Contoh: 4.2 MB"
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-heading font-bold text-on-surface">Berkas Dokumen / SOP (PDF)</label>
                  <div>
                    <input
                      ref={docFileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const res = await processMediaFile(file);
                            setFormData({
                              ...formData,
                              documentUrl: res.dataUrl,
                              fileSize: res.size,
                              title: formData.title || res.name.replace(/\.[^/.]+$/, ''),
                            });
                          } catch (err) {
                            alert('Gagal membaca berkas: ' + String(err));
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => docFileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-on-secondary rounded-lg font-heading font-bold text-xs hover:bg-primary transition-colors shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-kaltim-gold" />
                      <span>Unggah PDF dari Komputer</span>
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={formData.documentUrl}
                  onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })}
                  placeholder="https://... atau klik tombol Unggah PDF di atas"
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Deskripsi Singkat Isi Dokumen</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ringkasan tentang isi dan manfaat pedoman/SOP ini..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
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
                  Simpan Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
