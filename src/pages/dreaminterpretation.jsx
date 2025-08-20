import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

/**
 * DreamInterpretation.jsx
 * Exibe uma interpretação específica de um sonho.
 * - Se vier de /dream/:id → carrega do backend
 * - Se não tiver id, mostra última salva no localStorage
 */

const STORAGE_KEY = 'omf_last_interpretation';

export default function DreamInterpretation({ dreamId }) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [dream, setDream] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr('');
      try {
        if (dreamId) {
          const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
          if (!API_BASE) throw new Error('VITE_API_BASE_URL não configurada');
          const res = await fetch(`${API_BASE}/dreams/${dreamId}`, { credentials: 'include' });
          if (!res.ok) throw new Error(`Erro ao buscar sonho (${res.status})`);
          const data = await res.json();
          setDream(data);
        } else {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) setDream(JSON.parse(raw));
        }
      } catch (e) {
        setErr(e.message || 'Falha ao carregar interpretação.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [dreamId]);

  return (
    <>
      <Helmet>
        <title>Interpretação - Oh My Freud!</title>
        <meta
          name="description"
          content="Veja a interpretação detalhada do sonho registrado."
        />
      </Helmet>

      <div className="card">
        <h1>Interpretação do Sonho</h1>

        {loading ? (
          <p className="small">Carregando...</p>
        ) : err ? (
          <p className="small" style={{ color: '#ff8da1' }}>{err}</p>
        ) : !dream ? (
          <p className="small">Nenhuma interpretação encontrada.</p>
        ) : (
          <>
            {dream.title && <h3>{dream.title}</h3>}
            <p><strong>Seu relato:</strong></p>
            <p>{dream.content || '—'}</p>
            <div className="space"></div>
            <p><strong>Interpretação:</strong></p>
            <p>{dream.interpretation || '—'}</p>
            {dream.dreamDate && (
              <p className="small">
                Data: {new Date(dream.dreamDate).toLocaleDateString()}
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}
