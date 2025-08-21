import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';

const KEY = 'omf_last_interpretation';

const Interpretation = () => {
  const data = useMemo(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Interpretação - Oh My Freud!</title>
        <meta
          name="description"
          content="Veja a última interpretação de sonho salva no seu navegador."
        />
      </Helmet>

      {!data ? (
        <div className="card">
          <h1>Interpretação</h1>
          <p className="small">Nenhuma interpretação encontrada. Primeiro registre um sonho.</p>
        </div>
      ) : (
        <div className="card">
          <h1>Interpretação do seu sonho</h1>

          <div className="space"></div>
          <h3>Seu relato</h3>
          <p>{data.content || '—'}</p>

          <div className="space"></div>
          <h3>Leitura (IA)</h3>
          <p>{data.interpretation || '—'}</p>

          <div className="space"></div>
          <p className="small">
            ID: {data.id ?? '—'} • {data.ts ? new Date(data.ts).toLocaleString() : '—'}
          </p>
        </div>
      )}
    </>
  );
};

export default Interpretation;
