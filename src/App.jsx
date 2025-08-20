import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Onboarding from '@/pages/Onboarding';
import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import DreamEntry from '@/pages/DreamEntry';
import DreamInterpretation from '@/pages/DreamInterpretation';
import DreamDiary from '@/pages/DreamDiary';
import Exercises from '@/pages/Exercises';
import Progress from '@/pages/Progress';
import Profile from '@/pages/Profile';
import Admin from '@/pages/Admin';
import Paywall from '@/pages/Paywall';
import MainLayout from '@/components/layout/MainLayout';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  return user ? children : <Navigate to="/auth" />;
}

function App() {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>Oh My Freud!</title>
        <meta
          name="description"
          content="Registre seus sonhos e descubra interpretações inspiradas na psicanálise clássica."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lora:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />

          <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
            <Route path="/" element={<Home />} />
            <Route path="/dream/new" element={<DreamEntry />} />
            <Route path="/dream/:id/interpretation" element={<DreamInterpretation />} />
            <Route path="/journal" element={<DreamDiary />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/premium" element={<Paywall />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
