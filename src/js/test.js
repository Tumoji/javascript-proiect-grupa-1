import axios from 'axios';
import apiDetails from './api-details.js';
import { createMovieCard } from './markup.js';

// Obține ID-ul filmului din local storage sau de unde ai salvat `movieId`
const movieId = '872585'; // Înlocuiește cu valoarea reală a ID-ului

// Funcția pentru a obține detaliile filmului pe baza ID-ului
async function getMovieDetails(movieId) {
  try {
    const response = await axios.get(
      apiDetails.url(movieId),
      apiDetails.headers
    );

    const movieData = response.data;
    const title = movieData.title;
    const genres = movieData.genres.map(genre => genre.name).join(', ');
    const releaseYear = movieData.release_date.split('-')[0];

    console.log('Title:', title);
    console.log('Genres:', genres);
    console.log('Release Year:', releaseYear);

    return movieData;
  } catch (error) {
    throw new Error('Error fetching movie details');
  }
}

// Obținem detalii despre film și afișăm informațiile în consolă
async function displayMovieDetails(movieId) {
  try {
    const movieDetails = await getMovieDetails(movieId);

    // Folosim detaliile filmului pentru a crea un card de film
    const movieCard = createMovieCard(movieDetails);

    // Adăugăm cardul de film în DOM
    const movieContainer = document.getElementById('movieContainer'); // Înlocuiește 'movieContainer' cu ID-ul containerului tău din DOM
    movieContainer.appendChild(movieCard);
  } catch (error) {
    console.error('Error displaying movie details:', error);
  }
}

// Apelăm funcția pentru a afișa detaliile despre un film și a crea un card de film
displayMovieDetails(movieId);
