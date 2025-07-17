import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import About from "./pages/About";
import SearchResults from "./components/SearchResults";
import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router basename="/movie_scopejs">
      <div className="app">
        <Navbar onSearch={handleSearch} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              debouncedSearchTerm && debouncedSearchTerm.trim() !== "" ? (
                <SearchResults searchTerm={debouncedSearchTerm.trim()} />
              ) : (
                <Home />
              )
            } 
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;