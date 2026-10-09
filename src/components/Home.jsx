import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('Kung Fu Panda');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Kung Fu Panda', 
    'The Lion King', 
    'Madagascar', 
    'Zootopia', 
    'Ice Age', 
    'Finding Nemo', 
    'Garfield', 
    'Paddington'
  ];

  const fetchMovies = async (query) => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&type=movie&apikey=trilogy`);
      const data = await response.json();
      if (data.Response === 'True') {
        const validMovies = data.Search.filter(
          (movie) => movie.Poster && movie.Poster !== 'N/A'
        );
        setMovies(validMovies);
      } else {
        setError('No cartoon movies found. Try another search!');
        setMovies([]);
      }
    } catch (err) {
      setError('Something went wrong. Try again!');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies('Kung Fu Panda');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  return (
    <div className="home-container">
      <h2 style={{ textAlign: 'center', color: '#ffb703', marginBottom: '20px' }}>
        Fun Animated & Animal Movies
      </h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search cartoons (e.g. Tom and Jerry, Rio)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

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

      {loading && <h3 className="status-text">Searching fun movies...</h3>}
      {error && <h3 className="error-text">{error}</h3>}

      <div className="movies-grid">
        {!loading && movies.map((movie) => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card-link">
            <div className="movie-card">
              {movie.Poster && movie.Poster !== 'N/A' && (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="movie-poster"
                  onError={handleImageError}
                />
              )}
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