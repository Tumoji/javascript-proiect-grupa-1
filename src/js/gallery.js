// gallery.js

import axios from 'axios';
import apiMovie from './api-movie.js';
import { getMovieGenres } from './api-genres.js';
import { createMovieCard } from './markup.js';
import { openModal } from './modal.js';

let currentPage = 1;
const TOTAL_PAGES = 1000; // Numărul total maxim de pagini disponibile.
const ITEMS_PER_PAGE = 20; // Numărul de elemente pe pagină.

// Funcția pentru afișarea cardurilor pe o anumită pagină
async function displayMoviesByPage(page) {
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = ''; // Curata cardurile de filme existente.

  try {
    const movies = await getMoviesFromApi(page);
    await displayMovieCards(movies);
  } catch (error) {
    console.error(
      'There was a problem displaying movies for page:',
      page,
      error
    );
  }
}

// Actualizează funcția getMoviesFromApi pentru a primi pagina ca argument:
async function getMoviesFromApi(page) {
  try {
    const apiMoviePage = {
      ...apiMovie,
      url: `${apiMovie.url}&page=${page}`, // Adaugă pagina la URL-ul cererii.
    };

    const response = await axios.request(apiMoviePage);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data.results;
  } catch (error) {
    console.error('There was a problem fetching movies for page:', page, error);
    return [];
  }
}

// Funcția pentru afișarea cardurilor de filme
async function displayMovieCards(movies) {
  const movieContainer = document.querySelector('.movie-container');

  try {
    const genres = await getMovieGenres();

    movies.forEach(movie => {
      const movieCard = createMovieCard(movie, genres); // Utilizează funcția pentru generarea cardului de film.
      movieContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error('There was a problem displaying movie cards:', error);
  }
}

// Funcția pentru actualizarea paginării și afișarea cardurilor pentru pagina curentă:
// Funcția pentru actualizarea paginării și afișarea cardurilor pentru pagina curentă:
async function updatePaginationAndDisplay(page) {
  try {
    currentPage = page;
    await displayMoviesByPage(currentPage);

    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    const prevButton = document.createElement('a');
    prevButton.href = '#';
    prevButton.innerHTML = '&laquo;';
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        updatePaginationAndDisplay(currentPage - 1);
      }
    });
    pagination.appendChild(prevButton);

    const maxPages = Math.min(currentPage + 2, TOTAL_PAGES);
    const minPages = Math.max(1, maxPages - 4);

    for (let i = minPages; i <= maxPages; i++) {
      const pageButton = document.createElement('a');
      pageButton.href = '#';
      pageButton.textContent = i;
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        updatePaginationAndDisplay(i);
      });
      pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement('a');
    nextButton.href = '#';
    nextButton.innerHTML = '&raquo;';
    nextButton.addEventListener('click', () => {
      if (currentPage < TOTAL_PAGES) {
        updatePaginationAndDisplay(currentPage + 1);
      }
    });
    pagination.appendChild(nextButton);
  } catch (error) {
    console.error('There was a problem updating pagination:', error);
  }
}

// Apelul inițial pentru afișarea cardurilor pentru prima pagină:
updatePaginationAndDisplay(currentPage);
