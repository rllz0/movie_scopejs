import { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import API_CONFIG from "../api";

export default function MovieList({ type, title, minRating, sort }) {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, [type]);

  useEffect(() => {
    const filtered =
      minRating > 0
        ? movies.filter((movie) => movie.vote_average >= minRating)
        : movies;

    const sorted =
      sort.by !== "default"
        ? [...filtered].sort((a, b) => {
            if (sort.order === "asc") {
              return a[sort.by] > b[sort.by] ? 1 : -1;
            } else {
              return a[sort.by] < b[sort.by] ? 1 : -1;
            }
          })
        : filtered;

    setFilterMovies(sorted);
  }, [minRating, sort, movies]);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}/movie/${type}?api_key=${API_CONFIG.apiKey}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(Array.isArray(data.results) ? data.results : []);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || error) {
    return (
      <section className="movie_list" id={type}>
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: error ? "#ef4444" : "#64748b",
          }}
        >
          <p>{error || `Loading ${title} movies...`}</p>
          {error && (
            <button
              onClick={fetchMovies}
              style={{ marginTop: "10px", padding: "8px 16px" }}
            >
              Retry
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">{title}</h2>
        <div className="movie_count">{filterMovies.length} movies found</div>
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
    </section>
  );
}
