// MovieList.js
import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css'; // Import the CSS file

const MovieList = ({ movies, addToFavorites,isFavorite,favorites }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          addToFavorites={addToFavorites}
          isFavorite={isFavorite(movie.id)}
          favorites = {favorites}
        />
      ))}
    </div>
  );
};

export default MovieList;
