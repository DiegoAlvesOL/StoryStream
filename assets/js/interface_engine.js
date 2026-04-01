/**
 * @file interface_engine.js
 * @description Rendering layer. Builds and injects sections and cards into the DOM.
 */

/**
 * Creates a labelled carousel section and appends it to the page container.
 * @param {HTMLElement} pageContainer - The parent element to append the section to.
 * @param {string} title - The section heading text.
 * @param {Array} items - Array of movie or book objects.
 * @param {string} type - 'movie' or 'book'.
 */
export function renderSection(pageContainer, title, items, type) {
    if (items.length === 0) return;

    const section = document.createElement('section');
    section.classList.add('content_section');

    const heading = document.createElement('h2');
    heading.classList.add('section_title');
    heading.textContent = title;

    const track = document.createElement('div');
    track.classList.add('carousel_track');

    items.forEach((item) => {
        const card = type === 'movie' ? buildMovieCard(item) : buildBookCard(item);
        track.appendChild(card);
    });

    section.appendChild(heading);
    section.appendChild(track);
    pageContainer.appendChild(section);
}

function buildMovieCard(movie) {
    const card = document.createElement('article');
    card.classList.add('media_card');

    const poster = document.createElement('img');
    poster.src = movie.moviePosterUrl;
    poster.alt = movie.movieTitle;
    poster.classList.add('media_card_poster');

    const info = document.createElement('div');
    info.classList.add('media_card_info');

    const score = document.createElement('p');
    score.textContent = `⭐ ${movie.movieScore}`;
    score.classList.add('media_card_score');

    const title = document.createElement('h2');
    title.textContent = movie.movieTitle;
    title.classList.add('media_card_title');

    const meta = document.createElement('p');
    meta.textContent = `${movie.movieGenre} · ${movie.movieReleaseYear}`;
    meta.classList.add('media_card_meta');

    const director = document.createElement('p');
    director.textContent = `Directed by ${movie.movieDirector}`;
    director.classList.add('media_card_director');

    const button = document.createElement('a');
    button.href = `movie-detail.html?id=${movie.movieId}`;
    button.textContent = 'Read Review';
    button.classList.add('media_card_button');

    info.appendChild(score);
    info.appendChild(title);
    info.appendChild(meta);
    info.appendChild(director);
    info.appendChild(button);

    card.appendChild(poster);
    card.appendChild(info);

    return card;
}

function buildBookCard(book) {
    const card = document.createElement('article');
    card.classList.add('media_card');

    const cover = document.createElement('img');
    cover.src = book.bookPosterUrl;
    cover.alt = book.bookTitle;
    cover.classList.add('media_card_poster');

    const info = document.createElement('div');
    info.classList.add('media_card_info');

    const score = document.createElement('p');
    score.textContent = `⭐ ${book.bookScore}`;
    score.classList.add('media_card_score');

    const title = document.createElement('h2');
    title.textContent = book.bookTitle;
    title.classList.add('media_card_title');

    const meta = document.createElement('p');
    meta.textContent = `${book.bookGenre} · ${book.bookPublicationYear}`;
    meta.classList.add('media_card_meta');

    const author = document.createElement('p');
    author.textContent = `By ${book.bookAuthor}`;
    author.classList.add('media_card_director');

    const button = document.createElement('a');
    button.href = `book-detail.html?id=${book.bookId}`;
    button.textContent = 'Read Review';
    button.classList.add('media_card_button');

    info.appendChild(score);
    info.appendChild(title);
    info.appendChild(meta);
    info.appendChild(author);
    info.appendChild(button);

    card.appendChild(cover);
    card.appendChild(info);

    return card;
}