import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const KEY = 'omf_last_interpretation';

const NewDream = () => {
  const [dream, setDream] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      if (!API_BASE) throw new Error('VITE_API_BASE_URL não configurada');

      const res = await fetch(`${API_BASE}/dreams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: dream })
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Erro (${res.status}): ${txt}`);
      }

      const data = await res.json();
      localStorage.setItem(KEY, JSON.stringify({
        id: data?.id || null,
        content: dream,
        interpretation: data?.interpretation || '',
        ts: Date.now()
      }));

      window.location.href = '/interpretacao';
    } catch (err) {
      setError(err.message || 'Erro ao registrar sonho.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Novo Sonho - Oh My Freud!</title>
        <meta name="description" content="Registre um novo sonho para interpretação com IA." />
      </Helmet>

      <form className="card" onSubmit={handleSubmit}>
        <h1>Registrar Novo Sonho</h1>
        <textarea
          required
          rows={6}
          placeholder="Escreva aqui seu sonho..."
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          style={{ width: '100%', marginTop: 16 }}
        />
        <div className="space"></div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar para interpretação'}
        </button>
        {error && (
          <div className="small" style={{ color: '#ff8da1', marginTop: 8 }}>
            {error}
          </div>
        )}
      </form>
    </>
  );
};

export default NewDream;
