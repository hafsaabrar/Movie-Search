import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('Avengers');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Avengers', 'Batman', 'Animated', 'Spider-Man', 'Harry Potter'];

  const fetchMovies = async (query) => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=trilogy`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError('Something went wrong. Try again!');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies('Avengers');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  return (
    <div className="home-container">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies (e.g. Inception, Lion King)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {/* Category Buttons */}
      <div className="category-container">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setSearchTerm(cat); fetchMovies(cat); }}
            className="category-btn"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading & Error */}
      {loading && <h3 className="status-text">Searching movies...</h3>}
      {error && <h3 className="error-text">{error}</h3>}

      {/* Grid */}
      <div className="movies-grid">
        {!loading && movies.map((movie) => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card-link">
            <div className="movie-card">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={movie.Title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                }}
                className="movie-poster"
              />
              <div className="movie-info">
                <h4 className="movie-title">{movie.Title}</h4>
                <small className="movie-year">{movie.Year}</small>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}