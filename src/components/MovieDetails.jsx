import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieDetails.css';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=trilogy`);
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    getMovieDetails();
  }, [id]);

  if (loading) return <h2 className="status-text" style={{ marginTop: '50px' }}>Loading Details...</h2>;

  return (
    <div className="details-container">
      <Link to="/" className="back-link">
        ← Back to Search
      </Link>

      {movie && (
        <div className="details-card">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={movie.Title}
            className="details-poster"
          />
          <div>
            <h1 className="details-title">{movie.Title}</h1>
            <p className="details-rating">⭐ {movie.imdbRating} / 10</p>
            <p className="details-meta"><strong>Genre:</strong> {movie.Genre}</p>
            <p className="details-meta"><strong>Released:</strong> {movie.Released}</p>
            <p className="details-meta"><strong>Actors:</strong> {movie.Actors}</p>
            <p className="details-plot">{movie.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
}