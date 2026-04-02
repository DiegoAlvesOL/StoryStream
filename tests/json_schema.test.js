const fs = require('fs');
const path = require('path');

function loadJSON(relativePath) {
    const fullPath = path.resolve(__dirname, '..', relativePath);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(raw);
}

describe('books_database.json', () => {
    let books;

    beforeAll(() => {
        books = loadJSON('data/books_database.json');
    });

    test('should be a non-empty array', () => {
        expect(Array.isArray(books)).toBe(true);
        expect(books.length).toBeGreaterThan(0);
    });

    test.each([
        'bookId',
        'bookTitle',
        'bookAuthor',
        'bookGenre',
        'bookPublicationYear',
        'bookPosterUrl',
        'bookDescription',
        'bookScore',
        'bookReview',
    ])('every book should have the field "%s"', (field) => {
        books.forEach((book) => {
            expect(book).toHaveProperty(field);
        });
    });

    test('bookId should be a unique number for each entry', () => {
        const ids = books.map((b) => b.bookId);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(books.length);
    });

    test('bookScore should be a number between 0 and 10', () => {
        books.forEach((book) => {
            expect(typeof book.bookScore).toBe('number');
            expect(book.bookScore).toBeGreaterThanOrEqual(0);
            expect(book.bookScore).toBeLessThanOrEqual(10);
        });
    });
});

describe('movies_database.json', () => {
    let movies;

    beforeAll(() => {
        movies = loadJSON('data/movies_database.json');
    });

    test('should be a non-empty array', () => {
        expect(Array.isArray(movies)).toBe(true);
        expect(movies.length).toBeGreaterThan(0);
    });

    test.each([
        'movieId',
        'movieTitle',
        'movieGenre',
        'movieReleaseYear',
        'movieDirector',
        'moviePosterUrl',
        'movieSynopsis',
        'movieScore',
        'movieReview',
    ])('every movie should have the field "%s"', (field) => {
        movies.forEach((movie) => {
            expect(movie).toHaveProperty(field);
        });
    });

    test('movieId should be a unique number for each entry', () => {
        const ids = movies.map((m) => m.movieId);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(movies.length);
    });

    test('movieReleaseYear should be a valid year', () => {
        movies.forEach((movie) => {
            expect(typeof movie.movieReleaseYear).toBe('number');
            expect(movie.movieReleaseYear).toBeGreaterThan(1800);
            expect(movie.movieReleaseYear).toBeLessThanOrEqual(new Date().getFullYear());
        });
    });

    test('movieScore should be a number between 0 and 10', () => {
        movies.forEach((movie) => {
            expect(typeof movie.movieScore).toBe('number');
            expect(movie.movieScore).toBeGreaterThanOrEqual(0);
            expect(movie.movieScore).toBeLessThanOrEqual(10);
        });
    });
});