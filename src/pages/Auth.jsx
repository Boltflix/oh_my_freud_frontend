import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

/**
 * Esta página é um placeholder simples de Login/Registro.
 * Quando adicionarmos os contexts (`AuthContext`) e a lib de API,
 * trocaremos os alerts por chamadas reais ao backend.
 */

const Auth = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      // No próximo pacote conectaremos com o backend:
      // POST /api/auth/login  ou  POST /api/auth/signup
      if (mode === 'login') {
        alert(`Login (placeholder)\nemail: ${email}`);
      } else {
        alert(`Cadastro (placeholder)\nname: ${name}\nemail: ${email}`);
      }
    } catch (error) {
      setErr(error.message || 'Erro de autenticação.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>{mode === 'login' ? 'Entrar' : 'Criar conta'} - Oh My Freud!</title>
        <meta
          name="description"
          content="Acesse sua conta para salvar sonhos, acompanhar interpretações e gerenciar o Premium."
        />
      </Helmet>

      <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <button
            className="btn"
            type="button"
            onClick={() => setMode('login')}
            disabled={mode === 'login'}
          >
            Entrar
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => setMode('signup')}
            disabled={mode === 'signup'}
          >
            Criar conta
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <label className="small">Nome</label>
              <input
                className="input"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="space"></div>
            </>
          )}

          <label className="small">E-mail</label>
          <input
            className="input"
            type="email"
            placeholder="voce@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="space"></div>

          <label className="small">Senha</label>
          <input
            className="input"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="space"></div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Enviando...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>

          {err && (
            <>
              <div className="space"></div>
              <div className="small" style={{ color: '#ff8da1' }}>{err}</div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Auth;
