// modal.js

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

export { openModal };
