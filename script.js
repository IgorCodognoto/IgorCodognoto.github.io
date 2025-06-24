document.addEventListener('DOMContentLoaded', function() {
  // Menu Hamburguer
  const menuToggle = document.querySelector('.menu-toggle');
  const terminalNav = document.querySelector('.terminal-nav');
  
  // Alternar menu
  menuToggle.addEventListener('click', function() {
    terminalNav.classList.toggle('active');
    menuToggle.textContent = terminalNav.classList.contains('active') ? '✕' : '☰';
  });
  
  // Fechar menu ao clicar em um link
  document.querySelectorAll('.terminal-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        terminalNav.classList.remove('active');
        menuToggle.textContent = '☰';
      }
    });
  });

  // Efeito Matrix
  function createMatrixEffect(elementId, color = '#00F0FF') {
    if (!document.getElementById(elementId)) return;
    
    const canvas = document.createElement('canvas');
    const container = document.getElementById(elementId);
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const fontSize = 14;
    let columns = 0;
    const rainDrops = [];
    
    function init() {
      resizeCanvas();
      columns = Math.floor(canvas.width / fontSize);
      
      for (let x = 0; x < columns; x++) {
        rainDrops[x] = Math.floor(Math.random() * -100);
      }
    }
    
    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;
        
        ctx.fillText(text, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    }
    
    init();
    const interval = setInterval(draw, 33);
    
    window.addEventListener('resize', init);
    
    return interval;
  }

  // Iniciar efeitos
  createMatrixEffect('matrix-header', '#BC00FF');
  createMatrixEffect('matrix-projects', '#00F0FF');
  createMatrixEffect('matrix-about', '#FF00A8');

  // Efeito de digitação
  const heroText = document.querySelector('.typing-text');
  const phrases = [
    "Códigos que brilham no escuro.",
    "Transformando códigos em experiências digitais.",
    "Sites que impressionam."
  ];
  let currentPhrase = 0;

  function typeWriter(text, element, speed = 100) {
    let i = 0;
    element.textContent = '';
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
        setTimeout(eraseText, 2000);
      }
    }, speed);
  }

  function eraseText() {
    const erase = setInterval(() => {
      if (heroText.textContent.length > 0) {
        heroText.textContent = heroText.textContent.slice(0, -1);
      } else {
        clearInterval(erase);
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typeWriter(phrases[currentPhrase], heroText);
      }
    }, 50);
  }

  typeWriter(phrases[0], heroText);

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Efeito hover nos cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const projectImage = card.querySelector('.project-image');
    const color = projectImage.style.backgroundColor;
    
    // Armazena a cor como propriedade CSS personalizada
    card.style.setProperty('--card-color', color);
    
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = `0 0 30px ${color}`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = 'none';
    });
  });
});