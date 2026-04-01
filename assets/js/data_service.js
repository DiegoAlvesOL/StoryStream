/**
 * @file data_service.js
 * @description Data layer responsible for fetching all media data from JSON files.
 * All pages import from here — never fetch directly from HTML pages.
 */

/**
 * Fetches and returns all movies from the JSON database.
 * @returns {Promise<Array>} Array of movie objects.
 */
export async function fetchMovies() {
    try {
        const response = await fetch('./data/movies_database.json');
        const movies = await response.json();
        return movies;
    } catch (error) {
        console.error('Failed to fetch movies:', error);
        return [];
    }
}

/**
 * Fetches and returns all books from the JSON database.
 * @returns {Promise<Array>} Array of book objects.
 */
export async function fetchBooks() {
    try {
        const response = await fetch('./data/books_database.json');
        const books = await response.json();
        return books;
    } catch (error) {
        console.error('Failed to fetch books:', error);
        return [];
    }
}