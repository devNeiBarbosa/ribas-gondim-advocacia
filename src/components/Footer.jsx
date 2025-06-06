import React from "react";
import '../styles/Footer.css';
import Cel from '../assets/cel.svg';
import Email from '../assets/email.svg';
import Whats from '../assets/Whats.svg';
import RBadvocacia from '../assets/logo-vertical.png';

const Footer = () => {
  const messageRG = encodeURIComponent("Olá, tudo bem? Gostaria de agendar uma consultoria jurídica.");
  const messageNei = encodeURIComponent("Olá, gostaria de saber mais sobre seus serviços de desenvolvedor web!");
  const messageDavi = encodeURIComponent("Olá, gostaria de saber mais sobre seus serviços de Técnico de Informática!");

  const linkRG = `https://wa.me/5571999536060?text=${messageRG}`;
  const linkNei = `https://wa.me/5581991003501?text=${messageNei}`;
  const linkDavi = `https://wa.me/5571986093076?text=${messageDavi}`;

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="container-footer">
      <div className="footer">

        <div className="products-list-info footer-links">
          <h4>Páginas</h4>
          <ul>
            <li onClick={() => handleScroll('home')}>Início</li>
            <li onClick={() => handleScroll('o-escritorio')}>O escritório</li>
            <li onClick={() => handleScroll('areas-de-atuacao')}>Áreas</li>
            <li onClick={() => handleScroll('equipe')}>Equipe</li>
            <li onClick={() => handleScroll('links')}>Links</li>
            <li onClick={() => handleScroll('contatos')}>Contatos</li>
          </ul>
        </div>

        <div className="footer-informacoes">
          <h4>Ribas Gondim Advocacia</h4>
          <p>&copy; 2025 | Todos os direitos reservados.</p>
          <p>Atuamos com base em princípios sólidos: Respeito, Comprometimento, Confiança e Segurança.</p>
          <div className="social-icon">
            <img src={Cel} alt="Ícone Telefone" style={{ cursor: 'pointer' }} onClick={() => window.open('tel:+557130321302')} />
            <img src={Whats} alt="Ícone Whatsapp" style={{ cursor: 'pointer' }} onClick={() => window.open(linkRG, '_blank', 'noopener,noreferrer')} />
            <img src={Email} alt="Ícone E-mail" style={{ cursor: 'pointer' }} onClick={() => window.open('mailto:contato@ribasgondim.com.br')} />
          </div>
          <div className="developed-by">
            <p className="developed-by-info">Desenvolvido por</p>
            <p className="developed-by-name" style={{ cursor: 'pointer' }} onClick={() => window.open(linkNei, '_blank', 'noopener,noreferrer')}>
              Nei Barbosa (Front-End Developer)
            </p>
            <p className="developed-by-space">&</p>
            <p className="developed-by-name" style={{ cursor: 'pointer' }} onClick={() => window.open(linkDavi, '_blank', 'noopener,noreferrer')}>
              Davi Chagas (Back-End Developer)
            </p>
          </div>
        </div>

        <div className="footer-logo">
          <img src={RBadvocacia} onClick={() => handleScroll('home')} alt="Logo da Empresa" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
