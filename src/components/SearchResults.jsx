import "./MovieList.css";
import MovieCard from "./MovieCard";
import { useMovieSearch } from "../hooks/useMovieSearch";

export default function SearchResults({ searchTerm }) {
  const {
    searchResults,
    loading,
    error,
    currentPage,
    totalPages,
    loadingMore,
    loadMore,
  } = useMovieSearch(searchTerm);

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
          {searchResults.length} movies found
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
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
