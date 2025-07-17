import { useState, useEffect, useRef } from 'react';
import API_CONFIG from '../api';

export const useMovieSearch = (searchTerm) => {
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
    setError(null);
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      setSearchResults([]);
      setLoading(false);
      setError(null);
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
          if (currentPage === 1) {
            setSearchResults([]);
          }
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

  const resetSearch = () => {
    setSearchResults([]);
    setCurrentPage(1);
    setError(null);
    setLoading(false);
    setLoadingMore(false);
  };

  return {
    searchResults,
    loading,
    error,
    currentPage,
    totalPages,
    loadingMore,
    loadMore,
    resetSearch
  };
};