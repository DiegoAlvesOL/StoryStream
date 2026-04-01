import { fetchMovies, fetchBooks } from './assets/js/data_service.js';
import { renderMovies, renderBooks } from './assets/js/interface_engine.js';

const rotationPlatform = document.getElementById('main_category_rotation_platform');
const contentSection = document.getElementById('content_section');
const detailSection = document.getElementById('detail_section');

const sectionTitle = document.getElementById('section_title');
const genreSelect = document.getElementById('genre_select');
const recommendBtn = document.getElementById('recommend_btn');
const backBtn = document.getElementById('back_btn');

let isBooksActive = false;
let isInContent = false;

let currentMode = null;
let moviesData = [];
let booksData = [];

/* ROTATION */
window.addEventListener('wheel', (e) => {
    if (isInContent) return;

    if (e.deltaY > 0 && !isBooksActive) {
        rotationPlatform.style.transform = 'rotateY(180deg)';
        isBooksActive = true;
    } 
    else if (e.deltaY < 0 && isBooksActive) {
        rotationPlatform.style.transform = 'rotateY(0deg)';
        isBooksActive = false;
    }
});

/* MOVIES */
document.getElementById('trigger_movies_page').onclick = async () => {
    currentMode = "movies";
    isInContent = true;

    rotationPlatform.style.display = 'none';
    contentSection.style.display = 'flex';

    sectionTitle.innerText = 'Movies';

    if (!moviesData.length) moviesData = await fetchMovies();

    populateGenres([...new Set(moviesData.map(m => m.movieGenre))]);
    renderMovies(moviesData, "all");
};

/* BOOKS */
document.getElementById('trigger_books_page').onclick = async () => {
    currentMode = "books";
    isInContent = true;

    rotationPlatform.style.display = 'none';
    contentSection.style.display = 'flex';

    sectionTitle.innerText = 'Books';

    if (!booksData.length) booksData = await fetchBooks();

    populateGenres([...new Set(booksData.map(b => b.bookGenre))]);
    renderBooks(booksData, "all");
};

/* FILTER */
recommendBtn.onclick = () => {
    if (currentMode === "movies") renderMovies(moviesData, genreSelect.value);
    else renderBooks(booksData, genreSelect.value);
};

/* BACK */
backBtn.onclick = () => {
    contentSection.style.display = 'none';
    rotationPlatform.style.display = 'block';
    isInContent = false;
    rotationPlatform.style.transform = 'rotateY(0deg)';
};

/* DETAIL */
window.openDetail = function(item) {

    contentSection.style.display = "none";
    detailSection.style.display = "flex";
    detailSection.classList.add("fade-in");

    document.getElementById("detail_title").innerText = item.title;
    document.getElementById("detail_image").src = item.image;
    document.getElementById("detail_info").innerText = item.info;
    document.getElementById("detail_description").innerText = item.description;

    detailSection.style.setProperty("--bg-image", `url(${item.image})`);

    renderRating(item.title);
};

/* BACK DETAIL */
document.getElementById("back_from_detail").onclick = () => {
    detailSection.style.display = "none";
    contentSection.style.display = "flex";
};

/* GENRES */
function populateGenres(genres) {
    genreSelect.innerHTML = '<option value="all">All Genres</option>';
    genres.forEach(g => {
        const opt = document.createElement("option");
        opt.value = g;
        opt.textContent = g;
        genreSelect.appendChild(opt);
    });
}

/* ⭐ RATING FINAL FIX */
function renderRating(id) {

    const container = document.getElementById("rating_container");
    container.innerHTML = "";

    let saved = parseInt(localStorage.getItem(id)) || 0;

    for (let i = 1; i <= 5; i++) {

        const star = document.createElement("span");
        star.textContent = "★";

        if (i <= saved) star.classList.add("star-active");

        star.addEventListener("mouseover", () => highlight(i));
        star.addEventListener("mouseout", () => resetStars(saved));

        star.addEventListener("click", () => {
            localStorage.setItem(id, i);
            renderRating(id);
        });

        container.appendChild(star);
    }
}

function highlight(count) {
    const stars = document.querySelectorAll("#rating_container span");
    stars.forEach((s, i) => {
        s.style.color = i < count ? "#d4af37" : "#555";
    });
}

function resetStars(saved) {
    const stars = document.querySelectorAll("#rating_container span");
    stars.forEach((s, i) => {
        s.style.color = i < saved ? "#d4af37" : "#555";
    });
}

/* CURSOR GLOW */
document.addEventListener("mousemove", (e) => {
    document.body.style.setProperty("--x", e.clientX + "px");
    document.body.style.setProperty("--y", e.clientY + "px");
});