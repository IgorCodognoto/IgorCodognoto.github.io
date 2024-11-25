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

let indicatorsContainer = null; // Container dos indicadores
let currentServiceIndex = 0;
const intervalTime = 3000;
let intervalId = null;

// Função para criar indicadores
function createIndicators() {
    indicatorsContainer = document.createElement('div');
    indicatorsContainer.style.display = 'flex';
    indicatorsContainer.style.justifyContent = 'center';
    indicatorsContainer.style.marginTop = '10px';
    indicatorsContainer.style.gap = '10px';
    indicatorsContainer.style.position = 'relative'; // Garante o alinhamento adequado
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

// Função para atualizar o slide
function updateSlide() {
    serviceBoxes.forEach(box => box.classList.remove('active'));
    const indicators = indicatorsContainer.children;
    Array.from(indicators).forEach(indicator => indicator.style.backgroundColor = '#ccc');
    indicators[currentServiceIndex].style.backgroundColor = '#333';

    const offset = -currentServiceIndex * 100;
    boxContainer.style.transform = `translateX(${offset}%)`;
    boxContainer.style.transition = 'transform 0.5s ease-in-out';
}

// Função para iniciar o slide automático
function startAutoSlide() {
    intervalId = setInterval(() => {
        currentServiceIndex = (currentServiceIndex + 1) % serviceBoxes.length;
        updateSlide();
    }, intervalTime);
}

// Função para parar o slide automático
function stopAutoSlide() {
    clearInterval(intervalId);
}

// Função para reiniciar o slide automático
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Função para habilitar o slide
function enableSlide() {
    if (!indicatorsContainer) {
        createIndicators(); // Cria os indicadores apenas se ainda não foram criados
    }
    updateSlide();
    startAutoSlide();

    // Adiciona suporte ao swipe
    let startX = 0;
    let endX = 0;

    boxContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });

    boxContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) {
            currentServiceIndex = (currentServiceIndex + 1) % serviceBoxes.length;
        } else if (startX < endX - 50) {
            currentServiceIndex = (currentServiceIndex - 1 + serviceBoxes.length) % serviceBoxes.length;
        }
        updateSlide();
        resetAutoSlide();
    });
}

// Função para desabilitar o slide
function disableSlide() {
    stopAutoSlide(); // Para o slide automático
    if (indicatorsContainer) {
        indicatorsContainer.remove(); // Remove os indicadores
        indicatorsContainer = null;
    }
    boxContainer.style.transform = ''; // Restaura a posição original do container
}

// Monitorar o tamanho da janela
function handleResize() {
    if (window.matchMedia('(max-width: 500px)').matches) {
        enableSlide();
    } else {
        disableSlide();
    }
}

// Configuração inicial e listener de redimensionamento
handleResize();
window.addEventListener('resize', handleResize);

// Função para verificar se o elemento está visível no viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
  
  // Seleciona todas as caixas com a classe "service-box"
  const serviceBoxs = document.querySelectorAll('.service-box, .turnkey');
  
  // Função para definir a velocidade da transição (caso queira personalizar)
  function setTransitionSpeed(element, scaleSpeed, transformSpeed) {
    element.style.transition = `transform ${scaleSpeed}s ease, opacity ${transformSpeed}s ease`; // Aplica transições separadas
  }
  
  // Adiciona um evento de scroll na janela
  window.addEventListener('scroll', () => {
    serviceBoxs.forEach((box) => {
      if (isInViewport(box)) {
        box.classList.add('visible'); // Adiciona a classe quando o elemento entra no viewport
        setTransitionSpeed(box, 0.3, 5); // Define os tempos das transições (0.3s para escala, 2s para translateY)
      }
    });
  });