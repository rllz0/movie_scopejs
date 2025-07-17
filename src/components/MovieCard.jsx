import "./MovieCard.css";
import { Link } from "react-router-dom";
import API_CONFIG from "../api";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie_card">
      <img
        src={`${API_CONFIG.imageBaseURL}/${movie.poster_path}`}
        alt="movie poster"
        className="movie_poster"
      />

      <div className="movie_rating_circle">{movie.vote_average.toFixed(1)}</div>

      <div className="movie_details">
        <h3 className="movie_details_heading">{movie.original_title}</h3>
        <div className="align_center movie_date_rate">
          <p>{movie.release_date}</p>
        </div>
        <p className="movie_description">
          {movie.overview
            ? movie.overview.slice(0, 100) + "..."
            : "No description available"}
        </p>
      </div>
    </Link>
  );
}
