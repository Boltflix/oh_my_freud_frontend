import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();
const STORAGE_KEY = 'ohMyFreudUser';

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch (_) {
      // ignore parse errors
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync auth state across tabs/windows
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const persist = (u) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  // ---- MOCK FLOWS (fáceis de trocar por Supabase depois) ----
  const login = async (email, _password) => {
    try {
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        locale: 'pt-BR',
        plan: 'free',
        planExpiresAt: null,
        credits: 3,
        createdAt: new Date().toISOString(),
      };
      persist(mockUser);
      return mockUser;
    } catch (err) {
      throw new Error('Falha no login.');
    }
  };

  const register = async (email, _password, name) => {
    try {
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
        locale: 'pt-BR',
        plan: 'free',
        planExpiresAt: null,
        credits: 3,
        createdAt: new Date().toISOString(),
      };
      persist(mockUser);
      return mockUser;
    } catch {
      throw new Error('Falha no registro.');
    }
  };

  const loginAsGuest = () => {
    const guestUser = {
      id: `guest-${Date.now()}`,
      name: 'Convidado',
      email: 'guest@ohmyfreud.app',
      isGuest: true,
      plan: 'free',
      planExpiresAt: null,
      credits: 1,
      createdAt: new Date().toISOString(),
    };
    persist(guestUser);
    return guestUser;
  };

  const logout = () => persist(null);

  const updateUser = (updates) => {
    const updated = { ...(user || {}), ...updates };
    persist(updated);
  };

  const isPremium = () => {
    if (!user || user.isGuest) return false;
    if (user.plan !== 'premium') return false;
    if (!user.planExpiresAt) return true;
    return new Date(user.planExpiresAt) > new Date();
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      updateUser,
      isPremium,
      loginAsGuest,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
