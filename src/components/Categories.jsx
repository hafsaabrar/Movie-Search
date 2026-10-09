import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('Kung Fu Panda');
  const [categoryMovies, setCategoryMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const loadCategory = async (movieName) => {
    setSelectedCategory(movieName);
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${movieName}&type=movie&apikey=trilogy`);
      const data = await response.json();
      if (data.Response === 'True') {
        const validMovies = data.Search.filter(
          (movie) => movie.Poster && movie.Poster !== 'N/A'
        );
        setCategoryMovies(validMovies);
      } else {
        setCategoryMovies([]);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCategory('Kung Fu Panda');
  }, []);

  return (
    <div className="home-container">
      <h2 style={{ marginBottom: '20px', color: '#ffb703' }}>🐻 Cartoon Categories</h2>
      
      <div className="category-container">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => loadCategory(cat)}
            className="category-btn"
            style={{
              backgroundColor: selectedCategory === cat ? '#ffb703' : '#1a1a1a',
              color: selectedCategory === cat ? '#000' : '#fff',
              fontWeight: 'bold'
            }}
          >
            🎬 {cat}
          </button>
        ))}
      </div>

      {loading && <h3 className="status-text">Loading {selectedCategory} movies...</h3>}

      <div className="movies-grid">
        {!loading && categoryMovies.map((movie) => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card-link">
            <div className="movie-card">
              <img
                src={movie.Poster}
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
    </div>
  );
}