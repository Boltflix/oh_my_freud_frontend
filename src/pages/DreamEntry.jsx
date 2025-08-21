import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

/**
 * DreamEntry.jsx
 * Formulário “completo” para registrar um sonho (campos extras + UX melhor).
 * Envia para o backend (POST /api/dreams) e salva a interpretação no localStorage.
 * Depois redireciona para /interpretacao.
 */

const STORAGE_KEY = 'omf_last_interpretation';

const moods = ['muito ruim', 'ruim', 'neutro', 'bom', 'muito bom'];
const sleepQualities = ['péssima', 'ruim', 'ok', 'boa', 'excelente'];

export default function DreamEntry() {
  const [title, setTitle] = useState('');
  const [dreamDate, setDreamDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('neutro');
  const [sleepQuality, setSleepQuality] = useState('ok');
  const [isRecurring, setIsRecurring] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');

    if (!content.trim()) {
      setErr('Descreva seu sonho primeiro.');
      return;
    }

    setLoading(true);
    try {
      const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      if (!API_BASE) throw new Error('VITE_API_BASE_URL não configurada');

      const res = await fetch(`${API_BASE}/dreams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // habilite se seu backend usa sessão/cookie
        // credentials: 'include',
        body: JSON.stringify({
          title: title || null,
          content: content.trim(),
          dreamDate,
          mood,
          sleepQuality,
          isRecurring
        })
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Erro (${res.status}): ${txt || 'falha ao registrar sonho'}`);
      }

      const data = await res.json().catch(() => ({}));

      const interpretation =
        data?.interpretation ??
        data?.data?.interpretation ??
        data?.result?.interpretation ??
        '';

      const id = data?.id ?? data?.dreamId ?? data?.data?.id ?? null;

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          id,
          title: title || '',
          content: content.trim(),
          interpretation,
          ts: Date.now()
        })
      );

      // vai para a página que exibe a interpretação
      window.location.href = '/interpretacao';
    } catch (e) {
      setErr(e.message || 'Erro ao enviar seu sonho.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Registrar Sonho (completo) - Oh My Freud!</title>
        <meta
          name="description"
          content="Registre um sonho com detalhes e receba a interpretação com IA."
        />
      </Helmet>

      <form className="card" onSubmit={handleSubmit} style={{ maxWidth: 820, margin: '0 auto' }}>
        <h1>Registrar Sonho</h1>

        <div className="space"></div>

        <label className="small">Título (opcional)</label>
        <input
          className="input"
          type="text"
          placeholder="Ex.: O gato falante na praia"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="space"></div>

        <div className="row" style={{ flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label className="small">Data do sonho</label>
            <input
              className="input"
              type="date"
              value={dreamDate}
              onChange={(e) => setDreamDate(e.target.value)}
              required
            />
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <label className="small">Como você acordou?</label>
            <select
              className="input"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              {moods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <label className="small">Qualidade do sono</label>
            <select
              className="input"
              value={sleepQuality}
              onChange={(e) => setSleepQuality(e.target.value)}
            >
              {sleepQualities.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space"></div>

        <label className="small">Seu relato</label>
        <textarea
          className="textarea"
          rows={8}
          placeholder="Conte com detalhes: locais, pessoas, sensações, cores, sons..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="space"></div>

        <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
          Sonho recorrente
        </label>

        <div className="space"></div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Interpretando…' : 'Enviar para interpretação'}
        </button>

        {err && (
          <>
            <div className="space"></div>
            <div className="small" style={{ color: '#ff8da1' }}>{err}</div>
          </>
        )}
      </form>
    </>
  );
}
