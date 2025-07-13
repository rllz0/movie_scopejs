import "./App.css";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import SearchResults from "./components/SearchResults";
import { useState } from "react";

function App() {
  const [minRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort] = useState({ by: "default", order: "asc" });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} />

      {searchTerm ? (
        <SearchResults searchTerm={searchTerm} />
      ) : (
        <>
          {["now_playing", "popular", "top_rated", "upcoming"].map((type) => (
            <MovieList
              key={type}
              type={type}
              title={type
                .replace("_", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              minRating={minRating}
              sort={sort}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
