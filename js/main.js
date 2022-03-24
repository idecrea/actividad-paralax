// Variables
const stars = document.querySelector('#stars');
const limitStars = 200;
const heightPage = document.body.scrollHeight;
const widthPage = document.body.scrollWidth;
const scrollMessages = [
    {
        min: 100,
        max: 500,
        selector: '#primer-mensaje'
    },
    {
        min: 800,
        max: 1000,
        selector: '#segundo-mensaje'
    },
    {
        min: heightPage - 1000,
        max: heightPage,
        selector: '#tercer-mensaje'
    }
];

// Funciones

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function toggleMessagesScroll(posY) {
    // Iteramos los elementos
    scrollMessages.forEach((item) => {
        // Comprobamos si el elemento se encuentra en el rango de posY a mostrar
        if (item.min <= posY && posY <=  item.max) {
            document.querySelector(item.selector).classList.add('show');
        } else {
            document.querySelector(item.selector).classList.remove('show');
        }
    })
}

// Generamos estrellas en posiciones aleatorias
Array(limitStars).fill().forEach(() => {
    const newStar = document.createElement('div');
    const velocidad = getRandomArbitrary(0.2, 0.8).toFixed(1);
    newStar.style.top = `${getRandomArbitrary(0, heightPage)}px`;
    newStar.style.left = `${getRandomArbitrary(0, widthPage)}px`;
    newStar.dataset.velocidad = velocidad
    newStar.style.transform = `scale(${-velocidad})`;
    newStar.classList.add('star');
    stars.appendChild(newStar);
});
const allStars = document.querySelectorAll('.star');

// Eventos
document.addEventListener('scroll', () => {
    const positionYScroll = window.scrollY;
    toggleMessagesScroll(positionYScroll);
    allStars.forEach((star) => {
        window.requestAnimationFrame(() => {
            star.style.transform = `translateY(${star.dataset.velocidad * positionYScroll}px) scale(${-star.dataset.velocidad})`;
            star.style.opacity = `${star.dataset.velocidad}`;
        });
    })
})