// modal.js

import axios from 'axios';
import apiMovie from './api-movie.js';

export async function openModal(movieId) {
  const modal = document.querySelector('.modal-movie-card');
  const overlay = document.querySelector('.overlay');
  const closeModalMovieCard = document.querySelector('.modal-movie-card-close');
  const openModalMovieCard = document.querySelector('.modal-movie-card-open');

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  closeModalMovieCard.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Fetch movie details from your API
  try {
    const response = await axios({
      method: apiMovie.method,
      url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      headers: apiMovie.headers,
    });

    const movieDetails = response.data;

    console.log(movieDetails);

    // Set modal content using the retrieved movie details
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
    <div>
    <img src = "https://image.tmdb.org/t/p/w500/${
      movieDetails.poster_path
    }" alt="${movieDetails.title}" class ="modal-movie-poster">
    </div>
    <div>
      <p class="modal-movie-tille">Title: ${movieDetails.title}</p>
      <p class="modal-movie-averageVote">Vote Average: ${
        movieDetails.vote_average
      }</p>
      <p class="modal-movie-voteCount">Vote count: ${
        movieDetails.vote_count
      }</p>
      <p class="modal-movie-popularity">Popularity: ${
        movieDetails.popularity
      }</p>
      <p class="modal-movie-originalTitle">Original title: ${
        movieDetails.original_title
      }</p>
      <p class="modal-movie-RealeseDate">Release Date: ${
        movieDetails.release_date
      }</p>
      <p class="modal-movie-overview">Overview: ${movieDetails.overview}</p>
      <p class="modal-movie-genders">Genres: ${movieDetails.genres
        .map(genre => genre.name)
        .join(', ')}</p>
       <button class="add-queue-btn">add to queue</button>
       <button class="add-watched-btn">add to Watched</button>
    </div>

    `;

    // Open the modal
    openModal();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    // Handle the error, e.g., show an error message in the modal
  }
}
