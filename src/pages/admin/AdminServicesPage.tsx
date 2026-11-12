// src/pages/admin/AdminServicesPage.tsx
import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle,
  X,
  AlertCircle,
  Cloud,
} from 'lucide-react';
import { ServiceItem } from '../../types/content';
import { useSiteContext } from '../../context/useSiteContext';
import { AVAILABLE_ICONS, renderServiceIcon } from '../../utils/serviceIcons';

export const AdminServicesPage: React.FC = () => {
  const { services, updateServices } = useSiteContext();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // State Modal Form (Tambah / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formTag, setFormTag] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formIcon, setFormIcon] = useState('radio');
  const [formPointsTitle, setFormPointsTitle] = useState('Cakupan Kegiatan:');
  const [formPoints, setFormPoints] = useState<string[]>(['']);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTitle('');
    setFormTag('');
    setFormDescription('');
    setFormIcon('radio');
    setFormPointsTitle('Cakupan Kegiatan:');
    setFormPoints(['']);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ServiceItem) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormTag(item.tag);
    setFormDescription(item.description);
    setFormIcon(item.icon);
    setFormPointsTitle(item.pointsTitle || 'Cakupan Kegiatan:');
    setFormPoints(item.points && item.points.length > 0 ? [...item.points] : ['']);
    setIsModalOpen(true);
  };

  const handleAddPoint = () => {
    setFormPoints([...formPoints, '']);
  };

  const handleUpdatePoint = (index: number, val: string) => {
    const updated = [...formPoints];
    updated[index] = val;
    setFormPoints(updated);
  };

  const handleRemovePoint = (index: number) => {
    if (formPoints.length <= 1) {
      setFormPoints(['']);
      return;
    }
    setFormPoints(formPoints.filter((_, i) => i !== index));
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Judul layanan wajib diisi.');
      return;
    }

    setSaving(true);
    try {
      const cleanPoints = formPoints.map((p) => p.trim()).filter(Boolean);
      let newServices: ServiceItem[];

      if (editingId) {
        // Mode Edit
        newServices = services.map((s) =>
          s.id === editingId
            ? {
                ...s,
                title: formTitle.trim(),
                tag: formTag.trim() || 'Layanan Teknis',
                description: formDescription.trim(),
                icon: formIcon,
                pointsTitle: formPointsTitle.trim() || 'Cakupan Kegiatan:',
                points: cleanPoints,
              }
            : s
        );
      } else {
        // Mode Tambah Baru
        const newItem: ServiceItem = {
          id: `srv-${Date.now()}`,
          title: formTitle.trim(),
          tag: formTag.trim() || 'Layanan Teknis',
          description: formDescription.trim(),
          icon: formIcon,
          pointsTitle: formPointsTitle.trim() || 'Cakupan Kegiatan:',
          points: cleanPoints,
        };
        newServices = [...services, newItem];
      }

      await updateServices(newServices);
      setIsModalOpen(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      alert('Gagal menyimpan layanan ke Supabase Cloud: ' + String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      !window.confirm(
        `Apakah Anda yakin ingin menghapus layanan "${title}"?\nLayanan ini akan langsung terhapus dari halaman publik dan beranda.`
      )
    ) {
      return;
    }

    setSaving(true);
    try {
      const updated = services.filter((s) => s.id !== id);
      await updateServices(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      alert('Gagal menghapus layanan: ' + String(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-16">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-badge-activity-bg text-secondary px-2.5 py-1 rounded-md text-[11px] font-heading font-bold mb-1">
            <Cloud className="w-3.5 h-3.5 text-secondary" />
            <span>Supabase Cloud Sync • Multi-Perangkat</span>
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-primary">
            Kelola Layanan Perlindungan Tanaman
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Tambah, sesuaikan, atau hapus pilar layanan publik UPTD P2TP agar sesuai dengan kondisi operasional saat ini.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-kaltim-gold hover:bg-tertiary-fixed-dim text-on-tertiary-fixed px-4 py-2.5 rounded-xl font-heading font-bold text-xs shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan Baru</span>
        </button>
      </div>

      {/* Toast Notifikasi Berhasil */}
      {saveSuccess && (
        <div className="bg-primary text-on-primary p-4 rounded-xl shadow-md border border-secondary flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-4 h-4 text-kaltim-gold flex-shrink-0" />
            <span>Perubahan layanan berhasil disimpan dan disinkronkan ke seluruh sistem!</span>
          </div>
          <button
            type="button"
            onClick={() => setSaveSuccess(false)}
            className="text-surface-container-high hover:text-on-primary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Daftar Layanan Aktif */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-heading font-bold text-primary">
            Daftar Layanan Saat Ini ({services.length})
          </h2>
          <span className="text-xs text-text-muted">
            Perubahan langsung terlihat di halaman <code className="bg-surface-container-high px-1 py-0.5 rounded text-[11px]">/layanan</code> dan beranda.
          </span>
        </div>

        {services.length === 0 ? (
          <div className="bg-surface-container-lowest p-12 text-center rounded-2xl border border-dashed border-border-subtle flex flex-col items-center gap-3">
            <AlertCircle className="w-8 h-8 text-outline" />
            <p className="text-xs text-text-muted font-medium">
              Belum ada layanan yang ditambahkan. Klik tombol &quot;Tambah Layanan Baru&quot; di atas untuk membuat layanan pertama.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((item, idx) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-border-subtle flex flex-col justify-between transition-all hover:shadow-md"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-badge-activity-bg text-secondary flex items-center justify-center flex-shrink-0">
                        {renderServiceIcon(item.icon, 'w-6 h-6')}
                      </div>
                      <div>
                        <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-secondary bg-surface-container-low px-2 py-0.5 rounded-full">
                          {item.tag || 'Layanan Publik'}
                        </span>
                        <h3 className="font-heading font-bold text-base text-primary mt-1 leading-snug">
                          {idx + 1}. {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                    {item.description || 'Tidak ada deskripsi.'}
                  </p>

                  {item.points && item.points.length > 0 && (
                    <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col gap-1.5 text-xs mt-2">
                      <span className="font-heading font-bold text-primary text-[11px]">
                        {item.pointsTitle || 'Cakupan Kegiatan:'}
                      </span>
                      <ul className="flex flex-col gap-1 text-text-muted">
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Aksi Edit & Hapus */}
                <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-bold text-secondary hover:bg-surface-container-low transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Layanan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-bold text-error hover:bg-error-container/20 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Popup Tambah/Edit Layanan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-full border border-border-subtle overflow-hidden my-8">
            <div className="p-5 bg-primary text-on-primary flex items-center justify-between border-b border-primary-container">
              <div>
                <h2 className="text-base font-heading font-bold text-tertiary-fixed">
                  {editingId ? 'Edit Data Layanan' : 'Tambah Layanan Baru'}
                </h2>
                <p className="text-xs text-surface-container-high mt-0.5">
                  Sesuaikan nama, ikon, deskripsi, dan rincian alur kegiatan layanan
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-surface-container-high hover:text-on-primary p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Judul Layanan */}
              <div>
                <label className="block font-heading font-bold text-primary mb-1">
                  Nama / Judul Layanan <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Pengamatan & Pengendalian OPT Perkebunan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs"
                />
              </div>

              {/* Tag / Kategori Singkat */}
              <div>
                <label className="block font-heading font-bold text-primary mb-1">
                  Tag Kategori Ringkas
                </label>
                <input
                  type="text"
                  value={formTag}
                  onChange={(e) => setFormTag(e.target.value)}
                  placeholder="Contoh: Surveilans Lapang / Produksi Mikroba / Konsultasi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs"
                />
              </div>

              {/* Pilihan Ikon */}
              <div>
                <label className="block font-heading font-bold text-primary mb-1">
                  Pilih Ikon Representasi Layanan
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {AVAILABLE_ICONS.map((ic) => {
                    const IconComp = ic.icon;
                    const isSelected = formIcon === ic.id;
                    return (
                      <button
                        type="button"
                        key={ic.id}
                        onClick={() => setFormIcon(ic.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-secondary bg-secondary/10 text-secondary font-bold shadow-xs'
                            : 'border-border-subtle bg-surface-container-low text-text-muted hover:border-outline/40'
                        }`}
                      >
                        <IconComp className="w-4 h-4 flex-shrink-0" />
                        <span className="text-[11px] truncate">{ic.label.split('/')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Deskripsi Layanan */}
              <div>
                <label className="block font-heading font-bold text-primary mb-1">
                  Deskripsi Lengkap Layanan
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Jelaskan peran teknis, tujuan, dan sasaran layanan bagi pekebun..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs leading-relaxed"
                />
              </div>

              {/* Rincian Poin-Poin Cakupan Kegiatan */}
              <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-3 border border-border-subtle">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex-1">
                    <label className="block font-heading font-bold text-primary mb-1">
                      Judul Bagian Poin
                    </label>
                    <input
                      type="text"
                      value={formPointsTitle}
                      onChange={(e) => setFormPointsTitle(e.target.value)}
                      placeholder="Contoh: Cakupan Kegiatan / Jenis Agens Hayati / Alur Konsultasi"
                      className="w-full px-3 py-1.5 rounded-lg border border-outline/30 bg-surface-container-lowest text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddPoint}
                    className="inline-flex items-center gap-1.5 self-start sm:self-end px-3 py-1.5 bg-secondary text-on-secondary rounded-lg font-heading font-bold text-xs hover:bg-secondary/90 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Poin</span>
                  </button>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  {formPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2">
                      <span className="w-5 text-center font-bold text-text-muted text-[11px]">
                        {pIdx + 1}.
                      </span>
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => handleUpdatePoint(pIdx, e.target.value)}
                        placeholder={`Keterangan poin kegiatan ke-${pIdx + 1}...`}
                        className="flex-1 px-3 py-2 rounded-lg border border-outline/30 bg-surface-container-lowest text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePoint(pIdx)}
                        title="Hapus poin ini"
                        className="p-2 text-text-muted hover:text-error transition-colors rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Tombol Simpan */}
              <div className="pt-3 border-t border-border-subtle flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-outline/30 text-on-surface hover:bg-surface-container-low font-heading font-bold text-xs transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-kaltim-gold hover:bg-tertiary-fixed-dim text-on-tertiary-fixed font-heading font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Menyimpan...' : 'Simpan Layanan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
