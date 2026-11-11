import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
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

export const App: React.FC = () => {
  return (
    <Routes>
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
