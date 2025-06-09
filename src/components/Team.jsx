import React from "react";
import '../styles/Team.css';
import Room from '../assets/room.jpg'

const Team = () => {
  const messageRG = encodeURIComponent("Olá, tudo bem? Gostaria de agendar uma consultoria jurídica e entender como o Escritório Ribas Gondim Advocacia pode me auxiliar.")
  const linkRG = `https://wa.me/5571999536060?text=${messageRG}`;

  return (
    <>
      <section className="team" id="equipe">
        <div className="img-room-container">
          <div className="background-img-room"></div>
          <img src={Room} alt="Sala de Reuniões" className="room" />
        </div>

        <div className="text-title">
          <h2 className="title-info">Conheça nossa Equipe</h2>
        </div>
      </section>

      <section className="team-info">
        <div className="team-text-info-container">
          <p className="text-info">
            Nossa equipe é formada por advogados experientes, comprometidos com a excelência,
            a ética e a busca por soluções jurídicas eficazes. Atuamos de forma personalizada, entendendo
            as necessidades de cada cliente para oferecer um atendimento humanizado e estratégico. Estamos prontos
            para defender seus direitos com dedicação e transparência.
          </p>
        </div>
      </section>

      <section className="team-people">
        <div className="team-info-people">
          <div className="info-left-people">
            <div className="coordenação-geral">
              <h2 className="h2">Coordenação Geral</h2>
              <p className="p">Iracema Ester Gondim de Oliva</p>
            </div>

            <div className="coordenação-equipe">
              <h2 className="h2">Coordenação de Equipe</h2>
              <p className="p">Christiane Maria Ribas Gondim</p>
              <p className="p">Manuella Ribas Gondim Santos</p>
            </div>
          </div>
          <div className="info-mid-people">
            <div className="advogados">
              <h2 className="h2">Advogados</h2>
              <p className="p">Dr. Hélio Gondim <span>(in memoriam)</span></p>
              <p className="p">Dra. Terezinha Ribas Gondim</p>
              <p className="p">Dra. Christiane Maria Ribas Gondim</p>
              <p className="p">Dr. Vinícius Mauadié da Silva</p>
              <p className="p">Dra. Mª Cláudia Ribas Gondim de H. Rios</p>
            </div>
          </div>
          <div className="info-right-people">
            <div className="consultor-empresarial">
              <h2 className="h2">Consultores Empresariais</h2>
              <p className="p">Júlio Cézar da Silva Nascimento</p>
              <p className="p">Antônio Manuel Ribas Gondim Santos</p>
            </div>
            <div className="estagiario">
              <h2 className="h2">Estagiária</h2>
              <p className="p">Júlia Ribas Gondim Nascimento</p>
            </div>
          </div>
        </div>

        <div className="button-agendamento">
          <button
            className="agendamento"
            onClick={() => window.open(linkRG, '_blank', 'noopener,noreferrer')}
          >
            FALE CONOSCO E AGENDE SUA CONSULTA!
          </button>
        </div>
      </section>

    </>
  )
};

export default Team;