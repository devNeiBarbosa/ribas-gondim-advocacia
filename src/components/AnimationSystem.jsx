// AnimationSystem.js
// Este arquivo deve ser importado no seu index.js ou App.js principal

// Configuração da animação de entrada para componentes
document.addEventListener('DOMContentLoaded', function() {
  // Adicionar estilos para as animações se ainda não existirem
  if (!document.getElementById('animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'animation-styles';
    styleSheet.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animated-element {
        opacity: 0;
      }
      
      .animated-element.visible {
        animation: fadeIn 0.4s ease-out forwards;
      }
    `;
    document.head.appendChild(styleSheet);
  }

  // Observer para detectar elementos entrando na viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Se o elemento é visível na viewport
      if (entry.isIntersecting) {
        // Adiciona classe para animar
        entry.target.classList.add('visible');
        // Para de observar o elemento após a animação
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1  // O elemento é considerado visível quando 10% dele está na viewport
  });

  // Função para adicionar animações a elementos
  function setupAnimations() {
    // Selecionando elementos para animar
    const elements = [
      // Header e navegação
      ...document.querySelectorAll('.secoes ul li'),
      
      // Home
      ...document.querySelectorAll('.infos-principais h2, .infos-principais p, .infos-principais button'),
      
      // Áreas de atuação
      ...document.querySelectorAll('.area-heading, .area-description, .carousel-item'),
      
      // O escritório
      ...document.querySelectorAll('.o-escritorio, .sobre-nos, .experiencia, .experiencia-text'),
      
      // Equipe
      ...document.querySelectorAll('.tilte-info, .text-info, .team-info-people > div, .button-agendamento'),
      
      // Links
      ...document.querySelectorAll('.title-links h2, .title-links p, .list-one li, .list-two li'),
      
      // Contato
      ...document.querySelectorAll('.forms h2, .forms div, .forms button, .container-mid h2, .info-contact, .container-right .icons-name'),
      
      // Footer
      ...document.querySelectorAll('.footer-links h4, .footer-links ul li, .footer-informacoes h4, .footer-informacoes p, .social-icon, .footer-logo')
    ];
    
    // Configurando cada elemento para animação
    elements.forEach((element, index) => {
      if (element) {
        element.classList.add('animated-element');
        
        // Atraso crescente para criar efeito em cascata
        element.style.animationDelay = `${index * 0.1}s`;
        
        // Iniciar observação do elemento
        observer.observe(element);
      }
    });
  }

  // Primeira execução após o carregamento da página
  setupAnimations();
  
  // Reexecutar quando componentes React montarem/atualizarem
  // Usar um MutationObserver para detectar mudanças na DOM
  const bodyObserver = new MutationObserver(() => {
    setTimeout(setupAnimations, 500); // Pequeno atraso para garantir que os componentes React estejam totalmente renderizados
  });
  
  bodyObserver.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
});