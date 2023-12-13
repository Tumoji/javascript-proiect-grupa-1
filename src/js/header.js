// your-script.js
import axios from 'axios';
import apiSearch from './api-search.js';
import { getMovieGenres } from './api-genres.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.searchInput');
const resultContainer = document.querySelector('.resultContainer');
const galleryContainer = document.querySelector('.gallery');
const searchContainer = document.querySelector('.resultContainer');
const searchErrorContainer = document.querySelector('.searchError');

const loaderContainer = document.querySelector('.loader-container');

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    showError('Please enter a search term');
    loaderContainer.style.display = 'none';
    return;
  }

  loaderContainer.style.display = 'none';

  // Remove the error message when a new search is initiated
  clearError();

  const searchUrl = `${apiSearch.url}&query=${encodeURIComponent(searchTerm)}`;

  try {
    const genres = await getMovieGenres();
    const response = await axios.get(searchUrl, apiSearch);
    const movies = response.data.results;

    // Ascunde Gallery cand apar filme din search
    galleryContainer.style.display = movies.length > 0 ? 'none' : 'block';

    // Afiseaza search-movies.html cand apar filme din search
    searchContainer.style.display = movies.length > 0 ? 'flex' : 'none';

    if (movies.length === 0) {
      showError('No results found.');
      loaderContainer.style.display = 'none';
      return;
    }

    // loaderContainer.style.display = 'flex';

    // Clear any existing results
    resultContainer.innerHTML = '';

    movies.forEach(async movie => {
      // Check if the movie has a poster before creating the card
      if (movie.poster_path || !movie.poster_path) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card-search');

        const movieImage = document.createElement('img');
        const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieImage.src = imageUrl;
        movieImage.alt = movie.title;
        movieImage.classList.add('movie-image');
        movieImage.tabIndex = 0;

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;
        movieTitle.classList.add('movie-title');

        const movieInfo = document.createElement('p');
        const releaseYear =
          (movie.release_date && movie.release_date.split('-')[0]) ||
          'undefined';

        const movieGenres = movie.genre_ids.map(genreId => {
          const foundGenre = genres.find(genre => genre.id === genreId);
          return foundGenre ? foundGenre.name : '';
        });

        const genresString = movieGenres.join(' ');
        movieInfo.textContent = `${genresString} | ${releaseYear}`;
        movieInfo.classList.add('movie-info');

        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieInfo);
        resultContainer.appendChild(movieCard);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    showError('An error occurred while fetching data.');
  }
});

function showError(message) {
  searchErrorContainer.textContent = message;
  searchErrorContainer.style.display = 'block';
}

function clearError() {
  searchErrorContainer.textContent = '';
  searchErrorContainer.style.display = 'none';
}
