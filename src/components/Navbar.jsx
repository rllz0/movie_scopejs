import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedTerm);
  }, [debouncedTerm, onSearch]);

  return (
    <nav className="navbar">
      <h1>MovieScope</h1>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search_input"
        />
      </div>

      <div className="navbar_links">
        <a href="#now_playing">Now Playing</a>
        <a href="#popular">Popular</a>
        <a href="#top_rated">Top Rated</a>
        <a href="#upcoming">Upcoming</a>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}
