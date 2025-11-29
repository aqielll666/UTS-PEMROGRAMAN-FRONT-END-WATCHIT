const API_KEY = '4806512042021bb2829c88a0b3123b4a';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const TMDB_CONFIG = {
  apiKey: API_KEY,
  baseUrl: BASE_URL,
  imageBaseUrl: IMAGE_BASE_URL,
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const normalizeContent = (item, typeOverride = null) => {
  const isMovie = item.title || item.original_title;
  // Determine type accurately: override if provided, otherwise infer
  const type = typeOverride || (isMovie ? 'Movie' : 'Series');
  
  return {
    id: item.id,
    title: item.title || item.name || item.original_name,
    overview: item.overview,
    rating: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
    image: getImageUrl(item.poster_path, 'w500'),
    backdrop: getImageUrl(item.backdrop_path, 'original'),
    date: item.release_date || item.first_air_date,
    type: type,
    popularity: item.popularity
  };
};

export const normalizeDetails = (item, type) => {
  const content = normalizeContent(item, type === 'tv' ? 'Series' : 'Movie');
  
  return {
    ...content,
    genres: item.genres || [],
    runtime: item.runtime || (item.episode_run_time ? item.episode_run_time[0] : null),
    tagline: item.tagline,
    status: item.status,
    cast: item.credits?.cast?.slice(0, 10).map(actor => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      image: getImageUrl(actor.profile_path, 'w185')
    })) || [],
    similar: item.similar?.results?.map(r => normalizeContent(r, type === 'tv' ? 'Series' : 'Movie')) || []
  };
};

export const fetchTrending = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results.map(item => normalizeContent(item, 'Movie'));
};

export const fetchPopularSeries = async () => {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results.map(item => normalizeContent(item, 'Series'));
};

export const fetchUpcoming = async () => {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results.map(item => normalizeContent(item, 'Movie'));
};

export const fetchActionMovies = async () => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
  const data = await res.json();
  return data.results.map(item => normalizeContent(item, 'Movie'));
};

export const fetchContentDetails = async (type, id) => {
  // type should be 'movie' or 'tv'
  try {
    const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits,similar`);
    if (!res.ok) throw new Error('Failed to fetch details');
    const data = await res.json();
    return normalizeDetails(data, type);
  } catch (error) {
    console.error("Error fetching details:", error);
    return null;
  }
};

export const searchContent = async (query) => {
  if (!query) return [];
  try {
    const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
    const data = await res.json();
    return data.results
      .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
      .map(item => normalizeContent(item, item.media_type === 'movie' ? 'Movie' : 'Series'));
  } catch (error) {
    console.error("Error searching content:", error);
    return [];
  }
};