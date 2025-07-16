import { useEffect, useRef, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import API_CONFIG from '../api';

export default function SearchResults({ searchTerm }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    setCurrentPage(1);
    setSearchResults([]);
  }, [searchTerm]);

  useEffect(() => {
    setError(null);

    if (!searchTerm || searchTerm.trim() === "") {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const fetchSearchResults = async () => {
      if (currentPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      setError(null);
      
      try {
        const response = await fetch(
          `${API_CONFIG.baseURL}/search/movie?api_key=${API_CONFIG.apiKey}&query=${encodeURIComponent(
            searchTerm
          )}&include_adult=false&page=${currentPage}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Search failed with status ${response.status}`);
        }

        const data = await response.json();
        const filtered = Array.isArray(data.results)
          ? data.results.filter(
              (movie) =>
                !movie.adult &&
                movie.vote_average > 5 &&
                movie.vote_count > 150
            )
          : [];

        if (currentPage === 1) {
          setSearchResults(filtered);
        } else {
          setSearchResults(prev => [...prev, ...filtered]);
        }
        
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search error:", error);
          setError(error.message);
          setSearchResults([]);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchSearchResults();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [searchTerm, currentPage]);

  const loadMore = () => {
    if (currentPage < totalPages && !loadingMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <section className="movie_list" id="search">
        <header className="align_center movie_list_header">
          <h2 className="align_center movie_list_heading">
            Searching for "{searchTerm}"...
          </h2>
        </header>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading search results...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="movie_list" id="search">
        <header className="align_center movie_list_header">
          <h2 className="align_center movie_list_heading">
            Search Results for "{searchTerm}"
          </h2>
        </header>
        <div style={{ textAlign: "center", padding: "40px", color: "#ef4444" }}>
          <p>Error: {error}</p>
          <p>Please try again later</p>
        </div>
      </section>
    );
  }

  return (
    <section className="movie_list" id="search">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          Search Results for "{searchTerm}"
        </h2>
        <div className="movie_count">
          {searchResults.length} movies found (Page {currentPage} of {totalPages})
        </div>
      </header>

      <div className="movie_cards">
        {searchResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {searchResults.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
          <p>No movies found for "{searchTerm}"</p>
          <p>Try searching with different keywords</p>
        </div>
      )}

      {currentPage < totalPages && searchResults.length > 0 && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <button
            onClick={loadMore}
            disabled={loadingMore}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: loadingMore ? "not-allowed" : "pointer",
              fontSize: "16px",
              opacity: loadingMore ? 0.6 : 1,
            }}
          >
            {loadingMore ? "Loading..." : "Load More Results"}
          </button>
        </div>
      )}
    </section>
  );
}