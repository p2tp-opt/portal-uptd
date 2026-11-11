import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Save, CheckCircle, ShieldCheck, Upload, Trash2, Phone, MapPin, Mail, Clock, Image, Sliders } from 'lucide-react';
import { ProfileContact } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';

export const AdminSettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileContact | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    contentRepository.getProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && profile) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran berkas logo maksimal 2 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setProfile({ ...profile, logoUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    if (profile) {
      setProfile({ ...profile, logoUrl: '' });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

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
          Pengaturan Profil, Logo & Kontak Resmi
        </h1>
        <p className="text-xs text-text-muted mt-0.5">
          Atur logo resmi UPTD / Pemprov Kaltim, nomor telepon hotline, alamat kantor, dan jam pelayanan.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-gold-light border border-kaltim-gold/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sliders className="w-5 h-5 text-secondary flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xs text-primary">
              Ingin mengubah teks halaman, hero slider banner, sambutan, atau sidebar?
            </span>
            <span className="text-[11px] text-text-muted">
              Gunakan menu Pengaturan Tampilan & Konten Website untuk kendali menyeluruh di Supabase Cloud.
            </span>
          </div>
        </div>
        <Link
          to="/admin/tampilan"
          className="px-4 py-2 bg-secondary text-on-secondary rounded-xl font-heading font-bold text-xs hover:bg-primary transition-colors flex-shrink-0 self-start sm:self-auto"
        >
          Buka Customizer Web
        </Link>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-badge-activity-bg text-badge-activity-text text-xs flex items-center gap-2 border border-green-300 animate-fadeIn">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span className="font-heading font-bold">
            Pengaturan logo, telepon, dan profil instansi berhasil disimpan dan langsung aktif di website!
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-sm flex flex-col gap-8 text-xs">
        {/* BAGIAN 1: PENGATURAN LOGO RESMI UPTD */}
        <div className="flex flex-col gap-4 border-b border-border-subtle pb-6">
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-secondary" />
            <h2 className="text-sm font-heading font-bold text-primary">
              Logo Resmi UPTD & Pemprov Kalimantan Timur
            </h2>
          </div>
          <p className="text-[11px] text-text-muted">
            Logo ini akan tampil di bilah atas (Header Brand Bar) dan di bagian bawah (Footer) seluruh halaman website. Disarankan menggunakan format PNG transparan atau SVG.
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 rounded-2xl bg-surface-container-low border border-border-subtle">
            {/* Kotak Pratinjau Logo */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <span className="text-[11px] font-heading font-bold text-text-muted">Pratinjau Logo:</span>
              <div className="w-28 h-28 rounded-2xl bg-white border-2 border-dashed border-border-subtle flex items-center justify-center p-2 shadow-xs overflow-hidden">
                {profile.logoUrl ? (
                  <img
                    src={profile.logoUrl}
                    alt="Pratinjau Logo UPTD"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center text-text-muted text-center gap-1">
                    <span className="w-10 h-10 rounded-xl bg-primary text-kaltim-gold font-heading font-extrabold text-xs flex items-center justify-center">
                      P2TP
                    </span>
                    <span className="text-[9px]">Logo Bawaan</span>
                  </div>
                )}
              </div>
            </div>

            {/* Opsi Upload & URL */}
            <div className="flex flex-col gap-3 flex-1 w-full">
              <div>
                <label className="font-heading font-bold text-on-surface block mb-1">
                  Opsi 1: Unggah Berkas Logo dari Komputer
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload-input"
                  />
                  <label
                    htmlFor="logo-upload-input"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary text-on-primary rounded-xl font-heading font-semibold text-xs transition-colors shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Pilih Berkas Logo...</span>
                  </label>

                  {profile.logoUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container-lowest text-error hover:bg-error hover:text-white rounded-xl font-heading font-semibold text-xs transition-colors border border-border-subtle"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus Logo Kustom</span>
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-text-muted mt-1 block">
                  Mendukung berkas PNG, JPG, WebP, SVG (Maks. 2 MB).
                </span>
              </div>

              <div className="pt-2 border-t border-border-subtle">
                <label className="font-heading font-bold text-on-surface block mb-1">
                  Opsi 2: Atau Masukkan URL Gambar Logo
                </label>
                <input
                  type="text"
                  value={profile.logoUrl || ''}
                  onChange={(e) => setProfile({ ...profile, logoUrl: e.target.value })}
                  placeholder="https://... atau /logos/logo-kaltim.png"
                  className="w-full px-3 py-2 bg-surface-container-lowest rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 2: IDENTITAS RESMI INSTANSI */}
        <div className="flex flex-col gap-4 border-b border-border-subtle pb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <h2 className="text-sm font-heading font-bold text-primary">
              Identitas Lembaga & Motto
            </h2>
          </div>

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
            <label className="font-heading font-bold text-on-surface">Deskripsi Singkat Instansi</label>
            <textarea
              rows={3}
              required
              value={profile.description}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
            />
          </div>
        </div>

        {/* BAGIAN 3: NOMOR TELEPON, ALAMAT & JAM LAYANAN */}
        <div className="flex flex-col gap-4 border-b border-border-subtle pb-6">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-secondary" />
            <h2 className="text-sm font-heading font-bold text-primary">
              Alamat Kantor & Kontak Pelayanan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-heading font-bold text-on-surface flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-secondary" />
                <span>Nomor Telepon / Hotline Resmi</span>
              </label>
              <input
                type="text"
                required
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="(0541) 273580 / (0541) 743488"
                className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold font-semibold text-primary"
              />
              <span className="text-[10px] text-text-muted">
                Nomor ini otomatis tampil di bilah atas (Header), bilah samping, dan footer website.
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-heading font-bold text-on-surface flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-secondary" />
                <span>Email Kedinasan Resmi</span>
              </label>
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
            <label className="font-heading font-bold text-on-surface flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>Alamat Kantor Lengkap</span>
            </label>
            <input
              type="text"
              required
              value={profile.address || ''}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-heading font-bold text-on-surface flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>Jam Operasional Pelayanan</span>
            </label>
            <input
              type="text"
              value={profile.officeHours || ''}
              onChange={(e) => setProfile({ ...profile, officeHours: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
            />
          </div>
        </div>

        {/* BAGIAN 4: STATUS VERIFIKASI RESMI */}
        <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-border-subtle">
          <div className="flex flex-col gap-0.5">
            <span className="font-heading font-bold text-primary">
              Tandai Data Resmi Telah Terverifikasi
            </span>
            <span className="text-[11px] text-text-muted">
              Centang opsi ini jika alamat, nomor telepon (0541) 273580, dan logo telah diverifikasi resmi oleh dinas untuk menghilangkan label "Placeholder" di website.
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-secondary text-on-primary font-heading font-bold text-xs rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Logo & Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
};
