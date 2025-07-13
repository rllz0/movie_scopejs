const API_CONFIG = {
  baseURL: 'https://api.themoviedb.org/3',
  apiKey: process.env.REACT_APP_TMDB_API_KEY || '523415a7cc2416514320936cc2e31e46',
  imageBaseURL: 'https://image.tmdb.org/t/p/w500'
};

export default API_CONFIG;