// gallery.js

import axios from 'axios';
import apiMovie from './api-movie.js';
import { getMovieGenres } from './api-genres.js';
import { openModal } from './modal.js';

let currentPage = 1;
const TOTAL_PAGES = 1000; // Numărul total maxim de pagini disponibile
const ITEMS_PER_PAGE = 20; // Define the number of items per page

// Funcția pentru afișarea cardurilor pe o anumită pagină
async function displayMoviesByPage(page) {
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = ''; // Clear the existing movie cards

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

// Actualizarea funcției getMoviesFromApi pentru a primi pagina ca argument
async function getMoviesFromApi(page) {
  try {
    const apiMoviePage = {
      ...apiMovie,
      url: `${apiMovie.url}&page=${page}`, // Adăugați pagina la URL-ul solicitării
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
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
      movieCard.setAttribute('data-movieid', movie.id);
      movieCard.setAttribute('modal-movie-card-open', 'true');

      const movieImage = document.createElement('img');
      const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      movieImage.src = imageUrl;
      movieImage.alt = movie.title;
      movieImage.classList.add('movie-image');
      movieImage.tabIndex = 0; // Adăugarea atributului tabindex

      const movieTitle = document.createElement('h3');
      movieTitle.textContent = movie.title;
      movieTitle.classList.add('movie-title');

      const movieInfo = document.createElement('p');
      const releaseYear =
        (movie.release_date && movie.release_date.split('-')[0]) || 'undefined';

      const movieGenres = movie.genre_ids.map(genreId => {
        const foundGenre = genres.find(genre => genre.id === genreId);
        return foundGenre ? foundGenre.name : '';
      });

      const genresString = movieGenres.join(' ');
      movieInfo.textContent = `${genresString} | ${releaseYear} `;
      movieInfo.classList.add('movie-info');

      // movieCard.addEventListener('click', () => {
      //   openModal(); // Deschide fereastra modală când este apăsat un card de film
      // });

      movieCard.addEventListener('click', () => {
        openModal(movie.id);
      });

      movieCard.appendChild(movieImage);
      movieCard.appendChild(movieTitle);
      movieCard.appendChild(movieInfo);
      movieContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error('There was a problem displaying movie cards:', error);
  }
}

// Funcția pentru actualizarea paginării și afișarea cardurilor pentru pagina curentă
async function updatePaginationAndDisplay(page) {
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
}

// Apelul inițial pentru afișarea cardurilor pentru prima pagină
updatePaginationAndDisplay(currentPage);
