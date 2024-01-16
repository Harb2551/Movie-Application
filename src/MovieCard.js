import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie, addToFavorites, isFavorite, favorites }) => {
  return (
    <div className = "movie-card">
      <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <button onClick={() => addToFavorites(movie.id)}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <Link to={`/movie/${movie.id}`}>Read More</Link>
    </div>
  );
};

export default MovieCard;