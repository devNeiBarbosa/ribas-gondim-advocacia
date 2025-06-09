import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import HomeRG1 from '../assets/homeRG-1.jpg';
import HomeRG2 from '../assets/homeRG-2.jpg';
import HomeRG3 from '../assets/homeRG-3.jpg';
import HomeRG4 from '../assets/homeRG-4.jpg';
import HomeRG5 from '../assets/homeRG-5.jpg';

const Home = () => {
  const messageRG = encodeURIComponent("Olá, tudo bem? Gostaria de agendar uma consultoria jurídica e entender como o Escritório Ribas Gondim Advocacia pode me auxiliar.");
  const linkRG = `https://wa.me/5571999536060?text=${messageRG}`;

  const imagens = [
    HomeRG1,
    HomeRG2,
    HomeRG3,
    HomeRG4,
    HomeRG5,
  ];

  const [imagemAtual, setImagemAtual] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalImagens = imagens.length;

  const proximaImagem = () => {
    setImagemAtual((prev) => (prev + 1) % imagens.length);
  };



  const irParaImagem = (index) => {
    setImagemAtual(index);
  };

  useEffect(() => {
    if (!isPaused && totalImagens > 1) {
      const interval = setInterval(proximaImagem, 5000);
      return () => clearInterval(interval);
    }
  }, [imagemAtual, isPaused, totalImagens]);

  return (
    <main className="home">
      <div className="background-img"></div>
      
      <div 
        className="escritório-img"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="carousel-container">
          <div 
            className="carousel-track"
            style={{
              transform: `translateX(-${imagemAtual * 20}%)`
            }}
          >
            {imagens.map((imagem, index) => (
              <img 
                key={index}
                src={imagem} 
                alt={`Slide ${index + 1} - Ribas Gondim`} 
                className="carousel-image" 
              />
            ))}
          </div>

          {totalImagens > 1 && (
            <div className="carousel-indicators">
              {imagens.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === imagemAtual ? 'active' : ''}`}
                  onClick={() => irParaImagem(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="infos-principais">
        <h2 className="titulo">RESPEITO, COMPROMETIMENTO, CONFIANÇA E SEGURANÇA</h2>
        <p className="texto">
          Nosso trabalho é pautado em valores essenciais como honestidade, confiança, segurança,
          transparência e compromisso com a excelência na prestação de serviços jurídicos.
        </p>
        <p className="texto">
          Para acessar nossos serviços de Advocacia Digital Judicial e Extrajudicial, entre em contato conosco.
        </p>
        <button
          className="agendamento"
          onClick={() => window.open(linkRG, '_blank', 'noopener,noreferrer')}
        >
          FALE CONOSCO E AGENDE SUA CONSULTA!
        </button>
      </div>
    </main>
  );
};

export default Home;