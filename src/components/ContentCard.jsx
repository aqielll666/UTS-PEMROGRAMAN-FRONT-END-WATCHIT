import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, Info, Star, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const ContentCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFeatureClick = (e) => {
    e.stopPropagation();
    toast({
      title: "Under reconstruction",
      description: "🚧 This section is currently under reconstruction—but don't worry! You can request it in your later! 🚀",
    });
  };

  const handleCardClick = () => {
    // Convert display type 'Series' -> 'tv', 'Movie' -> 'movie' for API URL consistency
    const urlType = item.type === 'Series' ? 'tv' : 'movie';
    navigate(`/watch/${urlType}/${item.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="relative group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.05, zIndex: 10 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900 shadow-lg"
      >
        {item.image ? (
          <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            alt={`${item.title} poster`}
            src={item.image} 
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 p-4 text-center">
            <span className="text-emerald-500 font-bold text-lg">{item.title}</span>
            <span className="text-gray-500 text-xs mt-2">No Poster</span>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <h3 className="font-bold text-white text-sm md:text-base line-clamp-2 leading-tight">{item.title}</h3>
            
            <div className="flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <Star size={12} fill="currentColor" />
                <span>{item.rating}</span>
              </div>
              <span className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] uppercase tracking-wider">
                {item.type}
              </span>
            </div>

            {item.date && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={10} />
                <span>{new Date(item.date).getFullYear()}</span>
              </div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-2 right-2 flex gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFeatureClick} // Keep this just for the toast, play usually goes to detail/player
            className="p-2 bg-emerald-500 rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-black/50"
            aria-label="Play"
          >
            <Play size={14} fill="currentColor" className="text-black" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFeatureClick}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            aria-label="Add to My List"
          >
            <Plus size={14} className="text-white" />
          </motion.button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
             e.stopPropagation();
             handleCardClick();
          }}
          className="absolute top-2 left-2 p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors"
          aria-label="More Info"
        >
          <Info size={14} className="text-white" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ContentCard;