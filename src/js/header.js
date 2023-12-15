import axios from 'axios';
import apiSearch from './api-search.js';
import { getMovieGenres } from './api-genres.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.searchInput');
const resultContainer = document.querySelector('.resultContainer');
const galleryContainer = document.querySelector('.gallery');
const libraryContainer = document.querySelector('.library');
const searchErrorContainer = document.querySelector('.searchError');
const loaderContainer = document.querySelector('.loader-container');

// Function to toggle loader visibility
function toggleLoader(show) {
  loaderContainer.style.display = show ? 'flex' : 'none';
}

// Show loader initially
toggleLoader(true);

// Use the window's load event to hide the loader when all content is loaded
window.addEventListener('load', function () {
  // Set a small delay before hiding the loader to ensure smooth transition
  setTimeout(function () {
    toggleLoader(false);
  }, 500);
});

function hideLoaderAfterSearch() {
  // Set a small delay before hiding the loader to ensure smooth transition
  setTimeout(function () {
    toggleLoader(false);
  }, 500);
}

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    showError('Please enter a search term');
    toggleLoader(false);
    return;
  }

  // Toggle the loader when a search is initiated
  toggleLoader(true);

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
    resultContainer.style.display = movies.length > 0 ? 'flex' : 'none';

    if (movies.length === 0) {
      showError('No results found.');
      hideLoaderAfterSearch();
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

    hideLoaderAfterSearch();
  } catch (error) {
    console.error('Error:', error);
    showError('An error occurred while fetching data.');
    toggleLoader(false);
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

// Functiile butoanelor care arata si ascund diferite sectiuni

const btnContainer1 = document.querySelector('.btn-52');
const btnContainer2 = document.querySelector('.btn-53');
const searchContainer = document.querySelector('.search-container');
const libraryBtnsContainer = document.querySelector('.library-btns-container');
const logoContainer = document.querySelector('.logo-alignment');
galleryContainer.style.display = 'block';
libraryContainer.style.display = 'none';

btnContainer1.addEventListener('click', function () {
  console.log('btnContainer1 clicked');
  // When btn-container-1 is clicked, show the gallery and hide the library
  galleryContainer.style.display = 'block';
  libraryContainer.style.display = 'none';
});

btnContainer2.addEventListener('click', function () {
  // When btn-container-2 is clicked, hide the gallery and show the library
  galleryContainer.style.display = 'none';
  searchContainer.style.display = 'none';
  resultContainer.style.display = 'none';
  libraryContainer.style.display = 'block';
  libraryBtnsContainer.style.display = 'flex';
});

// functie pentru activarea si dezactivarea butoanelor de clear pentru watched si queue

const clearWatchedBtn = document.querySelector('.clear-watched-btn');
const clearQueueBtn = document.querySelector('.clear-queue-btn');
const watchedBtn = document.querySelector('.btn-watched');
const queueBtn = document.querySelector('.btn-queue');
// Function to set the default state
function setDefaultState() {
  // Set the default state for the queue button
  queueBtn.classList.add('active-btn');
  clearWatchedBtn.style.display = 'none';
  clearQueueBtn.style.display = 'flex';
  // watchedBtn.classList.remove('active');
}

// Call the function to set the default state
setDefaultState();

watchedBtn.addEventListener('click', function () {
  console.log('watchedBtn clicked');
  // watchedBtn.classList.add('active');
  // Check if the clear watched button is active
  if (!watchedBtn.classList.contains('active-btn')) {
    // Hide the clear queue button
    clearQueueBtn.style.display = 'none';
    // Show the clear watched button
    clearWatchedBtn.style.display = 'flex'; // or 'block' based on your styling

    watchedBtn.classList.add('active-btn');
    // Remove the active class from the clear queue button
    queueBtn.classList.remove('active-btn');
  }
});

queueBtn.addEventListener('click', function () {
  console.log('queueBtn clicked');
  // Check if the clear watched button is active
  if (!queueBtn.classList.contains('active-btn')) {
    // Hide the clear queue button
    clearWatchedBtn.style.display = 'none';
    // Show the clear watched button
    clearQueueBtn.style.display = 'flex'; // or 'block' based on your styling

    queueBtn.classList.add('active-btn');
    // Remove the active class from the clear queue button
    watchedBtn.classList.remove('active-btn');
  }
});

logoContainer.addEventListener('click', function () {
  console.log('logoContainer clicked');
  window.location.href = 'index.html';
});
