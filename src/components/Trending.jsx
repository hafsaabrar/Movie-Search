import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Trending() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popular search queries se trending movies fetch kar rahe hain
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=2024&type=movie&apikey=trilogy`);
        const data = await response.json();
        if (data.Response === 'True') {
          setTrendingMovies(data.Search);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchTrending();
  }, []);

  return (
    <div className="home-container">
      <h2 style={{ marginBottom: '20px', color: '#fff' }}>🔥 Trending Movies</h2>
      {loading ? (
        <h3 className="status-text">Loading Trending Movies...</h3>
      ) : (
        <div className="movies-grid">
          {trendingMovies.map((movie) => (
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card-link">
              <div className="movie-card">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                  alt={movie.Title}
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
      )}
    </div>
  );
}