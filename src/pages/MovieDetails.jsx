import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API_CONFIG from "../api";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_CONFIG.baseURL}/movie/${id}?api_key=${API_CONFIG.apiKey}&append_to_response=credits,videos`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch movie details: ${response.status}`);
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details-loading">
        <div className="loading-spinner">Loading movie details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-details-error">
        <h2>Error loading movie details</h2>
        <p>{error}</p>
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details-error">
        <h2>Movie not found</h2>
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    );
  }

  const director = movie.credits?.crew?.find(
    (person) => person.job === "Director"
  );
  const mainCast = movie.credits?.cast?.slice(0, 10) || [];

  return (
    <div className="movie-details">
      <div className="movie-details-hero">
        <div className="movie-details-backdrop">
          {movie.backdrop_path && (
            <img
              src={`${API_CONFIG.imageBaseURL}${movie.backdrop_path}`}
              alt={movie.title}
              className="backdrop-image"
            />
          )}
          <div className="backdrop-overlay"></div>
        </div>

        <div className="movie-details-content">
          <div className="movie-poster-section">
            <img
              src={`${API_CONFIG.imageBaseURL}${movie.poster_path}`}
              alt={movie.title}
              className="movie-details-poster"
            />
          </div>

          <div className="movie-info-section">
            <h1 className="movie-title">{movie.title}</h1>
            {movie.tagline && (
              <p className="movie-tagline">"{movie.tagline}"</p>
            )}

            <div className="movie-meta">
              <span className="rating">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
              <span className="release-date">{movie.release_date}</span>
              <span className="runtime">{movie.runtime} min</span>
            </div>

            <div className="movie-genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>

            {director && (
              <div className="movie-director">
                <h3>Director</h3>
                <p>{director.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {mainCast.length > 0 && (
        <div className="movie-cast">
          <h3>Main Cast</h3>
          <div className="cast-grid">
            {mainCast.map((actor) => (
              <div key={actor.id} className="cast-member">
                {actor.profile_path && (
                  <img
                    src={`${API_CONFIG.imageBaseURL}${actor.profile_path}`}
                    alt={actor.name}
                    className="cast-photo"
                  />
                )}
                <div className="cast-info">
                  <p className="cast-name">{actor.name}</p>
                  <p className="cast-character">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="movie-details-actions">
        <Link to="/" className="back-home-btn">
          ← Back to Home
        </Link>
        <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="tmdb-link-d"
        >
          View on TMDB
        </a>
      </div>
    </div>
  );
}
