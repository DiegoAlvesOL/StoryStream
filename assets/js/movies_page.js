/**
 * @file movies_page.js
 * @description Controller for the movies listing page.
 * Organises movies into Top Rated and genre sections.
 */

import { fetchMovies } from './data_service.js';
import { renderSection } from './interface_engine.js';

async function initialisePage() {
    const pageContent = document.getElementById('page_content');
    const movies = await fetchMovies();

    // Top Rated — top 10 sorted by score descending
    const topRated = [...movies]
        .sort((a, b) => b.movieScore - a.movieScore)
        .slice(0, 10);
    renderSection(pageContent, '⭐ Top Rated', topRated, 'movie');

    // By genre — one section per unique genre
    const genres = [...new Set(movies.map((m) => m.movieGenre))].sort();
    genres.forEach((genre) => {
        const genreMovies = movies.filter((m) => m.movieGenre === genre);
        renderSection(pageContent, genre, genreMovies, 'movie');
    });
}

initialisePage();