/**
 * @file interface_engine.test.js
 * @description Tests for the renderSection function in interface_engine.js.
 * Verifies that book cards generate the correct detail page link.
 * Consumed by: Jest test runner
 */

import { renderSection } from '../assets/js/interface_engine.js';

describe('renderSection — book card link', () => {

    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    test('book card should contain a link to the correct detail page using bookId', () => {
        const fakeBook = {
            bookId: 42,
            bookTitle: 'Test Book',
            bookAuthor: 'Test Author',
            bookGenre: 'Fiction',
            bookPublicationYear: 2020,
            bookPosterUrl: 'https://example.com/cover.jpg',
            bookScore: 8.5,
        };

        renderSection(container, 'Test Section', [fakeBook], 'book');

        const link = container.querySelector('.media_card_button');

        expect(link).not.toBeNull();
        expect(link.getAttribute('href')).toBe('book-detail.html?id=42');
    });

});