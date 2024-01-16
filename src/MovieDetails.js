// MovieDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetails.css'; // Import the CSS file

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { id } = useParams(); // Extracts the 'id' parameter from the URL

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}`,
    params: {language: 'en-US'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTM5YWNmMjAyNzFkMmUwYzQ4YzU4YTJkZjMxMDkyNiIsInN1YiI6IjY1ODFmNjE5YmYwZjYzMDhhZTYyNzMzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFOMh3Ay0ekWz3lO2Ol_tpfu7vq_x2RBdl65Oiafyhs'
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.request(options);
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id, options]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movieDetails.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
      <p>{movieDetails.overview}</p>
      <p>Release Date: {movieDetails.release_date}</p>
      <p>Genres: {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
      <p>Runtime: {movieDetails.runtime} minutes</p>
      <p>Vote Average: {movieDetails.vote_average}</p>
      <p>Tagline: {movieDetails.tagline}</p>
      <p>Status: {movieDetails.status}</p>
      <p>Original Language: {movieDetails.original_language}</p>
      <p>Homepage: <a href={movieDetails.homepage} target="_blank" rel="noopener noreferrer">{movieDetails.homepage}</a></p>
      <p>IMDB ID: {movieDetails.imdb_id}</p>
      <p>Popularity: {movieDetails.popularity}</p>
      <p>Budget: {movieDetails.budget}</p>
      <p>Revenue: {movieDetails.revenue}</p>
      <p>Adult: {movieDetails.adult ? 'Yes' : 'No'}</p>
      <p>Video: {movieDetails.video ? 'Yes' : 'No'}</p>
      <p>Production Companies: {movieDetails.production_companies.map((company) => company.name).join(', ')}</p>
      <p>Production Countries: {movieDetails.production_countries.map((country) => country.name).join(', ')}</p>
      <p>Spoken Languages: {movieDetails.spoken_languages.map((language) => language.name).join(', ')}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default MovieDetails;
