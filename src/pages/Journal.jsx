import React from 'react';
import { Helmet } from 'react-helmet';

const Journal = () => {
  return (
    <>
      <Helmet>
        <title>Diário de Sonhos - Oh My Freud!</title>
        <meta name="description" content="Consulte e registre seus sonhos no diário." />
      </Helmet>
      <div className="card">
        <h1>Diário de Sonhos</h1>
        <p>Registre aqui seus sonhos para acompanhar sua jornada de interpretação.</p>
      </div>
    </>
  );
};

export default Journal;
