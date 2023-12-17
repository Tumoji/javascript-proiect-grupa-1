import axios from 'axios';
import apiMovie from './api-movie.js';
import { getMovieGenres } from './api-genres.js';
import { createMovieCard } from './markup.js';
import { openModal } from './modal.js';

document.addEventListener('DOMContentLoaded', async function () {
  const btnMyLibrary = document.querySelector('.btn-container-2');
  const btnWatched = document.querySelector('.btn-watched');
  const btnQueue = document.querySelector('.btn-queue');
  const sectionWatched = document.querySelector('.library-watched');
  const sectionQueue = document.querySelector('.library-queue');

  function myLibraryClickHandler() {
    // Ascunde sectiunea "WATCHED" și afișează sectiunea "QUEUE" la apăsarea butonului "My Library"
    sectionWatched.style.display = 'none';
    sectionQueue.style.display = '';
  }

  function watchedClickHandler() {
    // Afisează sectiunea "WATCHED" și ascunde sectiunea "QUEUE" la apăsarea butonului "WATCHED"
    sectionWatched.style.display = '';
    sectionQueue.style.display = 'none';
  }

  function queueClickHandler() {
    // Ascunde sectiunea "WATCHED" și afișează sectiunea "QUEUE" la apăsarea butonului "QUEUE"
    sectionWatched.style.display = 'none';
    sectionQueue.style.display = '';
  }

  // Adăugare event listener-uri pentru fiecare buton
  btnMyLibrary.addEventListener('click', myLibraryClickHandler);
  btnWatched.addEventListener('click', watchedClickHandler);
  btnQueue.addEventListener('click', queueClickHandler);

  // Ascunde initial ambele sectiuni
  sectionWatched.style.display = 'none';
  sectionQueue.style.display = 'none';

  btnMyLibrary.addEventListener('click', function () {
    // Afiseaza initial sectiunea "QUEUE" la apasarea butonului "My Library"
    sectionWatched.style.display = 'none';
    sectionQueue.style.display = '';
  });

  btnWatched.addEventListener('click', function () {
    // Afiseaza sectiunea "WATCHED" la apasarea butonului "WATCHED"
    sectionWatched.style.display = '';
    sectionQueue.style.display = 'none';
  });

  btnQueue.addEventListener('click', function () {
    // Afiseaza sectiunea "QUEUE" la apasarea butonului "QUEUE"
    sectionWatched.style.display = 'none';
    sectionQueue.style.display = '';
  });

  // Obține genurile pentru filme o singură dată
  const genres = await getMovieGenres();
  console.log(genres);

  // Funcția pentru atașarea event listener-ului la un card de film:
  function attachCardClickListener(movieCard, movieId) {
    movieCard.addEventListener('click', () => {
      openModal(movieId); // Deschide fereastra modală când este apăsat un card de film.
    });
  }

  async function displayMoviesFromLocalStorage(listType) {
    const movies = JSON.parse(localStorage.getItem(listType)) || [];
    const targetSection =
      listType === 'watched' ? sectionWatched : sectionQueue;

    // Golește secțiunea pentru a evita duplicarea filmelor
    targetSection.innerHTML = '';

    await Promise.all(
      movies.map(async movieId => {
        try {
          const movieDetails = await getMovieDetails(movieId);
          // Creează un card pentru fiecare film și adaugă-l în secțiunea corespunzătoare
          const movieCard = createMovieCard(movieDetails, genres);
          attachCardClickListener(movieCard, movieId);
          targetSection.appendChild(movieCard);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      })
    );
  }

  // Funcția pentru a obține detalii despre un film în funcție de id
  async function getMovieDetails(movieId) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        apiMovie
      );
      return response.data;
    } catch (error) {
      throw new Error('Error fetching movie details');
    }
  }

  // Apelează funcția pentru ambele tipuri de liste
  displayMoviesFromLocalStorage('watched');
  displayMoviesFromLocalStorage('queue');

  const clearWatchedBtn = document.querySelector('.clear-watched-btn');
  const clearQueueBtn = document.querySelector('.clear-queue-btn');

  // Adaugă un eveniment de ascultare pentru butoanele "Clear"
  clearWatchedBtn.addEventListener('click', function () {
    clearLocalStorage('watched');
  });

  clearQueueBtn.addEventListener('click', function () {
    clearLocalStorage('queue');
  });

  // Funcția pentru a curăța datele din local storage și emite un eveniment personalizat
  function clearLocalStorage(listType) {
    localStorage.removeItem(listType);
    // Emiterea unui eveniment personalizat pentru a notifica actualizarea
    const updateEvent = new CustomEvent('localStorageUpdated', {
      detail: { listType },
    });
    window.dispatchEvent(updateEvent);
  }

  // Adaugă un ascultător pentru evenimentul personalizat
  window.addEventListener('localStorageUpdated', function (event) {
    // Actualizarea afișajului în funcție de tipul de listă
    displayMoviesFromLocalStorage(event.detail.listType);
  });
  window.addEventListener('beforeunload', function () {
    // Elimină event listener-urile aici
    btnMyLibrary.removeEventListener('click', myLibraryClickHandler);
    btnWatched.removeEventListener('click', watchedClickHandler);
    btnQueue.removeEventListener('click', queueClickHandler);
  });
});
