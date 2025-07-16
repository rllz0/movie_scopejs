import { useEffect, useState, useMemo } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import API_CONFIG from "../api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MovieList({ type, title, minRating, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    setMovies([]);
  }, [type]);

  useEffect(() => {
    async function fetchMovies() {
      if (currentPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      setError(null);
      
      try {
        const response = await fetch(
          `${API_CONFIG.baseURL}/movie/${type}?api_key=${API_CONFIG.apiKey}&page=${currentPage}`
        );
        
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        if (currentPage === 1) {
          setMovies(data.results || []);
        } else {
          setMovies(prev => [...prev, ...(data.results || [])]);
        }
        
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }
    
    fetchMovies();
  }, [type, currentPage]);

  const filterMovies = useMemo(() => {
    let filtered = minRating > 0 
      ? movies.filter((m) => m.vote_average >= minRating)
      : movies;

    if (sort.by !== "default") {
      filtered = [...filtered].sort((a, b) => {
        if (sort.order === "asc") return a[sort.by] > b[sort.by] ? 1 : -1;
        else return a[sort.by] < b[sort.by] ? 1 : -1;
      });
    }
    return filtered;
  }, [movies, minRating, sort]);

  const loadMore = () => {
    if (currentPage < totalPages && !loadingMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <section className="movie_list" id={type}>
        <header className="align_center movie_list_header">
          <h2 className="align_center movie_list_heading">{title}</h2>
          <div className="movie_count">Loading movies...</div>
        </header>

        <div className="movie_cards">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} style={{ margin: "10px", width: "150px" }}>
                <Skeleton height={225} />
                <Skeleton height={20} style={{ marginTop: 6 }} />
                <Skeleton height={15} width={80} style={{ marginTop: 6 }} />
              </div>
            ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;
  }

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">{title}</h2>
        <div className="movie_count">
          {filterMovies.length} movies found (Page {currentPage} of {totalPages})
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {filterMovies.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#a0aec0" }}>
          <p>No movies found.</p>
        </div>
      )}

      {currentPage < totalPages && (
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
            {loadingMore ? "Loading..." : "Load More Movies"}
          </button>
        </div>
      )}
    </section>
  );
}