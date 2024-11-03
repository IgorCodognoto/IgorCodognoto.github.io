function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    
    document.getElementById('current-time').textContent = `Hora: ${currentTime}`;
}

// Atualiza a hora a cada minuto
setInterval(updateTime, 60000);

// Chama a função ao carregar a página
updateTime();

const images = document.querySelectorAll('.carousel img');

if (images.length > 0) { // Verifica se há imagens no carrossel
    let currentIndex = 0;
    const totalImages = images.length;

    function showNextImage() {
        // Remove a classe 'active' da imagem atual
        images[currentIndex].classList.remove('active');

        // Avança para a próxima imagem
        currentIndex = (currentIndex + 1) % totalImages; // Volta ao início se passar do total

        // Adiciona a classe 'active' na nova imagem
        images[currentIndex].classList.add('active');
    }

    // Inicializa a primeira imagem como ativa
    images[currentIndex].classList.add('active');

    // Muda a imagem a cada 5 segundos
    setInterval(showNextImage, 5000);
}

// Alterna a visibilidade do menu ao clicar no ícone hamburguer
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) { // Verifica se os elementos existem
    menuToggle.addEventListener("click", function () {
        mobileMenu.classList.toggle("show");
    });
}





const serviceBoxes = document.querySelectorAll('.service-box');
let currentServiceIndex = 0; // Índice atual da box
const intervalTime = 3000; // Tempo de intervalo em milissegundos
let intervalId; // ID do intervalo

function updateSlide() {
    // Remove a classe 'active' de todas as boxes
    serviceBoxes.forEach(box => box.classList.remove('active'));
    // Adiciona a classe 'active' à box atual
    serviceBoxes[currentServiceIndex].classList.add('active');

    // Move a box-container para a posição correta
    const offset = -currentServiceIndex * 100; // Calcula o deslocamento
    document.querySelector('.box-container').style.transform = `translateX(${offset}%)`;
}

function startAutoSlide() {
    // Verifica se a largura da tela é menor ou igual a 500px
    if (window.matchMedia("(max-width: 500px)").matches) {
        intervalId = setInterval(() => {
            currentServiceIndex = (currentServiceIndex + 1) % serviceBoxes.length; // Incrementa o índice
            updateSlide();
        }, intervalTime);
    }
}

function stopAutoSlide() {
    clearInterval(intervalId); // Para o intervalo de mudança automática
}

// Adicionando eventos de toque para permitir o deslizar
let startX = 0;
let endX = 0;

document.querySelector('.box-container').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Posição inicial do toque
    stopAutoSlide(); // Para a mudança automática ao tocar
});

document.querySelector('.box-container').addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX; // Posição final do toque
    handleSwipe();
    startAutoSlide(); // Reinicia a mudança automática após o toque
});

function handleSwipe() {
    if (startX > endX + 50) { // Swipe para a esquerda
        currentServiceIndex = (currentServiceIndex + 1) % serviceBoxes.length; // Incrementa o índice
        updateSlide();
    } else if (startX < endX - 50) { // Swipe para a direita
        currentServiceIndex = (currentServiceIndex - 1 + serviceBoxes.length) % serviceBoxes.length; // Decrementa o índice
        updateSlide();
    }
}

// Atualiza a exibição inicial e inicia o slide automático
updateSlide();
startAutoSlide();

// Adiciona um listener para verificar o tamanho da tela em redimensionamentos
window.addEventListener('resize', () => {
    stopAutoSlide(); // Para o slide automático ao redimensionar
    startAutoSlide(); // Reinicia o slide automático se estiver em uma tela pequena
});