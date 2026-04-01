// MOVIES
export async function fetchMovies() {
    const response = await fetch('./assets/data/movies_database.json');
    const data = await response.json();
    return data;
}

// BOOKS
export async function fetchBooks() {
    const response = await fetch('./assets/data/books_database.json');
    const data = await response.json();
    return data;
}