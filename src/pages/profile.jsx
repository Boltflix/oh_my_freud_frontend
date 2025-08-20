import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

/**
 * Placeholder do Perfil.
 * Quando conectarmos o AuthContext e a API, vamos:
 *  - buscar os dados reais do usuário
 *  - permitir editar nome/idioma
 *  - exibir status do Premium
 */

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [user, setUser] = useState({
    name: 'Visitante',
    email: 'anon@ohmyfreud.app',
    premium: false,
    locale: 'pt'
  });

  useEffect(() => {
    // Próximo pacote: GET /api/me
    // Exemplo:
    // fetch(`${API_BASE}/me`, { credentials: 'include' })
    //   .then(r => r.json())
    //   .then(data => setUser(data))
    //   .catch(e => setErr(e.message))
    //   .finally(() => setLoading(false));
    const timer = setTimeout(() => setLoading(false), 300); // simulação rápida
    return () => clearTimeout(timer);
  }, []);

  function savePrefs(e) {
    e.preventDefault();
    alert('Salvar preferências (placeholder). Em breve conectamos na API.');
  }

  return (
    <>
      <Helmet>
        <title>Perfil - Oh My Freud!</title>
        <meta name="description" content="Veja e edite suas informações de perfil e preferências." />
      </Helmet>

      <div className="card" style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1>Seu Perfil</h1>
        {loading ? (
          <>
            <div className="space"></div>
            <p className="small">Carregando...</p>
          </>
        ) : err ? (
          <>
            <div className="space"></div>
            <p className="small" style={{ color: '#ff8da1' }}>{err}</p>
          </>
        ) : (
          <>
            <div className="space"></div>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>E-mail:</strong> {user.email}</p>
            <p><strong>Premium:</strong> {user.premium ? 'Ativo' : 'Inativo'}</p>

            <div className="space"></div>
            <hr style={{ borderColor: '#23232a' }} />
            <div className="space"></div>

            <form onSubmit={savePrefs}>
              <label className="small">Idioma preferido</label>
              <select
                className="input"
                value={user.locale}
                onChange={(e) => setUser((u) => ({ ...u, locale: e.target.value }))}
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="hi">हिंदी</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </select>

              <div className="space"></div>
              <button className="btn" type="submit">Salvar preferências</button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
