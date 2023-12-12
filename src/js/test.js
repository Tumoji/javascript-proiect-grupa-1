async function displayMoviesByPage(page) {
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = ''; // Curăță cardurile de filme existente.

  try {
    const movies = await getMoviesFromApi(page);
    const genres = await getMovieGenres(); // Obține genurile

    // Eliminarea event listener-ilor de pe cardurile vechi înainte de adăugarea noilor carduri
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(movieCard => {
      removeCardClickListener(movieCard);
      movieCard.remove();
    });

    movies.forEach(movie => {
      const movieCard = createMovieCard(movie, genres);
      movieContainer.appendChild(movieCard);
      attachCardClickListener(movieCard, movie.id);
    });
  } catch (error) {
    console.error(
      'There was a problem displaying movies for page:',
      page,
      error
    );
  }
}
