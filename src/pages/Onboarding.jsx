import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Onboarding = () => {
  return (
    <>
      <Helmet>
        <title>Comece aqui - Oh My Freud!</title>
        <meta
          name="description"
          content="Guia rápido para começar a usar o Oh My Freud: registrar sonhos, ver interpretações e assinar o Premium."
        />
      </Helmet>

      <div className="card">
        <h1>Bem-vindo(a) 👋</h1>
        <p className="small">
          Em 3 passos você começa a usar o Oh My Freud! sem mistério.
        </p>

        <div className="space"></div>

        <ol style={{ lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
          <li>
            <strong>Registre um sonho</strong> — conte com suas palavras o que você sonhou.
            <div className="space"></div>
            <Link className="btn" to="/dream/new">Registrar sonho</Link>
          </li>

          <div className="space"></div>

          <li>
            <strong>Veja a interpretação</strong> — após enviar, nós salvamos a leitura no seu navegador.
            <div className="space"></div>
            <Link className="btn" to="/interpretacao">Abrir interpretação</Link>
          </li>

          <div className="space"></div>

          <li>
            <strong>Desbloqueie o Premium</strong> — apoie o projeto e ganhe recursos extras.
            <div className="space"></div>
            <Link className="btn" to="/premium">Conhecer planos</Link>
          </li>
        </ol>

        <div className="space"></div>

        <p className="small">
          Dica: você pode acessar tudo pelo menu superior quando quiser.
        </p>
      </div>
    </>
  );
};

export default Onboarding;
