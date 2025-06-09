import React, { useState, useEffect } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const itemsToShow = 3;

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
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

    if (!isDragging) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % areas.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, areas.length, isDragging]);

  const handleDotClick = (index) => {
    if (!isDragging) {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (!isDragging) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % areas.length);
    }
  };

  const handlePrev = () => {
    if (!isDragging) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + areas.length) % areas.length);
    }
  };

  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setTranslateX(0);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    const maxTranslate = 100;
    const limitedDiff = Math.max(-maxTranslate, Math.min(maxTranslate, diff));
    setTranslateX(limitedDiff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const threshold = 50;
    
    if (translateX > threshold) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + areas.length) % areas.length);
    } else if (translateX < -threshold) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % areas.length);
    }
    
    setIsDragging(false);
    setTranslateX(0);
  };

  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleMouseDown = (e) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  const messageRG = encodeURIComponent("Olá, tudo bem? Gostaria de agendar uma consultoria jurídica e entender como o Escritório Ribas Gondim Advocacia pode me auxiliar.");
  const linkRG = `https://wa.me/5571999536060?text=${messageRG}`;

  const handleButtonClick = (e) => {
    if (!isDragging) {
      window.open(linkRG, '_blank', 'noopener,noreferrer');
    }
    e.stopPropagation();
  };

  return (
    <section className="areas-section" id="areas-de-atuacao">
      <div className="right-area">
        <h2 className="area-heading">Áreas de Atuação</h2>
        <p className="area-description">
          Somos um escritório de advocacia com atuação multidisciplinar, preparado para atender às diversas necessidades jurídicas da sua empresa. 
          Contamos com uma equipe especializada em diferentes ramos do Direito, oferecendo soluções completas e personalizadas. 
          Conheça, a seguir, as principais áreas em que podemos contribuir para o crescimento e a segurança jurídica do seu negócio.
        </p>

        <div className="carousel-container">
          {!isMobile && (
            <>
              <button className="carousel-arrow" onClick={handlePrev}>&lt;</button>
              <button className="carousel-arrow" onClick={handleNext}>&gt;</button>
            </>
          )}

          <div
            className="carousel-items"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease',
              userSelect: 'none',
              touchAction: 'pan-y'
            }}
          >
            {visibleItems.map((area, index) => (
              <div key={`${currentIndex}-${index}`} className="carousel-item">
                <h3 className="item-title">{area.title}</h3>
                <p className="item-description">{area.description}</p>
                <button
                  className="action-button"
                  onClick={handleButtonClick}
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