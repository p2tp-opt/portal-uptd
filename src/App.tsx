import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { Layout } from './components/layout/Layout';
import { AdminGuard } from './components/admin/AdminGuard';
import { AdminLayout } from './components/admin/AdminLayout';

// Halaman Publik
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { ServicesPage } from './pages/ServicesPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { AgendaPage } from './pages/AgendaPage';
import { PublicationPage } from './pages/PublicationPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Halaman Admin / CMS Operator
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminNewsPage } from './pages/admin/AdminNewsPage';
import { AdminAgendaPage } from './pages/admin/AdminAgendaPage';
import { AdminPublicationPage } from './pages/admin/AdminPublicationPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminSiteCustomizerPage } from './pages/admin/AdminSiteCustomizerPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Rute Publik Website */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profil" element={<ProfilePage />} />
          <Route path="layanan" element={<ServicesPage />} />
          <Route path="berita" element={<NewsPage />} />
          <Route path="berita/:slug" element={<NewsDetailPage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="publikasi" element={<PublicationPage />} />
          <Route path="galeri" element={<GalleryPage />} />
          <Route path="kontak" element={<ContactPage />} />
        </Route>

        {/* Halaman Login Operator */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Rute Admin Panel / CMS (Diproteksi) */}
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="tampilan" element={<AdminSiteCustomizerPage />} />
          <Route path="berita" element={<AdminNewsPage />} />
          <Route path="agenda" element={<AdminAgendaPage />} />
          <Route path="publikasi" element={<AdminPublicationPage />} />
          <Route path="galeri" element={<AdminGalleryPage />} />
          <Route path="pengaturan" element={<AdminSettingsPage />} />
        </Route>

        {/* Fallback 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
