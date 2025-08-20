import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Oh My Freud! - Home</title>
        <meta name="description" content="Bem-vindo ao Oh My Freud! Registre e interprete seus sonhos." />
      </Helmet>
      <div className="card">
        <h1>Bem-vindo ao Oh My Freud!</h1>
        <p>Use o menu para registrar um sonho, ver suas interpretações ou acessar recursos premium.</p>
      </div>
    </>
  );
};

export default Home;
