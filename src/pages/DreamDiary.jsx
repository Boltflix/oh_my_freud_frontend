import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

/**
 * DreamDiary.jsx
 * Lista os sonhos registrados (mock/localStorage por enquanto).
 * Próxima etapa: integrar com GET /api/dreams do backend.
 */

const STORAGE_KEY = 'omf_dreams_list';

export default function DreamDiary() {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setDreams(JSON.parse(raw));
      } else {
        setDreams([]);
      }
    } catch {
      setDreams([]);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Diário de Sonhos - Oh My Freud!</title>
        <meta
          name="description"
          content="Consulte os sonhos que você já registrou e relembre suas interpretações."
        />
      </Helmet>

      <div className="card">
        <h1>Diário de Sonhos</h1>
        {dreams.length === 0 ? (
          <p className="small">
            Você ainda não registrou nenhum sonho.{' '}
            <Link to="/dream/new">Clique aqui para registrar</Link>.
          </p>
        ) : (
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {dreams.map((d) => (
              <li key={d.id || d.ts} style={{ marginBottom: 16 }}>
                <div className="card" style={{ padding: 12 }}>
                  <h3 style={{ margin: '0 0 8px 0' }}>{d.title || 'Sem título'}</h3>
                  <p className="small" style={{ margin: 0 }}>
                    {d.dreamDate
                      ? new Date(d.dreamDate).toLocaleDateString()
                      : d.ts
                      ? new Date(d.ts).toLocaleString()
                      : '—'}
                  </p>
                  <div className="space"></div>
                  <p style={{ margin: 0, maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {d.content}
                  </p>
                  <div className="space"></div>
                  <Link className="btn" to="/interpretacao">
                    Ver interpretação
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
