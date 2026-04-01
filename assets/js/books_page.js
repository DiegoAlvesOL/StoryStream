/**
 * @file books_page.js
 * @description Controller for the books listing page.
 * Organises books into Top Rated and genre sections.
 */

import { fetchBooks } from './data_service.js';
import { renderSection } from './interface_engine.js';

async function initialisePage() {
    const pageContent = document.getElementById('page_content');
    const books = await fetchBooks();

    // Top Rated — top 10 sorted by score descending
    const topRated = [...books]
        .sort((a, b) => b.bookScore - a.bookScore)
        .slice(0, 10);
    renderSection(pageContent, '⭐ Top Rated', topRated, 'book');

    // By genre — one section per unique genre
    const genres = [...new Set(books.map((b) => b.bookGenre))].sort();
    genres.forEach((genre) => {
        const genreBooks = books.filter((b) => b.bookGenre === genre);
        renderSection(pageContent, genre, genreBooks, 'book');
    });
}

initialisePage();