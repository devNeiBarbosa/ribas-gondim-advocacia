import React from "react";
import '../styles/TheOffice.css';

const TheOffice = () => {
  return (
    <section className="the-office">
      <div className="escritorio-left">
        <h2 className="o-escritorio">O Escritório</h2>
        <p className="sobre-nos">
          Nossa missão é oferecer serviços jurídicos especializados, seguros e bem estruturados,
          com foco em eficiência. Trabalhamos para oferecer uma assessoria de elevado padrão técnico e estratégico, 
          garantindo um excelente custo-benefício em cada demanda que assumimos.
        </p>
        <p className="sobre-nos">
          Atuamos com base em valores sólidos, como honestidade, proatividade, respeito, confiança, segurança, ética,
          comprometimento, qualidade, parceria, inovação e transparência. Acreditamos na importância do envolvimento do
          cliente em todas as etapas do processo, promovendo uma relação próxima e transparente.
        </p>
        <p className="sobre-nos">
          Nossa visão é ser reconhecido como um escritório de advocacia inovador, confiável e eficiente, destacando-se como o
          melhor prestador de serviços jurídicos ao atender — e sempre que possível, superar — as expectativas de nossos clientes. 
          Buscamos constantemente a evolução, tanto no aspecto técnico quanto humano, porque entendemos que o verdadeiro
          diferencial está na forma como cuidamos das pessoas e de suas causas.
        </p>
      </div>

      <div className="experiencia-rigth">
        <h2 className="experiencia">13</h2>
        <p className="experiencia-text">ANOS DE EXPERIÊNCIA</p>
      </div>
    </section>
  );
};

export default TheOffice;
