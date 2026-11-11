import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Search, CalendarDays, MapPin, Clock } from 'lucide-react';
import { Agenda, AgendaStatus } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { formatDateWITA } from '../../utils/date';

export const AdminAgendaPage: React.FC = () => {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    location: string;
    status: AgendaStatus;
  }>({
    title: '',
    description: '',
    eventDate: new Date().toISOString().split('T')[0],
    startTime: '08:30',
    endTime: '12:00',
    location: 'Kalimantan Timur',
    status: 'akan-datang',
  });

  const loadData = async () => {
    setLoading(true);
    const data = await contentRepository.listAgenda();
    setAgendas(data);
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
      eventDate: new Date().toISOString().split('T')[0],
      startTime: '08:30',
      endTime: '12:00',
      location: 'Kalimantan Timur',
      status: 'akan-datang',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: Agenda) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description,
      eventDate: item.eventDate,
      startTime: item.startTime || '',
      endTime: item.endTime || '',
      location: item.location || '',
      status: item.status,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Hapus agenda "${title}"?`)) {
      await contentRepository.deleteAgenda(id);
      await loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await contentRepository.updateAgenda(editingId, {
        title: formData.title,
        description: formData.description,
        eventDate: formData.eventDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        status: formData.status,
      });
    } else {
      await contentRepository.createAgenda({
        title: formData.title,
        description: formData.description,
        eventDate: formData.eventDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        status: formData.status,
      });
    }
    setModalOpen(false);
    await loadData();
  };

  const filtered = agendas.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      (a.location && a.location.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-primary">
            Kelola Agenda Lapangan & Bimtek
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Jadwalkan kegiatan koordinasi, penyuluhan, dan bimbingan teknis bersama kelompok tani.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-secondary text-on-primary font-heading text-xs font-bold rounded-xl transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jadwal Agenda</span>
        </button>
      </div>

      <div className="relative max-w-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari agenda berdasarkan judul atau lokasi..."
          className="w-full pl-9 pr-3 py-2 text-xs bg-surface-container-lowest border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
        />
        <Search className="w-4 h-4 text-outline absolute left-3 top-2.5 pointer-events-none" />
      </div>

      {/* Tabel Agenda */}
      <div className="bg-surface-container-lowest rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-text-muted">Memuat agenda...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-text-muted">Belum ada jadwal kegiatan.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-text-muted font-heading font-bold border-b border-border-subtle">
                <tr>
                  <th className="p-4">Tanggal Pelaksanaan</th>
                  <th className="p-4">Nama Kegiatan</th>
                  <th className="p-4">Waktu & Lokasi</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 font-heading font-bold text-primary">
                        <CalendarDays className="w-4 h-4 text-secondary" />
                        <span>{formatDateWITA(item.eventDate)}</span>
                      </div>
                    </td>
                    <td className="p-4 max-w-xs sm:max-w-md">
                      <span className="font-heading font-bold text-on-surface block">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-text-muted line-clamp-1 mt-0.5">
                        {item.description}
                      </span>
                    </td>
                    <td className="p-4 text-text-muted">
                      <div className="flex flex-col gap-0.5 whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-secondary" />
                          <span>{item.startTime} {item.endTime ? `- ${item.endTime}` : ''} WITA</span>
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <MapPin className="w-3 h-3 text-outline" />
                          <span>{item.location || 'Kaltim'}</span>
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          item.status === 'akan-datang'
                            ? 'bg-badge-activity-bg text-badge-activity-text'
                            : 'bg-surface-container-low text-text-muted'
                        }`}
                      >
                        {item.status === 'akan-datang' ? 'Akan Datang' : 'Selesai'}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-secondary hover:text-on-secondary transition-colors"
                          title="Edit agenda"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg bg-surface-container-low text-error hover:bg-error hover:text-white transition-colors"
                          title="Hapus agenda"
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
                {editingId ? 'Edit Jadwal Agenda' : 'Tambah Agenda Kegiatan Baru'}
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
                <label className="font-heading font-bold text-on-surface">Nama Kegiatan</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Bimbingan Teknis Pengendalian Hama Kakao..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Tanggal Kegiatan</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Status Pelaksanaan</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as AgendaStatus })}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                  >
                    <option value="akan-datang">Akan Datang</option>
                    <option value="berlangsung">Berlangsung</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Jam Mulai (WITA)</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-bold text-on-surface">Jam Selesai (WITA)</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Lokasi Acara</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Contoh: Balai Pertemuan Kelompok Tani, Paser"
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-bold text-on-surface">Deskripsi Kegiatan</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Penjelasan ringkas materi atau tujuan agenda..."
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
                  Simpan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
