import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import HeroBanner from '@/components/HeroBanner';
import ContentSection from '@/components/ContentSection';
import { useToast } from '@/components/ui/use-toast';
import { fetchTrending, fetchPopularSeries, fetchUpcoming, fetchActionMovies } from '@/lib/tmdb';
import { Loader2, AlertCircle } from 'lucide-react';

const Home = () => {
  const [content, setContent] = useState({
    trending: [],
    series: [],
    upcoming: [],
    action: []
  });
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [trendingData, seriesData, upcomingData, actionData] = await Promise.all([
          fetchTrending(),
          fetchPopularSeries(),
          fetchUpcoming(),
          fetchActionMovies()
        ]);

        setContent({
          trending: trendingData,
          series: seriesData,
          upcoming: upcomingData,
          action: actionData
        });

        // Set the first trending movie as the hero, ensuring it has a backdrop
        const validHero = trendingData.find(m => m.backdrop) || trendingData[0];
        setHeroMovie(validHero);

      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load content. Please check your connection.");
        toast({
          variant: "destructive",
          title: "Error Loading Content",
          description: "We couldn't fetch the latest movies. Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500">
        <div className="text-center space-y-4">
          <Loader2 size={48} className="animate-spin mx-auto" />
          <p className="text-white animate-pulse">Loading Watch It...</p>
        </div>
      </div>
    );
  }

  if (error && !content.trending.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center space-y-4 max-w-md px-4">
          <AlertCircle size={48} className="mx-auto text-red-500" />
          <h2 className="text-2xl font-bold">Connection Error</h2>
          <p className="text-gray-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2 px-6 rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Watch It - Watch Movies & Series Online</title>
        <meta name="description" content="Discover thousands of movies and series. Watch trending content, new releases, and exclusive originals on Watch It." />
      </Helmet>
      <main>
        <HeroBanner movie={heroMovie} />
        <div className="px-4 md:px-8 lg:px-12 pb-16 space-y-12 -mt-20 relative z-10">
          <ContentSection title="Trending Now" content={content.trending} />
          <ContentSection title="New Releases" content={content.upcoming} />
          <ContentSection title="Popular Series" content={content.series} />
          <ContentSection title="Action Movies" content={content.action} />
        </div>
      </main>
    </>
  );
};

export default Home;