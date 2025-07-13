import { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import API_CONFIG from '../api'

export default function SearchResults({ searchTerm }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const searchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}/search/movie?api_key=${
          API_CONFIG.apiKey
        }&query=${encodeURIComponent(query)}&include_adult=false`
      );
      const data = await response.json();
      const filtered = Array.isArray(data.results)
        ? data.results.filter(
            (movie) =>
              !movie.adult && movie.vote_average > 5 && movie.vote_count > 150
          )
        : [];
      setSearchResults(filtered.slice(0, 50));
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  if (!searchTerm) return null;

  return (
    <section className="movie_list" id="search">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          Search Results for "{searchTerm}"
        </h2>
        <div className="align_center">
          {loading ? (
            <p>Searching...</p>
          ) : (
            <p>{searchResults.length} movies found</p>
          )}
        </div>
      </header>

      <div className="movie_cards">
        {searchResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {!loading && searchResults.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
          <p>No movies found for "{searchTerm}"</p>
          <p>Try searching with different keywords</p>
        </div>
      )}
    </section>
  );
}
