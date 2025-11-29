import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Loader2, SearchX } from 'lucide-react';
import ContentCard from '@/components/ContentCard';
import { searchContent } from '@/lib/tmdb';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      const data = await searchContent(query);
      setResults(data);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Search Results for "{query}" - Watch It</title>
      </Helmet>
      <div className="min-h-screen bg-black pt-24 px-4 md:px-8 lg:px-12 pb-16">
        <h1 className="text-3xl font-bold text-white mb-8">
          Results for <span className="text-emerald-500">"{query}"</span>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-emerald-500 w-12 h-12" />
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {results.map((item, index) => (
              <ContentCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <SearchX className="w-16 h-16 mb-4 opacity-50" />
            <h2 className="text-xl font-semibold">No results found</h2>
            <p className="mt-2">Try searching for a different movie or TV show.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;