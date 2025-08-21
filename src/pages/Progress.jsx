import React from 'react';
import { Helmet } from 'react-helmet';

const Progress = () => {
  return (
    <>
      <Helmet>
        <title>Seu Progresso - Oh My Freud!</title>
        <meta name="description" content="Acompanhe a evolução dos temas e humores dos seus sonhos." />
      </Helmet>
      <div className="card">
        <h1>Seu Progresso</h1>
        <p>Acompanhe a evolução dos seus sonhos e veja padrões ao longo do tempo.</p>
      </div>
    </>
  );
};

export default Progress;
