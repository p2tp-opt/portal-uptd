import React, { useEffect, useState } from 'react';
import { Save, CheckCircle, ShieldCheck } from 'lucide-react';
import { ProfileContact } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';

export const AdminSettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileContact | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentRepository.getProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    await contentRepository.updateProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (loading || !profile) {
    return <div className="p-8 text-center text-xs text-text-muted">Memuat pengaturan profil...</div>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-primary">
          Pengaturan Profil & Kontak Resmi
        </h1>
        <p className="text-xs text-text-muted mt-0.5">
          Perbarui data kelembagaan, alamat kantor, telepon hotline, dan status verifikasi instansi.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-badge-activity-bg text-badge-activity-text text-xs flex items-center gap-2 border border-green-300 animate-fadeIn">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span className="font-heading font-bold">
            Pengaturan profil instansi berhasil disimpan dan langsung diterapkan ke website!
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-sm flex flex-col gap-6 text-xs">
        {/* Identitas Instansi */}
        <div className="flex flex-col gap-4 border-b border-border-subtle pb-6">
          <h2 className="text-sm font-heading font-bold text-primary flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>Identitas Resmi Instansi</span>
          </h2>

          <div className="flex flex-col gap-1.5">
            <label className="font-heading font-bold text-on-surface">Nama Resmi Lembaga</label>
            <input
              type="text"
              required
              value={profile.institutionName}
              onChange={(e) => setProfile({ ...profile, institutionName: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-heading font-bold text-on-surface">Motto Pelayanan</label>
            <input
              type="text"
              required
              value={profile.motto}
              onChange={(e) => setProfile({ ...profile, motto: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-heading font-bold text-on-surface">Deskripsi Profil Singkat</label>
            <textarea
              rows={3}
              required
              value={profile.description}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
            />
          </div>
        </div>

        {/* Alamat & Kontak Resmi */}
        <div className="flex flex-col gap-4 border-b border-border-subtle pb-6">
          <h2 className="text-sm font-heading font-bold text-primary">
            Alamat Kantor & Jam Kerja
          </h2>

          <div className="flex flex-col gap-1.5">
            <label className="font-heading font-bold text-on-surface">Alamat Kantor Lengkap</label>
            <input
              type="text"
              required
              value={profile.address || ''}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-heading font-bold text-on-surface">Nomor Telepon / Hotline</label>
              <input
                type="text"
                required
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-heading font-bold text-on-surface">Email Kedinasan Resmi</label>
              <input
                type="email"
                required
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-heading font-bold text-on-surface">Jam Operasional Pelayanan</label>
            <input
              type="text"
              value={profile.officeHours || ''}
              onChange={(e) => setProfile({ ...profile, officeHours: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
            />
          </div>
        </div>

        {/* Status Verifikasi Resmi */}
        <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
          <div className="flex flex-col gap-0.5">
            <span className="font-heading font-bold text-primary">Tandai Data Resmi Telah Terverifikasi</span>
            <span className="text-[11px] text-text-muted">
              Jika dicentang, badge "Placeholder" di website publik akan otomatis dihilangkan.
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profile.verified}
              onChange={(e) => setProfile({ ...profile, verified: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-secondary text-on-primary font-heading font-bold text-xs rounded-xl transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
};
