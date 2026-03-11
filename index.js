/**
 * STORYSTREAM ENGINE - SPLASH MODE
 */

const rotationPlatform = document.getElementById('main_category_rotation_platform');
let isBooksActive = false;

// Captura o evento de roda do mouse (ou trackpad)
window.addEventListener('wheel', (event) => {
    // Filtro de sensibilidade para evitar rotações acidentais
    if (Math.abs(event.deltaY) < 15) return;

    if (event.deltaY > 0 && !isBooksActive) {
        // Roda para o verso (Books)
        rotationPlatform.style.transform = 'rotateY(-180deg)';
        isBooksActive = true;
    }
    else if (event.deltaY < 0 && isBooksActive) {
        // Retorna para a frente (Movies)
        rotationPlatform.style.transform = 'rotateY(0deg)';
        isBooksActive = false;
    }
});

// Redirecionamento ao clicar (preparando as próximas telas)
document.getElementById('trigger_movies_page').addEventListener('click', () => {
    window.location.href = 'movies.html';
});

document.getElementById('trigger_books_page').addEventListener('click', () => {
    window.location.href = 'books.html';
});