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
        'bookId', 'bookTitle', 'bookAuthor',
        'bookGenre', 'bookPublicationYear',
        'bookPosterUrl', 'bookDescription',
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

});
