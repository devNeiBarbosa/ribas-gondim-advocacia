import React, { useState } from "react";
import '../styles/Header.css';
import LogoHorizontal from '../assets/logo-horizontal.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Fecha o menu mobile após clicar em um item
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="cabeçalho" id="home">
      <div className="header-container">
        <div className="logomarca">
          <img src={LogoHorizontal} alt="Logo da empresa" className="img"/>
        </div>

        {/* Menu Desktop */}
        <div className="secoes desktop-menu">
          <ul>
            <li onClick={() => handleScroll('home')}>INÍCIO</li>
            <li onClick={() => handleScroll('o-escritorio')}>O ESCRITÓRIO</li>
            <li onClick={() => handleScroll('areas-de-atuacao')}>ÁREAS</li>
            <li onClick={() => handleScroll('equipe')}>EQUIPE</li>
            <li onClick={() => handleScroll('links')}>LINKS</li>
            <li onClick={() => handleScroll('contatos')}>CONTATOS</li>
          </ul>
        </div>

        {/* Botão Hambúrguer Mobile */}
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => handleScroll('home')}>INÍCIO</li>
          <li onClick={() => handleScroll('o-escritorio')}>O ESCRITÓRIO</li>
          <li onClick={() => handleScroll('areas-de-atuacao')}>ÁREAS</li>
          <li onClick={() => handleScroll('equipe')}>EQUIPE</li>
          <li onClick={() => handleScroll('links')}>LINKS</li>
          <li onClick={() => handleScroll('contatos')}>CONTATOS</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;