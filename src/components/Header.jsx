import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, Menu, X, Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleFeatureClick = (feature) => {
    toast({
      title: "Feature Coming Soon",
      description: `The ${feature} page is currently under construction.`,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const navItems = ['Home', 'Series', 'Movies', 'New & Popular', 'My List'];

  const handleNavClick = (item) => {
      if (item === 'Home') {
          navigate('/');
      } else {
          handleFeatureClick(item);
      }
      setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-white/10' : 'bg-gradient-to-b from-black/90 to-transparent'
      }`}
    >
      <nav className="px-4 md:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/">
                <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl md:text-3xl font-bold tracking-wider cursor-pointer"
                >
                <span className="text-emerald-500">WATCH</span>
                <span className="text-white">IT</span>
                </motion.div>
            </Link>

            <ul className="hidden lg:flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleNavClick(item)}
                    className="text-white/80 hover:text-emerald-400 transition-colors duration-200 font-medium text-sm"
                  >
                    {item}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Bar */}
            <div className="flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearchSubmit}
                    className="overflow-hidden mr-2"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Titles, people, genres"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/50 border border-white/30 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-emerald-500"
                      onBlur={() => {
                        if(!searchQuery) setIsSearchOpen(false)
                      }}
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:text-emerald-400 transition-colors"
              >
                <Search size={20} />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/notifications')}
              className="p-2 hover:text-emerald-400 transition-colors hidden md:block"
            >
              <Bell size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/settings')}
              className="p-2 hover:text-emerald-400 transition-colors hidden md:block"
            >
              <Settings size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/profile')}
              className="p-2 hover:text-emerald-400 transition-colors hidden md:block"
            >
              <User size={20} />
            </motion.button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden hover:text-emerald-400 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 bg-black/90 rounded-lg p-4"
          >
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className="block w-full text-left text-white/80 hover:text-emerald-400 transition-colors duration-200 py-2 border-b border-white/5"
                  >
                    {item}
                  </button>
                </li>
              ))}
              <li className="pt-4 flex justify-around">
                <button onClick={() => navigate('/notifications')} className="p-2 hover:text-emerald-400 transition-colors flex flex-col items-center gap-1">
                  <Bell size={20} />
                  <span className="text-[10px]">Alerts</span>
                </button>
                <button onClick={() => navigate('/settings')} className="p-2 hover:text-emerald-400 transition-colors flex flex-col items-center gap-1">
                  <Settings size={20} />
                   <span className="text-[10px]">Settings</span>
                </button>
                <button onClick={() => navigate('/profile')} className="p-2 hover:text-emerald-400 transition-colors flex flex-col items-center gap-1">
                  <User size={20} />
                   <span className="text-[10px]">Profile</span>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;