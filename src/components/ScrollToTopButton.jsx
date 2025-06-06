import React, { useState, useEffect } from 'react';
import '../styles/ScrollToTopButton.css';  
import SetaIcon from '../assets/setaicon.svg';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
        >
          <img src={SetaIcon} alt="Seta para cima" className='up-seta'/>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
