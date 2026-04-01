const container = document.getElementById('results_container');

export function renderMovies(movies, selectedGenre) {
    container.innerHTML = "";

    const filtered = selectedGenre === "all"
        ? movies
        : movies.filter(m => m.movieGenre === selectedGenre);

    filtered.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${movie.moviePosterUrl}">
            <h3>${movie.movieTitle}</h3>
            <p>${movie.movieGenre} (${movie.movieReleaseYear})</p>
        `;

        card.onclick = () => {
            window.openDetail({
                title: movie.movieTitle,
                image: movie.moviePosterUrl,
                info: `${movie.movieGenre} (${movie.movieReleaseYear})`,
                description: movie.movieSynopsis || "No description available"
            });
        };

        // 🔥 SAFE 3D EFFECT
        card.addEventListener("mousemove", (e) => {
            if (e.buttons) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = -(y / rect.height - 0.5) * 8;
            const rotateY = (x / rect.width - 0.5) * 8;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0) rotateY(0) scale(1)";
        });

        container.appendChild(card);
    });
}

export function renderBooks(books, selectedGenre) {
    container.innerHTML = "";

    const filtered = selectedGenre === "all"
        ? books
        : books.filter(b => b.bookGenre === selectedGenre);

    filtered.forEach(book => {
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${book.bookPosterUrl}">
            <h3>${book.bookTitle}</h3>
            <p>${book.bookGenre} (${book.bookPublicationYear})</p>
        `;

        card.onclick = () => {
            window.openDetail({
                title: book.bookTitle,
                image: book.bookPosterUrl,
                info: `${book.bookGenre} (${book.bookPublicationYear})`,
                description: book.bookDescription || "No description available"
            });
        };

        card.addEventListener("mousemove", (e) => {
            if (e.buttons) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = -(y / rect.height - 0.5) * 8;
            const rotateY = (x / rect.width - 0.5) * 8;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0) rotateY(0) scale(1)";
        });

        container.appendChild(card);
    });
}