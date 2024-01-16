// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import SearchBar from './SearchBar';
import Favorites from './Favorites';
import './App.css';

let popularMovies = [];

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const isMovieFavorite = (movieId) => favorites.includes(movieId);

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular',
    params: {language: 'en-US', page: '1'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTM5YWNmMjAyNzFkMmUwYzQ4YzU4YTJkZjMxMDkyNiIsInN1YiI6IjY1ODFmNjE5YmYwZjYzMDhhZTYyNzMzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFOMh3Ay0ekWz3lO2Ol_tpfu7vq_x2RBdl65Oiafyhs'
    }
  };
  
  useEffect(() => {
    // Fetch movies from TMDB API
    const fetchMovies = async () => {
      try {
        axios
      .request(options)
      .then(function (response) {
      console.log(response.data);
      setMovies(response.data.results);
      popularMovies = movies;
      })
    .catch(function (error) {
      console.error(error);
    });
        
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    

    fetchMovies();
  }, []);
  

  const addToFavorites = (movieId) => {
    if (favorites.includes(movieId)) {
      setFavorites(favorites.filter((id) => id !== movieId));
    } else {
      setFavorites([...favorites, movieId]);
    }
  };

  const searchMovies = async (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {query: query, include_adult: 'false', language: 'en-US', page: '1'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTM5YWNmMjAyNzFkMmUwYzQ4YzU4YTJkZjMxMDkyNiIsInN1YiI6IjY1ODFmNjE5YmYwZjYzMDhhZTYyNzMzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFOMh3Ay0ekWz3lO2Ol_tpfu7vq_x2RBdl65Oiafyhs'
      }
    };

    try {
        axios
      .request(options)
      .then(function (response) {
      console.log(response.data);
      setSearchResults(response.data.results);
      })
      .catch(function (error) {
      console.error(error);
      });
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/" className="home-link">Home</Link>
            </li>
            <li>
              <Link to="/favorites" className="favorites-link">Favorites</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={searchResults.length > 0 ? searchResults : movies}
                addToFavorites={addToFavorites}
                favorites={favorites}
                searchMovies={searchMovies}
                isFavorite = {isMovieFavorite}
              />
            }
          />

          <Route path="/favorites" 
          element={
          <Favorites 
          favorites={favorites} 
          movies={movies} 
          addToFavorites={addToFavorites} 
          isFavorite = {isMovieFavorite}
          />} />

          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = ({ movies, addToFavorites, favorites, searchMovies,isFavorite }) => {
  return (
    <div className="home">
      <SearchBar onSearch={searchMovies} />
    <MovieList 
      movies={movies} 
      addToFavorites={addToFavorites} 
      isFavorite = {isFavorite}
      favorites = {favorites}
    />
    </div>
  );
};

export default App;
