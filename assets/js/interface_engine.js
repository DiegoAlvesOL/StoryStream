/**
 * @file interface_engine.js
 * @description Rendering layer responsible for building and injecting
 * HTML card elements into the DOM from data arrays.
 */

/**
 * Renders a list of movie cards into the given container.
 * @param {Array} movies - Array of movie objects from data_service.
 * @param {HTMLElement} container - The DOM element to render cards into.
 */
export function renderMovieCards(movies, container) {

    // Always clear the container before rendering
    // to avoid duplicate cards on re-renders
    container.innerHTML = '';

    movies.forEach((movie) => {

        //Card wrapper
        const card = document.createElement('article');
        card.classList.add('media_card');

        //Poster image
        const poster = document.createElement('img');
        poster.src = movie.moviePosterUrl;
        poster.alt = movie.movieTitle;
        poster.classList.add('media_card_poster');

        //Title
        const title = document.createElement('h2');
        title.textContent = movie.movieTitle;
        title.classList.add('media_card_title');

        //Meta info (genre + year)
        const meta = document.createElement('p');
        meta.textContent = `${movie.movieGenre} · ${movie.movieReleaseYear}`;
        meta.classList.add('media_card_meta');

        //Director
        const director = document.createElement('p');
        director.textContent = `Directed by ${movie.movieDirector}`;
        director.classList.add('media_card_director');

        //Read Review button
        const button = document.createElement('a');
        button.href = `movie-detail.html?id=${movie.movieId}`;
        button.textContent = 'Read Review';
        button.classList.add('media_card_button');

        //Assemble the card
        card.appendChild(poster);
        card.appendChild(title);
        card.appendChild(meta);
        card.appendChild(director);
        card.appendChild(button);

        //Inject into container
        container.appendChild(card);
    });
}

/**
 * Renders a list of book cards into the given container.
 * @param {Array} books - Array of book objects from data_service.
 * @param {HTMLElement} container - The DOM element to render cards into.
 */
export function renderBookCards(books, container) {

    container.innerHTML = '';

    books.forEach((book) => {

        //Card wrapper
        const card = document.createElement('article');
        card.classList.add('media_card');

        //Cover image
        const cover = document.createElement('img');
        cover.src = book.bookPosterUrl;
        cover.alt = book.bookTitle;
        cover.classList.add('media_card_poster');

        // Title
        const title = document.createElement('h2');
        title.textContent = book.bookTitle;
        title.classList.add('media_card_title');

        //Meta info (genre + year)
        const meta = document.createElement('p');
        meta.textContent = `${book.bookGenre} · ${book.bookPublicationYear}`;
        meta.classList.add('media_card_meta');

        //Author
        const author = document.createElement('p');
        author.textContent = `By ${book.bookAuthor}`;
        author.classList.add('media_card_director');

        //Read Review button
        const button = document.createElement('a');
        button.href = `book-detail.html?id=${book.bookId}`;
        button.textContent = 'Read Review';
        button.classList.add('media_card_button');

        //Assemble the card
        card.appendChild(cover);
        card.appendChild(title);
        card.appendChild(meta);
        card.appendChild(author);
        card.appendChild(button);

        //Inject into container
        container.appendChild(card);
    });
}