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
const boxContainer = document.querySelector('.box-container');

let indicatorsContainer = null;
let currentServiceIndex = 0;
const intervalTime = 3000; // Intervalo em milissegundos
let intervalId = null;
let startX = 0;
let endX = 0;

function createIndicators() {
    indicatorsContainer = document.createElement('div');
    indicatorsContainer.style.display = 'flex';
    indicatorsContainer.style.justifyContent = 'center';
    indicatorsContainer.style.marginTop = '10px';
    indicatorsContainer.style.gap = '10px';
    boxContainer.insertAdjacentElement('afterend', indicatorsContainer);

    serviceBoxes.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.style.width = '10px';
        indicator.style.height = '10px';
        indicator.style.backgroundColor = '#ccc';
        indicator.style.borderRadius = '50%';
        indicator.style.cursor = 'pointer';
        indicator.style.transition = 'background-color 0.3s';
        indicator.style.display = 'inline-block';

        if (index === 0) {
            indicator.style.backgroundColor = '#333';
        }

        indicator.addEventListener('click', () => {
            currentServiceIndex = index;
            updateSlide();
            resetAutoSlide();
        });

        indicatorsContainer.appendChild(indicator);
    });
}

function updateSlide() {
    serviceBoxes.forEach(box => box.classList.remove('active'));
    const indicators = indicatorsContainer.children;
    Array.from(indicators).forEach(indicator => indicator.style.backgroundColor = '#ccc');
    indicators[currentServiceIndex].style.backgroundColor = '#333';

    const offset = -currentServiceIndex * 100;
    boxContainer.style.transform = `translateX(${offset}%)`;
    boxContainer.style.transition = 'transform 0.5s ease-in-out';
}

function startAutoSlide() {
    intervalId = setInterval(() => {
        currentServiceIndex = (currentServiceIndex + 1) % serviceBoxes.length;
        updateSlide();
    }, intervalTime);
}

function stopAutoSlide() {
    clearInterval(intervalId);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

function handleSwipe() {
    if (startX > endX + 50) { // Swipe para a esquerda
        currentServiceIndex = (currentServiceIndex + 1) % serviceBoxes.length;
    } else if (startX < endX - 50) { // Swipe para a direita
        currentServiceIndex = (currentServiceIndex - 1 + serviceBoxes.length) % serviceBoxes.length;
    }
    updateSlide();
    resetAutoSlide(); // Reinicia o slide automático
}

function enableSlide() {
    if (!indicatorsContainer) {
        createIndicators(); // Cria os indicadores se não existirem
    }
    updateSlide();
    startAutoSlide(); // Começa o slide automático

    // Adiciona suporte para o toque (swipe)
    boxContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX; // Posição inicial
        stopAutoSlide(); // Para o slide automático
    });

    boxContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX; // Posição final
        handleSwipe(); // Lógica do swipe
    });
}

function disableSlide() {
    stopAutoSlide(); // Para o slide automático
    if (indicatorsContainer) {
        indicatorsContainer.remove(); // Remove os indicadores
        indicatorsContainer = null;
    }
    boxContainer.style.transform = ''; // Restaura a posição original do container
}

function handleResize() {
    if (window.matchMedia('(max-width: 500px)').matches) {
        enableSlide();
    } else {
        disableSlide();
    }
}

// Inicializa a configuração e verifica o tamanho da tela
handleResize();
window.addEventListener('resize', handleResize);



// Função para verificar se o elemento está visível no viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

// Seleciona todas as caixas com a classe "service-box" e "turnkey"
const serviceBoxs = document.querySelectorAll('.service-box, .turnkey');

// Função para definir a velocidade da transição (caso queira personalizar)
function setTransitionSpeed(element, scaleSpeed, transformSpeed) {
    element.style.transition = `transform ${scaleSpeed}s ease, opacity ${transformSpeed}s ease`; // Aplica transições separadas
}

// Função para verificar se o dispositivo é desktop
function isDesktop() {
    return window.matchMedia("(min-width: 501px)").matches;
}

// Adiciona um evento de scroll na janela
window.addEventListener('scroll', () => {
    if (isDesktop()) { // Verifica se a tela é desktop (largura > 500px)
        serviceBoxs.forEach((box) => {
            if (isInViewport(box)) {
                box.classList.add('visible'); // Adiciona a classe quando o elemento entra no viewport
                setTransitionSpeed(box, 0.3, 5); // Define os tempos das transições (0.3s para escala, 5s para translateY)
            }
        });
    }
});