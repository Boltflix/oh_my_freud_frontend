import React from 'react';
import { Helmet } from 'react-helmet';

const Exercises = () => {
  return (
    <>
      <Helmet>
        <title>Exercícios - Oh My Freud!</title>
        <meta name="description" content="Pratique exercícios de reflexão e autoconhecimento." />
      </Helmet>
      <div className="card">
        <h1>Exercícios</h1>
        <p>Aqui você encontrará práticas e atividades para explorar seus sonhos e desenvolver autoconhecimento.</p>
      </div>
    </>
  );
};

export default Exercises;
