// Favorites.js
import React from 'react';
import MovieCard from './MovieCard';
import './Favorites.css'; // Import the CSS file

const Favorites = ({ favorites, movies, addToFavorites, isFavorite }) => {
    const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

    return (
        <div > {/* Corrected class name */}
            <h2>Favorites</h2>
            <div className="favorites-list">
                {favoriteMovies.map((movie) => (
                    <div key={movie.id} className="favorite-card"> {/* Add favorite-card class */}
                        <MovieCard movie={movie} addToFavorites={addToFavorites} isFavorite={isFavorite(movie.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
