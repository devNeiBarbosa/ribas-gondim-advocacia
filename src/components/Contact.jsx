import React, { useState, useEffect } from "react";
import '../styles/Contact.css';
import Cel from '../assets/cel.svg';
import Loc from '../assets/loc.svg';
import Email from '../assets/email.svg';
import Whats from '../assets/Whats.svg';
import Curriculo from '../assets/curriculo-icon.svg';
import CopyIcon from '../assets/copy-icon.svg';
import Contrato from '../assets/contrato.svg';

const Notification = ({ message, type, onClose, isVisible }) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isVisible || isPaused) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          onClose();
          return 0;
        }
        return prev - 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isVisible, isPaused, onClose]);

  useEffect(() => {
    if (isVisible) {
      setProgress(100);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const getNotificationStyle = () => {
    switch (type) {
      case 'warning':
        return { backgroundColor: '#ff9800', icon: '!' };
      case 'error':
        return { backgroundColor: '#f44336', icon: '✕' };
      case 'success':
        return { backgroundColor: '#4caf50', icon: '✓' };
      default:
        return { backgroundColor: '#4caf50', icon: '✓' };
    }
  };

  const { backgroundColor, icon } = getNotificationStyle();

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        background: backgroundColor,
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '400px',
        minWidth: '300px',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{icon}</div>
      <div style={{ flex: 1 }}>{message}</div>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '18px',
          padding: '0',
        }}
      >
        ✕
      </button>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          background: 'rgba(255,255,255,1)',
          width: `${progress}%`,
          transition: 'width 0.1s linear',
          borderRadius: '0 0 8px 8px'
        }}
      />
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefone: '',
    message: '',
    termsAccepted: false
  });

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Estados para controlar os popups
  const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(false);
  const [isPolicyPopupOpen, setIsPolicyPopupOpen] = useState(false);

  const termsContent = `
Última atualização: 08/06/2025

Bem-vindo ao nosso site. Estes Termos de Uso estabelecem as condições gerais de utilização do site e dos serviços oferecidos pelo ESCRITÓRIO RIBAS GONDIM ADVOCACIA, com sede em Avenida Antônio Carlos Magalhães, 3213, Edifício Golden Plaza.

1. ACEITAÇÃO DOS TERMOS
Ao acessar e utilizar este site, você declara ter lido, compreendido e concordado com todos os termos e condições aqui estabelecidos. Se você não concorda com qualquer parte destes termos, deve interromper imediatamente o uso do site.

2. DESCRIÇÃO DO SERVIÇO
Este site tem como objetivo fornecer informações sobre nossos serviços jurídicos, permitir o contato inicial com potenciais clientes e oferecer conteúdo educativo sobre questões legais.
2.1 Informações Fornecidas
•	As informações contidas neste site têm caráter meramente informativo
•	Não constituem aconselhamento jurídico específico
•	Para orientação jurídica personalizada, é necessário agendamento de consulta
2.2 Limitações do Serviço Online
•	O contato através do site não estabelece relação advogado-cliente
•	A confidencialidade só é garantida após contratação formal dos serviços
•	Informações sensíveis não devem ser enviadas através do formulário de contato

3. RESPONSABILIDADES DO USUÁRIO
3.1 Uso Adequado
O usuário compromete-se a:
•	Utilizar o site de forma legal e ética
•	Não transmitir conteúdo ofensivo, difamatório ou ilegal
•	Fornecer informações verdadeiras nos formulários
•	Respeitar os direitos de propriedade intelectual
3.2 Proibições
É expressamente proibido:
•	Usar o site para fins comerciais não autorizados
•	Tentar violar a segurança do sistema
•	Reproduzir conteúdo sem autorização
•	Enviar spam ou conteúdo malicioso

4. PRIVACIDADE E PROTEÇÃO DE DADOS
4.1 Coleta de Dados
Coletamos apenas as informações necessárias para:
•	Responder às solicitações de contato
•	Melhorar nossos serviços
•	Cumprir obrigações legais
4.2 Uso das Informações
•	Os dados pessoais são tratados conforme nossa Política de Privacidade
•	Não compartilhamos informações com terceiros sem consentimento
•	Mantemos sigilo profissional conforme Código de Ética da OAB

5. PROPRIEDADE INTELECTUAL
5.1 Direitos Autorais
Todo o conteúdo deste site, incluindo textos, imagens, logotipos e design, é protegido por direitos autorais e pertence ao ESCRITÓRIO RIBAS GONDIM ADVOCACIA ou a seus licenciadores.
5.2 Uso Permitido
É permitido:
•	Visualizar e navegar pelo conteúdo para uso pessoal
•	Imprimir páginas para referência pessoal
•	Compartilhar links para o site
5.3 Uso Não Permitido
É proibido:
•	Reproduzir conteúdo para fins comerciais
•	Modificar ou criar obras derivadas
•	Usar logotipos ou marcas sem autorização

6. LIMITAÇÃO DE RESPONSABILIDADE
6.1 Exclusão de Garantias
Este site é fornecido "como está", sem garantias expressas ou implícitas quanto a:
•	Disponibilidade contínua do serviço
•	Ausência de erros ou interrupções
•	Adequação para finalidades específicas
6.2 Limitação de Danos
Em nenhuma hipótese seremos responsáveis por:
•	Danos diretos, indiretos ou consequenciais
•	Perda de dados ou lucros cessantes
•	Danos decorrentes do uso inadequado do site
6.3 Responsabilidade de Terceiros
Não nos responsabilizamos por:
•	Conteúdo de sites de terceiros linkados
•	Ações de provedores de internet
•	Vírus ou malware

7. ALTERAÇÕES DOS TERMOS
7.1 Direito de Modificação
Reservamo-nos o direito de alterar estes termos a qualquer momento, mediante:
•	Publicação da nova versão no site
•	Notificação através do site ou e-mail quando apropriado
7.2 Vigência das Alterações
•	As alterações entram em vigor imediatamente após publicação
•	O uso continuado do site constitui aceitação dos novos termos
•	Recomendamos revisão periódica destes termos

8. DISPOSIÇÕES GERAIS
8.1 Lei Aplicável
Estes termos são regidos pelas leis brasileiras, especialmente:
•	Código Civil Brasileiro
•	Código de Defesa do Consumidor
•	Lei Geral de Proteção de Dados (LGPD)
•	Estatuto da Advocacia e da OAB
8.2 Foro
Fica eleito o foro da comarca de Salvador – BA  para dirimir quaisquer controvérsias decorrentes destes termos.
8.3 Divisibilidade
Se qualquer disposição destes termos for considerada inválida, as demais permanecem em pleno vigor.

9. CONTATO
Para dúvidas sobre estes Termos de Uso, entre em contato:
ESCRITÓRIO RIBAS GONDIM ADVOCACIA
•	Endereço: Avenida Antônio Carlos Magalhães, 3213, Edifício Golden Plaza.
•	Telefone: +55 71 3032-1302
•	E-mail: contato@ribasgondim.com.br
•	Site: ribasgondim.com.br

Estes Termos de Uso foram elaborados em conformidade com a legislação brasileira vigente e as normas éticas da Ordem dos Advogados do Brasil.

  `;

  const policyContent = `
POLÍTICA DE PRIVACIDADE DE DADOS PESSOAIS

RIBAS GONDIM ADVOCACIA
1. INTRODUÇÃO E COMPROMISSO COM A PRIVACIDADE
O Escritório Ribas Gondim Advocacia reconhece a importância fundamental da proteção de dados pessoais e demonstra seu compromisso integral com o cumprimento da Lei nº 13.709/2018 - Lei Geral de Proteção de Dados Pessoais (LGPD) e demais normas aplicáveis à proteção da privacidade. Esta Política de Privacidade foi desenvolvida para garantir total transparência sobre como coletamos, utilizamos, armazenamos e protegemos os dados pessoais de nossos colaboradores, parceiros, clientes e demais pessoas que se relacionam conosco.
Solicitamos a leitura completa deste documento. Dúvidas ou solicitações podem ser direcionadas ao nosso Encarregado de Proteção de Dados através do e-mail: contato@ribasgondim.com.br

2. DEFINIÇÕES FUNDAMENTAIS
2.1 Dados Pessoais: Informações relacionadas a pessoa natural identificada ou identificável, incluindo nome, documentos de identidade, endereço, telefone, e-mail, dados profissionais, entre outros.
2.2 Dados Sensíveis: Informações sobre origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, dados referentes à saúde ou vida sexual, dados genéticos ou biométricos.

3. CATEGORIAS DE DADOS PROCESSADOS
O Ribas Gondim Advocacia processa as seguintes categorias de dados, conforme a relação estabelecida:
3.1 Colaboradores e Parceiros:
• Dados de Identificação: Nome completo, filiação, estado civil, nacionalidade, data de nascimento, endereço residencial, documentos oficiais (RG, CPF), telefone, e-mail, registro profissional (OAB).
• Informações Profissionais: Formação acadêmica, experiência profissional, competências técnicas, histórico profissional.
• Dados Financeiros: Informações bancárias necessárias para pagamentos e reembolsos.
3.2 Clientes e Partes Envolvidas:
Durante a prestação de serviços jurídicos, podemos processar diversos tipos de dados pessoais necessários para a adequada representação legal, fundamentados nos interesses legítimos e no exercício regular de direitos em processos judiciais e administrativos.

4. DIREITOS DOS TITULARES DE DADOS
4.1 Em conformidade com a LGPD, garantimos aos titulares de dados os seguintes direitos:
• Confirmação sobre a existência de tratamento de seus dados
• Acesso às informações coletadas e processadas
• Correção de dados incompletos, inexatos ou desatualizados
• Anonimização, bloqueio ou eliminação de dados desnecessários
• Portabilidade dos dados para outro prestador de serviços
• Eliminação de dados processados com base em consentimento revogado
• Informações sobre compartilhamento de dados com terceiros
• Revogação do consentimento quando aplicável

5. FINALIDADES DO TRATAMENTO
5.1 Relações Profissionais Internas:
• Formalização de contratos de trabalho e parcerias
• Gestão administrativa e financeira
• Cadastramento em sistemas internos
• Cumprimento de obrigações trabalhistas e fiscais
5.2 Prestação de Serviços Jurídicos:
• Elaboração e análise de contratos
• Condução de processos judiciais e administrativos
• Produção de pareceres e manifestações jurídicas
• Realização de due diligence e análise de riscos
• Obtenção de licenças e autorizações
• Emissão de procurações e certidões
• Assessoria jurídica consultiva e contenciosa
5.3 Comunicação e Marketing Jurídico:
• Divulgação de conteúdo jurídico relevante
• Convites para eventos e palestras
• Comunicação sobre atualizações legislativas

6. COLETA DE DADOS ATRAVÉS DO WEBSITE
6.1 Nosso website pode coletar dados quando você:
• Preenche formulários de contato
• Participa de processos seletivos
• Interage com nosso conteúdo

7. ARMAZENAMENTO E RETENÇÃO
Os dados pessoais são mantidos pelo período necessário para cumprir as finalidades estabelecidas nesta política ou conforme exigido por lei. Após o término da necessidade de processamento, os dados são eliminados de forma segura, respeitadas as exceções legais previstas na LGPD.

8. COMPARTILHAMENTO DE DADOS
8.1 O Ribas Gondim Advocacia não comercializa dados pessoais. O compartilhamento ocorre exclusivamente para:
• Prestadores de serviços essenciais (TI, recursos humanos, contabilidade)
• Parceiros técnicos especializados (peritos, consultores)
• Autoridades competentes quando legalmente exigido
• Provedores de infraestrutura tecnológica
Compartilhamentos internacionais são realizados com fornecedores que atendem padrões adequados de proteção.

9. SEGURANÇA E PROTEÇÃO
9.1 Implementamos medidas técnicas e organizacionais apropriadas para proteger os dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição, incluindo:
• Sistemas de segurança da informação
• Controles de acesso
• Treinamento contínuo de colaboradores
• Procedimentos de backup e recuperação

10. ATUALIZAÇÕES DA POLÍTICA
Esta Política pode ser atualizada periodicamente. Alterações relevantes serão comunicadas através de nosso website, e a versão mais recente estará sempre disponível para consulta.

11. CANAL DE COMUNICAÇÃO
Encarregado de Proteção de Dados Nome: Christiane Maria Ribas Gondim | E-mail: contato@ribasgondim.com.br | Telefone: +55 71 3032-1302 | Endereço: Avenida Antônio Carlos Magalhães, 3213, Edifício Golden Plaza.
Website: ribasgondim.com.br
Para dúvidas, solicitações ou exercício de direitos relacionados à proteção de dados, utilize os canais acima. Responderemos no menor prazo possível, observados os prazos legais estabelecidos pela LGPD.

Esta Política de Privacidade está em vigor a partir de 08/06/2025 e substitui versões anteriores.




  `;

  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      show: false
    }));
  };

  // Handlers dos popups
  const openTermsPopup = () => {
    setIsTermsPopupOpen(true);
  };

  const closeTermsPopup = () => {
    setIsTermsPopupOpen(false);
  };

  const openPolicyPopup = () => {
    setIsPolicyPopupOpen(true);
  };

  const closePolicyPopup = () => {
    setIsPolicyPopupOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const copyAddress = async () => {
    const address = "Avenida Antônio Carlos Magalhães, 3213, Edifício Golden Plaza";

    try {
      await navigator.clipboard.writeText(address);
      showNotification('Endereço copiado para a área de transferência!', 'success');
    } catch {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = address;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showNotification('Endereço copiado para a área de transferência!', 'success');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!formData.name.trim()) {
      showNotification('Por favor, preencha o campo Nome.', 'warning');
      return;
    }

    if (!formData.email.trim()) {
      showNotification('Por favor, preencha o campo E-mail.', 'warning');
      return;
    }

    if (!formData.telefone.trim()) {
      showNotification('Por favor, preencha o campo Telefone.', 'warning');
      return;
    }

    if (!formData.message.trim()) {
      showNotification('Por favor, preencha o campo Mensagem.', 'warning');
      return;
    }

    if (!formData.termsAccepted) {
      showNotification('Você deve aceitar os Termos de Uso e Política de Privacidade para continuar.', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      showNotification('Por favor, insira um email válido.', 'warning');
      return;
    }

    const phoneRegex = /\d/g;
    const phoneNumbers = formData.telefone.match(phoneRegex);
    if (!phoneNumbers || phoneNumbers.length < 10) {
      showNotification('Por favor, insira um telefone válido com pelo menos 10 dígitos.', 'warning');
      return;
    }

    const whatsappMessage = `Olá, tudo bem? Gostaria de agendar uma consultoria jurídica.\n\n*Dados do contato:*\n\n*Nome:* ${formData.name}\n*E-mail:* ${formData.email}\n*Telefone:* ${formData.telefone}\n\n*Mensagem:*\n${formData.message}\n\n_Mensagem enviada através do site Ribas Gondim Advocacia_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/5571999536060?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');

    showNotification('Redirecionando para WhatsApp! Você será direcionado para continuar a conversa.', 'success');

    setFormData({
      name: '',
      email: '',
      telefone: '',
      message: '',
      termsAccepted: false
    });
  };

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.show}
        onClose={hideNotification}
      />

      <section className="contact" id="contatos">
        <div className="contact-container">
          <div className="container-left">
            <form className="forms" onSubmit={handleSubmit} noValidate>
              <h2>Fale Conosco</h2>
              <div>
                <label>Nome <span>*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label>E-mail <span>*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="exemplo@email.com"
                />
              </div>
              <div>
                <label>Telefone <span>*</span></label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(99) 9 9999-9999"
                />
              </div>
              <div>
                <label>Mensagem <span>*</span></label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Digite sua mensagem..."
                  rows="5"
                />
              </div>

              <div className="terms-container">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="terms-checkbox"
                  required
                />
                <label htmlFor="termsAccepted" className="terms-label">
                  Eu li e aceito os{' '}
                  <button
                    type="button"
                    onClick={openTermsPopup}
                    className="terms-link"
                  >
                    Termos de Uso
                  </button>
                  {' '}e a{' '}
                  <button
                    type="button"
                    onClick={openPolicyPopup}
                    className="terms-link"
                  >
                    Política de Privacidade
                  </button>
                </label>
              </div>

              <button className="to-send" type="submit">
                Enviar via WhatsApp
              </button>
            </form>
          </div>

          <div className="container-mid">
            <div className="info-contact">
              <h2>Informações de contato</h2>
              <div className="icons-name">
                <img src={Cel} alt="Ícone Telefone" />
                <h3>Telefone</h3>
              </div>
              <p style={{ cursor: 'pointer' }} onClick={() => window.open('tel:+557130321302')}>
                +55 71 3032-1302
              </p>
            </div>
            <div className="info-contact">
              <div className="icons-name">
                <img src={Whats} alt="Ícone WhatsApp" />
                <h3>WhatsApp</h3>
              </div>
              <p style={{ cursor: 'pointer' }} onClick={() => window.open('https://wa.me/5571999536060', '_blank', 'noopener,noreferrer')}>
                +55 71 99953-6060
              </p>
            </div>
            <div className="info-contact">
              <div className="icons-name">
                <img src={Email} alt="Ícone Email" />
                <h3>E-mail</h3>
              </div>
              <p style={{ cursor: 'pointer' }} onClick={() => window.open('mailto:contato@ribasgondim.com.br')}>
                contato@ribasgondim.com.br
              </p>
            </div>

            <div className="info-contact pareceres-e-contratos">
              <h2>Pareceres e Contratos</h2>
              <div className="icons-name">
                <img src={Contrato} alt="Ícone Contrato" />
                <h3>Estes serviços são prestados a todos os clientes, bem como aos colegas advogados:</h3>
              </div>
              <p style={{ cursor: 'pointer' }} onClick={() => window.open('mailto:contratos@ribasgondim.com.br')}>
                contratos@ribasgondim.com.br
              </p>
            </div>

            <div className="info-contact trabalhe-conosco">
              <h2>Trabalhe Conosco</h2>
              <div className="icons-name">
                <img src={Curriculo} alt="Ícone Currículo" />
                <h3>Envie seu currículo:</h3>
              </div>
              <p style={{ cursor: 'pointer' }} onClick={() => window.open('mailto:contato@ribasgondim.com.br')}>
                contato@ribasgondim.com.br
              </p>
            </div>
          </div>

          <div className="container-right">
            <h2>Localização</h2>
            <div className="icons-name">
              <img src={Loc} alt="Ícone Localização" className="img-loc" />
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <p>
                  Avenida Antônio Carlos Magalhães, 3213, Edifício Golden Plaza, Parque Bela Vista (Iguatemi), 40280-000, Salvador, Bahia, Brasil.
                </p>
                <button onClick={copyAddress} className="button-copy">
                  <img src={CopyIcon} alt="Ícone copia e cola" className="img-copy" />
                </button>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.757944971542!2d-38.47061019052028!3d-12.987327787276616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161be01b13e6b5%3A0xc899a12f9ff2d4e3!2sRibas%20Gondim%20Advocacia!5e0!3m2!1spt-BR!2sbr!4v1749229461143!5m2!1spt-BR!2sbr"
              width="400"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Popup de Termos de Uso */}
        {isTermsPopupOpen && (
          <div className="popup-overlay" onClick={closeTermsPopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <button className="popup-close" onClick={closeTermsPopup}>×</button>
              <div className="popup-header">
                <h2>TERMOS DE USO</h2>
              </div>
              <div className="popup-body">
                {termsContent.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Popup de Política de Privacidade */}
        {isPolicyPopupOpen && (
          <div className="popup-overlay" onClick={closePolicyPopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <button className="popup-close" onClick={closePolicyPopup}>×</button>
              <div className="popup-header">
                <h2>POLÍTICA DE PRIVACIDADE</h2>
              </div>
              <div className="popup-body">
                {policyContent.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-p">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Contact;