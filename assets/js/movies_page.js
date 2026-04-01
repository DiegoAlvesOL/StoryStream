/**
 * @file movies_page.js
 * @description Controller for the movies listing page.
 * Fetches movie data and delegates rendering to the interface engine.
 */

import { fetchMovies } from './data_service.js';
import { renderMovieCards } from './interface_engine.js';

async function initialisePage() {
    const container = document.getElementById('movies_carousel_track');

    const movies = await fetchMovies();
    renderMovieCards(movies, container);
}

initialisePage();