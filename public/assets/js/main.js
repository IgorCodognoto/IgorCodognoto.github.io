$(document).ready(function () {
  // Abre o menu mobile
  $('#menu-toggle').click(function () {
      $('#mobile-menu').addClass('open');
  });

  // Fecha o menu mobile
  $('#menu-close').click(function () {
      $('#mobile-menu').removeClass('open');
  });
});

$(document).ready(function () {
  // Inicializando o Slick para o slide no mobile
  $('.valores-slider').slick({
    autoplay: true, // Slide automático
    autoplaySpeed: 2000, // Tempo entre os slides (em milissegundos)
    arrows: false, // Ativa as setas de navegação
    dots: false, // Desativa os pontos
    infinite: true, // Permite o loop dos slides
    speed: 500, // Velocidade de transição
  });
});


$(document).ready(function () {
  $('.slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    focusOnSelect: true,
    arrows: true, // Deixe as setas visíveis no desktop
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="../public/assets/imagens/icons8-flecha-100-esquerda.png" alt="Voltar"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="../public/assets/imagens/icons8-flecha-100-direita.png" alt="Avançar"></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: '10px',
          arrows: false, // Remove as setas no mobile
        },
      },
    ],
  });
});