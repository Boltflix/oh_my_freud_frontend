import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

/**
 * Paywall.jsx — preços em USD e checkout real no backend
 * POST ${VITE_API_BASE_URL}/stripe/checkout
 * body: { planId: 'premium_monthly' | 'premium_yearly', currency: 'USD' }
 * resp: { url: "https://checkout.stripe.com/..." }
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export default function Paywall() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function go(planId) {
    setErr('');
    setLoading(true);
    try {
      if (!API_BASE) throw new Error('VITE_API_BASE_URL não configurada');

      const res = await fetch(`${API_BASE}/stripe/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ planId, currency: 'USD' })
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Falha ao criar checkout (${res.status}) ${txt}`);
      }

      const data = await res.json().catch(() => ({}));
      const url = data?.url || data?.checkoutUrl || data?.data?.url;
      if (!url) throw new Error('Servidor não retornou a URL de checkout.');

      window.location.href = url;
    } catch (e) {
      setErr(e.message || 'Erro ao iniciar checkout.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Premium - Oh My Freud!</title>
        <meta name="description" content="Assine Premium para apoiar o projeto e desbloquear recursos." />
      </Helmet>

      <div className="card" style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1>Premium</h1>
        <p className="small">Apoie o projeto e desbloqueie benefícios. Valores em USD.</p>

        <div className="space"></div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div className="card" style={{ flex: 1, minWidth: 260 }}>
            <h3>Mensal</h3>
            <div className="space"></div>
            <div style={{ fontSize: 32, fontWeight: 800 }}>$9.90</div>
            <div className="small">por mês</div>
            <div className="space"></div>
            <button className="btn" disabled={loading} onClick={() => go('premium_monthly')}>
              {loading ? '...' : 'Assinar agora'}
            </button>
          </div>

          <div className="card" style={{ flex: 1, minWidth: 260 }}>
            <h3>Anual</h3>
            <div className="space"></div>
            <div style={{ fontSize: 32, fontWeight: 800 }}>$79.90</div>
            <div className="small">por ano</div>
            <div className="space"></div>
            <button className="btn" disabled={loading} onClick={() => go('premium_yearly')}>
              {loading ? '...' : 'Assinar agora'}
            </button>
          </div>
        </div>

        {err && (
          <>
            <div className="space"></div>
            <div className="small" style={{ color: '#ff8da1' }}>{err}</div>
          </>
        )}
      </div>
    </>
  );
}
