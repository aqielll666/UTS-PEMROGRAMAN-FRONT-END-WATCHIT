import React from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const HeroBanner = ({ movie }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFeatureClick = () => {
    toast({
      title: "Under Reconstruction",
      description: "🚧 This feature is currently under reconstruction.",
    });
  };

  const handleInfoClick = () => {
    if (movie) {
        const urlType = movie.type === 'Series' ? 'tv' : 'movie';
        navigate(`/watch/${urlType}/${movie.id}`);
    } else {
        // Fallback for static content
        handleFeatureClick();
    }
  };

  // Fallback data if API fails or loading
  const displayMovie = movie || {
    title: "Digital Frontier",
    overview: "In a world where technology and humanity collide, one programmer must navigate the digital landscape to save civilization from a catastrophic AI takeover.",
    backdrop: "https://images.unsplash.com/photo-1590472199944-ec6116b9cef2",
    rating: "9.2",
    date: "2025",
    type: "Sci-Fi"
  };

  return (
    <div className="relative h-[85vh] md:h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        {displayMovie.backdrop ? (
          <img 
            className="w-full h-full object-cover" 
            alt={`${displayMovie.title} backdrop`}
            src={displayMovie.backdrop} 
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
             <span className="text-gray-700">No Image Available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="relative h-full flex items-center px-4 md:px-8 lg:px-12 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            {displayMovie.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed line-clamp-3"
          >
            {displayMovie.overview}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button
              onClick={handleFeatureClick}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-6 text-lg transition-all duration-200 border-0"
            >
              <Play className="mr-2" size={24} fill="currentColor" />
              Play Now
            </Button>
            <Button
              onClick={handleInfoClick}
              size="lg"
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm px-8 py-6 text-lg transition-all duration-200"
            >
              <Info className="mr-2" size={24} />
              More Info
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center gap-4 text-sm text-gray-400 pt-2"
          >
            <span className="px-2 py-1 border border-emerald-500/50 text-emerald-400 rounded font-medium uppercase text-xs tracking-wider">
              {displayMovie.type || 'Trending'}
            </span>
            {displayMovie.date && <span>{new Date(displayMovie.date).getFullYear()}</span>}
            <span>•</span>
            <div className="flex items-center text-emerald-400 font-semibold">
              <Star size={16} className="mr-1 fill-emerald-400" />
              {displayMovie.rating}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;