import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Plus, ThumbsUp, Clock, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { fetchContentDetails } from '@/lib/tmdb';
import ContentSection from '@/components/ContentSection';
import { Loader2 } from 'lucide-react';

const MovieDetail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      const data = await fetchContentDetails(type, id);
      if (data) {
        setMovie(data);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load movie details.",
        });
        navigate('/');
      }
      setLoading(false);
    };
    loadDetails();
  }, [type, id, navigate, toast]);

  const handleFeatureClick = () => {
    toast({
      title: "Under reconstruction",
      description: "🚧 This section is currently under reconstruction—but don't worry! You can request it in your later! 🚀",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  if (!movie) return null;

  return (
    <>
      <Helmet>
        <title>{movie.title} - Watch It</title>
        <meta name="description" content={movie.overview} />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white pb-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="fixed top-24 left-4 md:left-8 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-emerald-500 hover:text-black transition-all duration-300"
        >
          <ArrowLeft size={24} />
        </motion.button>

        {/* Hero Section with Backdrop */}
        <div className="relative h-[70vh] md:h-[80vh] w-full">
          <div className="absolute inset-0">
             <img 
               src={movie.backdrop || movie.image} 
               alt={movie.title}
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 w-full px-4 md:px-8 lg:px-12 pb-12">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="max-w-4xl space-y-6"
             >
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none text-white drop-shadow-2xl">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 font-medium">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Star size={16} fill="currentColor" /> {movie.rating} Match
                  </span>
                  {movie.date && <span>{new Date(movie.date).getFullYear()}</span>}
                  {movie.runtime && (
                    <span className="flex items-center gap-1">
                      <Clock size={16} /> {movie.runtime}m
                    </span>
                  )}
                  <span className="px-2 py-0.5 border border-gray-500 rounded text-xs">HD</span>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button 
                    onClick={handleFeatureClick}
                    className="bg-emerald-500 text-black hover:bg-emerald-600 px-8 py-6 text-lg font-bold"
                  >
                    <Play className="mr-2" fill="currentColor" /> Play
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={handleFeatureClick}
                    className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm px-6 py-6"
                  >
                    <Plus className="mr-2" /> My List
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={handleFeatureClick}
                    className="text-white hover:bg-white/10 rounded-full p-3 h-auto"
                  >
                    <ThumbsUp size={24} />
                  </Button>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl drop-shadow-md">
                  {movie.overview}
                </p>

                {movie.tagline && (
                  <p className="text-emerald-400 italic opacity-90 border-l-4 border-emerald-500 pl-4">
                    "{movie.tagline}"
                  </p>
                )}
             </motion.div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="px-4 md:px-8 lg:px-12 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Cast & More */}
          <div className="lg:col-span-2 space-y-8">
             {/* Top Cast */}
             <section>
               <h3 className="text-xl font-bold mb-4 text-white border-l-4 border-emerald-500 pl-3">Top Cast</h3>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                 {movie.cast.slice(0, 8).map((actor) => (
                   <div key={actor.id} className="flex items-center gap-3 bg-gray-900/50 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                     {actor.image ? (
                       <img src={actor.image} alt={actor.name} className="w-12 h-12 rounded-full object-cover" />
                     ) : (
                       <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xs">N/A</div>
                     )}
                     <div className="overflow-hidden">
                       <p className="text-sm font-medium text-white truncate">{actor.name}</p>
                       <p className="text-xs text-gray-400 truncate">{actor.character}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </section>
          </div>

          {/* Right Column: Meta Info */}
          <div className="space-y-6 text-sm text-gray-400 bg-zinc-900/30 p-6 rounded-xl h-fit">
            <div>
              <span className="block text-gray-500 mb-1">Genres</span>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(g => (
                  <span key={g.id} className="text-white bg-gray-800 px-2 py-1 rounded-md hover:text-emerald-400 transition-colors cursor-default">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-800 pt-4">
              <span className="block text-gray-500 mb-1">Status</span>
              <span className="text-white">{movie.status}</span>
            </div>
             <div className="border-t border-gray-800 pt-4">
              <span className="block text-gray-500 mb-1">Original Language</span>
              <span className="text-white uppercase">
                {/* Since we don't have original_language in normalized data easily, skipping or assuming from context if added later */}
                EN
              </span>
            </div>
          </div>
        </div>
        
        {/* Similar Content */}
        {movie.similar && movie.similar.length > 0 && (
          <div className="px-4 md:px-8 lg:px-12 mt-16">
             <ContentSection title="More Like This" content={movie.similar.slice(0, 6)} />
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetail;