import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import './App.css';

export default function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="brand-logo">
          🎬 MovieFlix
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/trending" className="nav-link">Trending</Link>
          <Link to="/categories" className="nav-link">Categories</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}