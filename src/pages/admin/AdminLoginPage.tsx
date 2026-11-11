import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Home } from 'lucide-react';
import { useAuth } from '../../context/useAuth';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('operator@p2tp.kaltimprov.go.id');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Login gagal.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-surface p-4">
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-3xl shadow-xl border border-border-subtle flex flex-col gap-6">
        {/* Header Logo */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-primary text-kaltim-gold flex items-center justify-center font-heading font-extrabold text-xl shadow-md border border-secondary mb-1">
            P2TP
          </div>
          <span className="text-xs uppercase font-heading font-bold text-secondary tracking-wider">
            Portal Administrasi Resmi
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-primary">
            Login Operator CMS
          </h1>
          <p className="text-xs text-text-muted">
            Masuk untuk mengelola publikasi berita, agenda, SOP, dan profil website UPTD P2TP.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-badge-opt-bg text-badge-opt-text text-xs flex items-start gap-2.5 border border-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-heading font-bold text-on-surface" htmlFor="admin-email">
              Email Operator
            </label>
            <div className="relative">
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 text-xs bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                placeholder="nama@p2tp.kaltimprov.go.id"
              />
              <Mail className="w-4 h-4 text-outline absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-heading font-bold text-on-surface" htmlFor="admin-password">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 text-xs bg-surface-container-low rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
                placeholder="••••••••"
              />
              <Lock className="w-4 h-4 text-outline absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="bg-gold-light p-3 rounded-xl border border-kaltim-gold/40 text-[11px] text-tertiary">
            <div className="font-bold flex items-center gap-1 mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-kaltim-gold" />
              <span>Akun Uji Coba Operator:</span>
            </div>
            Email: <code className="font-bold">operator@p2tp.kaltimprov.go.id</code><br />
            Password: <code className="font-bold">admin123</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-secondary text-on-primary font-heading text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2 focus:outline-none focus:ring-2 focus:ring-kaltim-gold disabled:opacity-50"
          >
            {loading ? (
              <span>Memproses...</span>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-border-subtle text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary font-heading font-semibold"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Kembali ke Halaman Depan Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
