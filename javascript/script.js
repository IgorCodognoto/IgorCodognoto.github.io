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


document.addEventListener("DOMContentLoaded", () => {
    const serviceBoxes = document.querySelectorAll(".service-box");
    const boxContainer = document.querySelector(".box-container");
    let currentServiceIndex = 0;
    const intervalTime = 3000; // Tempo de intervalo em milissegundos
    let intervalId;

    // Cria os indicadores dinamicamente
    function createIndicators() {
        const indicatorsContainer = document.createElement("div");
        indicatorsContainer.className = "indicators";

        serviceBoxes.forEach((_, index) => {
            const indicator = document.createElement("span");
            indicator.className = "indicator";
            if (index === 0) indicator.classList.add("active"); // Primeiro ativo por padrão
            indicatorsContainer.appendChild(indicator);
        });

        boxContainer.insertAdjacentElement("afterend", indicatorsContainer);
    }

    // Atualiza o slide e os indicadores
    function updateSlide() {
        serviceBoxes.forEach((box) => box.classList.remove("active"));
        document
            .querySelectorAll(".indicator")
            .forEach((indicator) => indicator.classList.remove("active"));

        serviceBoxes[currentServiceIndex].classList.add("active");
        document
            .querySelectorAll(".indicator")[currentServiceIndex]
            .classList.add("active");

        const offset = -currentServiceIndex * 100; // Desloca o container
        boxContainer.style.transform = `translateX(${offset}%)`;
    }

    // Inicia o slide automático
    function startAutoSlide() {
        intervalId = setInterval(() => {
            currentServiceIndex = (currentServiceIndex + 1) % serviceBoxes.length;
            updateSlide();
        }, intervalTime);
    }

    // Para o slide automático
    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    // Muda para um slide específico ao clicar nos indicadores
    function handleIndicatorClick() {
        document.querySelectorAll(".indicator").forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                stopAutoSlide(); // Para o slide automático ao clicar
                currentServiceIndex = index;
                updateSlide();
                startAutoSlide(); // Reinicia o slide automático
            });
        });
    }

    // Inicia o slide apenas para telas menores ou iguais a 500px
    if (window.matchMedia("(max-width: 500px)").matches) {
        createIndicators(); // Cria os indicadores
        updateSlide(); // Atualiza o slide inicialmente
        startAutoSlide(); // Inicia o slide automático
        handleIndicatorClick(); // Adiciona o evento de clique nos indicadores
    }
});



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