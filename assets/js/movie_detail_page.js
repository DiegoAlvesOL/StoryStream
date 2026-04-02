/**
 * @file movie_detail_page.js
 * @description Controller for the movie detail page.
 * Reads the movie ID from the URL, fetches the data, and renders the full review.
 */

import { fetchMovies } from './data_service.js';

async function initialisePage() {
    const params = new URLSearchParams(window.location.search);
    const movieId = parseInt(params.get('id'));

    const container = document.getElementById('detail_content');

    if (isNaN(movieId)) {
        renderError(container, 'No movie ID provided.');
        return;
    }

    const movies = await fetchMovies();
    const movie = movies.find((m) => m.movieId === movieId);

    if (!movie) {
        renderError(container, 'Movie not found. It may have been removed or the link is incorrect.');
        return;
    }

    renderMovie(container, movie);
}

function renderMovie(container, movie) {
    const review = movie.movieReview || movie.movieSynopsis;

    container.innerHTML = `
        <div class="detail_layout">

            <div class="detail_poster_column">
                <img
                    src="${movie.moviePosterUrl}"
                    alt="${movie.movieTitle}"
                    class="detail_poster"
                >
            </div>

            <div class="detail_info_column">
                <p class="detail_category_label">Movie Review</p>

                <h1 class="detail_title">${movie.movieTitle}</h1>

                <div class="detail_meta_row">
                    <span class="detail_score">⭐ ${movie.movieScore}</span>
                    <span class="detail_meta_item">${movie.movieGenre}</span>
                    <span class="detail_meta_item">${movie.movieReleaseYear}</span>
                </div>

                <p class="detail_director">Directed by ${movie.movieDirector}</p>

                <div class="detail_divider"></div>

                <p class="detail_review">${review}</p>

                <a href="./movies.html" class="back_link">← Back to Movies</a>
            </div>

        </div>
    `;
}

function renderError(container, message) {
    container.innerHTML = `
        <div class="detail_error">
            <p class="detail_error_message">${message}</p>
            <a href="./movies.html" class="back_link">← Back to Movies</a>
        </div>
    `;
}

initialisePage();