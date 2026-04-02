/**
 * @file book_detail_page.js
 * @description Controller for the book detail page.
 * Reads the book ID from the URL, fetches the data, and renders the full review.
 */

import { fetchBooks } from './data_service.js';

async function initialisePage() {
    const params = new URLSearchParams(window.location.search);
    const bookId = parseInt(params.get('id'));

    const container = document.getElementById('detail_content');

    if (isNaN(bookId)) {
        renderError(container, 'No book ID provided.');
        return;
    }

    const books = await fetchBooks();
    const book = books.find((b) => b.bookId === bookId);

    if (!book) {
        renderError(container, 'Book not found. It may have been removed or the link is incorrect.');
        return;
    }

    renderBook(container, book);
}

function renderBook(container, book) {
    const review = book.bookReview || book.bookDescription;

    container.innerHTML = `
        <div class="detail_layout">

            <div class="detail_poster_column">
                <img
                    src="${book.bookPosterUrl}"
                    alt="${book.bookTitle}"
                    class="detail_poster"
                >
            </div>

            <div class="detail_info_column">
                <p class="detail_category_label">Book Review</p>

                <h1 class="detail_title">${book.bookTitle}</h1>

                <div class="detail_meta_row">
                    <span class="detail_score">⭐ ${book.bookScore}</span>
                    <span class="detail_meta_item">${book.bookGenre}</span>
                    <span class="detail_meta_item">${book.bookPublicationYear}</span>
                </div>

                <p class="detail_director">By ${book.bookAuthor}</p>

                <div class="detail_divider"></div>

                <p class="detail_review">${review}</p>

                <a href="./books.html" class="back_link">← Back to Books</a>
            </div>

        </div>
    `;
}

function renderError(container, message) {
    container.innerHTML = `
        <div class="detail_error">
            <p class="detail_error_message">${message}</p>
            <a href="./books.html" class="back_link">← Back to Books</a>
        </div>
    `;
}

initialisePage();