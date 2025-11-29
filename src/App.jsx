import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import MovieDetail from '@/pages/MovieDetail';
import Notifications from '@/pages/Notifications';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import SearchResults from '@/pages/SearchResults';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white font-sans antialiased">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:type/:id" element={<MovieDetail />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
