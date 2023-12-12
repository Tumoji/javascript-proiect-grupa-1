// markup.js

import { openModal } from './modal.js';

// Funcție pentru generarea sablonului unui card de film:
export function createMovieCard(movie, genres) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');
  movieCard.setAttribute('data-movieid', movie.id);
  movieCard.setAttribute('modal-movie-card-open', 'true');

  const movieImage = document.createElement('img');
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  // Încercă să încarci imaginea; în caz de eroare, setează o imagine implicită sau un alt text
  try {
    movieImage.src = imageUrl;
  } catch (error) {
    movieImage.src = 'default-image.jpg'; // sau poți afișa un alt text
    movieImage.alt = 'Image not available';
    console.error('Failed to load image:', error);
  }

  movieImage.alt = movie.title;
  movieImage.classList.add('movie-image');
  movieImage.tabIndex = 0;

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

  // Verifică dacă există genuri disponibile; în caz contrar, afișează un mesaj alternativ
  const genresString =
    movieGenres.length > 0 ? movieGenres.join(' ') : 'Genre not available';
  movieInfo.textContent = `${genresString} | ${releaseYear} `;
  movieInfo.classList.add('movie-info');

  movieCard.addEventListener('click', () => {
    openModal(); // Deschide fereastra modală când este apăsat un card de film
  });

  movieCard.appendChild(movieImage);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieInfo);

  return movieCard;
}
