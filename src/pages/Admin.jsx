import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

/**
 * Admin.jsx (placeholder funcional)
 * Quando conectarmos a API + AuthContext:
 *  - Validar se o usuário é admin
 *  - Listar últimos sonhos/usuários/assinaturas
 *  - Ações administrativas (banir, reprocessar, etc.)
 */

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [stats, setStats] = useState({
    users: 0,
    dreams: 0,
    interpretations: 0,
    premiumActive: 0
  });

  useEffect(() => {
    // Próximo pacote: GET /api/admin/stats (com credenciais)
    // fetch(`${API_BASE}/admin/stats`, { credentials: 'include' })
    //   .then(r => r.ok ? r.json() : Promise.reject(new Error('Falha ao carregar')))
    //   .then(data => setStats(data))
    //   .catch(e => setErr(e.message))
    //   .finally(() => setLoading(false));

    // Simulação leve:
    const timer = setTimeout(() => {
      setStats({ users: 12, dreams: 87, interpretations: 81, premiumActive: 5 });
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin - Oh My Freud!</title>
        <meta name="description" content="Painel administrativo: visão geral e ações de manutenção." />
      </Helmet>

      <div className="card">
        <h1>Admin</h1>

        {loading ? (
          <>
            <div className="space"></div>
            <p className="small">Carregando dados...</p>
          </>
        ) : err ? (
          <>
            <div className="space"></div>
            <p className="small" style={{ color: '#ff8da1' }}>{err}</p>
          </>
        ) : (
          <>
            <div className="space"></div>
            <div className="row" style={{ flexWrap: 'wrap' }}>
              <div className="card" style={{ minWidth: 220 }}>
                <h3>Usuários</h3>
                <p style={{ fontSize: 28, margin: 0 }}>{stats.users}</p>
              </div>
              <div className="card" style={{ minWidth: 220 }}>
                <h3>Sonhos</h3>
                <p style={{ fontSize: 28, margin: 0 }}>{stats.dreams}</p>
              </div>
              <div className="card" style={{ minWidth: 220 }}>
                <h3>Interpretações</h3>
                <p style={{ fontSize: 28, margin: 0 }}>{stats.interpretations}</p>
              </div>
              <div className="card" style={{ minWidth: 220 }}>
                <h3>Premium ativos</h3>
                <p style={{ fontSize: 28, margin: 0 }}>{stats.premiumActive}</p>
              </div>
            </div>

            <div className="space"></div>
            <hr style={{ borderColor: '#23232a' }} />
            <div className="space"></div>

            <h3>Ações rápidas</h3>
            <div className="row" style={{ flexWrap: 'wrap' }}>
              <button className="btn" onClick={() => alert('Reprocessar fila (placeholder)')}>Reprocessar fila</button>
              <button className="btn" onClick={() => alert('Recarregar stats (placeholder)')}>Recarregar estatísticas</button>
              <button className="btn" onClick={() => alert('Export CSV (placeholder)')}>Exportar CSV</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Admin;
