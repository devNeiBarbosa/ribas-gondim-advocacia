import React, { useState, useEffect, useRef } from "react";
import '../styles/AreasOfActivity.css';

const Areas = () => {
  const areas = [
    {
      title: "Direito Civil",
      description: "Regula relações jurídicas entre pessoas, tratando de contratos, obrigações, direitos reais e responsabilidades civis.",
      buttonText: "SAIBA MAIS"
    },
    {
      title: "Direito Criminal",
      description: "Define crimes, penas e medidas de segurança, visando proteger a ordem pública e garantir a justiça na sociedade.",
      buttonText: "SAIBA MAIS"
    },
    {
      title: "Direito do Trabalho",
      description: "Regula vínculos empregatícios, assegurando direitos como salário, férias, jornada, demissão e condições de trabalho.",
      buttonText: "SAIBA MAIS"
    },
    {
      title: "Direito Imobiliário",
      description: "Regula questões relacionadas a imóveis, como compra, venda, locação e regularização de propriedades.",
      buttonText: "SAIBA MAIS"
    },
    {
      title: "Direito de Família",
      description: "Rege as relações familiares, abrangendo casamento, divórcio, guarda, tutela e pensão alimentícia entre parentes.",
      buttonText: "SAIBA MAIS"
    },
    {
      title: "Direito do Consumidor",
      description: "Protege os direitos do consumidor em contratos e compras, garantindo segurança e reparação em relações de consumo.",
      buttonText: "SAIBA MAIS"
    },
    {
      title: "Direito Administrativo",
      description: "Regula a organização, funcionamento e controle da administração pública, incluindo servidores e licitações públicas.",
      buttonText: "SAIBA MAIS"
    },
    {
      title: "Direito Previdenciário",
      description: "Trata dos benefícios da seguridade social, como aposentadoria, auxílio-doença e pensão conforme regras do INSS.",
      buttonText: "SAIBA MAIS"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [startX, setStartX] = useState(0);

  const carouselRef = useRef(null);
  const itemsToShow = 3;
  const minSwipeDistance = 50;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateVisibleItems = () => {
      const items = [];
      for (let i = 0; i < itemsToShow; i++) {
        const index = (currentIndex + i) % areas.length;
        items.push(areas[index]);
      }
      setVisibleItems(items);
    };

    updateVisibleItems();

    if (!isMobile && !isDragging) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % areas.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, areas.length, isMobile, isDragging]);

  const handleDotClick = (index) => setCurrentIndex(index);
  const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % areas.length);
  const handlePrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + areas.length) % areas.length);

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setStartX(e.targetTouches[0].clientX);
    setIsDragging(true);
    if (carouselRef.current) {
      carouselRef.current.classList.add('dragging');
    }
  };

  const handleTouchMove = (e) => {
    if (!isMobile || !touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    const diff = currentTouch - startX;
    const maxTranslate = 100;
    const limitedDiff = Math.max(-maxTranslate, Math.min(maxTranslate, diff));
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${limitedDiff}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) {
      resetDrag();
      return;
    }
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    else if (distance < -minSwipeDistance) handlePrev();
    resetDrag();
  };

  const resetDrag = () => {
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
    setStartX(0);
    if (carouselRef.current) {
      carouselRef.current.classList.remove('dragging');
      carouselRef.current.classList.add('resetting');
      carouselRef.current.style.transform = '';
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.classList.remove('resetting');
        }
      }, 400);
    }
  };

  const handleTouchStartCapture = (e) => {
    if (isMobile) {
      e.currentTarget.style.touchAction = 'pan-y pinch-zoom';
    }
  };

  const messageRG = encodeURIComponent("Olá, tudo bem? Gostaria de agendar uma consultoria jurídica e entender como o Escritório Ribas Gondim Advocacia pode me auxiliar.");
  const linkRG = `https://wa.me/5571999536060?text=${messageRG}`;

  return (
    <section className="areas-section" id="areas-de-atuacao">
      <div className="right-area">
        <h2 className="area-heading">Áreas de Atuação</h2>
        <p className="area-description">
          Somos um escritório de advocacia com atuação multidisciplinar, preparado para atender às diversas necessidades jurídicas da sua empresa. 
          Contamos com uma equipe especializada em diferentes ramos do Direito, oferecendo soluções completas e personalizadas. 
          Conheça, a seguir, as principais áreas em que podemos contribuir para o crescimento e a segurança jurídica do seu negócio.
        </p>

        <div className={`carousel-container ${isMobile ? 'mobile-touch' : ''}`} onTouchStartCapture={handleTouchStartCapture}>
          {!isMobile && (
            <>
              <button className="carousel-arrow" onClick={handlePrev}>&lt;</button>
              <button className="carousel-arrow" onClick={handleNext}>&gt;</button>
            </>
          )}

          <div
            className={`carousel-items ${isDragging ? 'dragging' : ''} ${isMobile ? 'mobile-scroll' : ''}`}
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: isMobile ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            {visibleItems.map((area, index) => (
              <div key={`${currentIndex}-${index}`} className="carousel-item">
                <h3 className="item-title">{area.title}</h3>
                <p className="item-description">{area.description}</p>
                <button
                  className="action-button"
                  onClick={() => window.open(linkRG, '_blank', 'noopener,noreferrer')}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  {area.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots">
          {areas.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Areas;
