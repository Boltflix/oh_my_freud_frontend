import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DreamContext = createContext();

export const useDreams = () => {
  const context = useContext(DreamContext);
  if (!context) throw new Error('useDreams must be used within a DreamProvider');
  return context;
};

export const DreamProvider = ({ children }) => {
  const { user } = useAuth();
  const [dreams, setDreams] = useState([]);
  const [interpretations, setInterpretations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helpers de storage por usuário
  const dreamsKey = user ? `dreams_${user.id}` : null;
  const interpsKey = user ? `interpretations_${user.id}` : null;

  useEffect(() => {
    if (!user) {
      setDreams([]);
      setInterpretations([]);
      return;
    }
    loadUserDreams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const loadUserDreams = () => {
    try {
      if (!user) return;
      const savedDreams = localStorage.getItem(dreamsKey);
      const savedInterpretations = localStorage.getItem(interpsKey);
      if (savedDreams) setDreams(JSON.parse(savedDreams));
      if (savedInterpretations) setInterpretations(JSON.parse(savedInterpretations));
    } catch {
      // se houver erro de parse, ignora
      setDreams([]);
      setInterpretations([]);
    }
  };

  const saveDream = async (dreamData) => {
    if (!user) return null;

    const newDream = {
      id: Date.now().toString(),
      userId: user.id,
      title: dreamData.title,
      content: dreamData.content,
      transcription: dreamData.transcription || null,
      dreamDate: dreamData.dreamDate,
      mood: dreamData.mood,
      sleepQuality: dreamData.sleepQuality,
      isRecurring: dreamData.isRecurring || false,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      tags: [],
    };

    const updated = [...dreams, newDream];
    setDreams(updated);
    if (dreamsKey) localStorage.setItem(dreamsKey, JSON.stringify(updated));

    // Gera interpretação mock (AI depois)
    await generateInterpretation(newDream);

    return newDream;
  };

  const generateInterpretation = async (dream) => {
    setLoading(true);
    try {
      // simula latência de IA
      await new Promise((r) => setTimeout(r, 2000));

      const mockInterpretation = {
        id: Date.now().toString(),
        dreamId: dream.id,
        summary:
          'Este sonho revela aspectos profundos do seu inconsciente. Os elementos presentes sugerem uma manifestação de desejos reprimidos e conflitos internos que buscam resolução através da linguagem onírica.',
        fullText:
          'Segundo a análise psicanalítica freudiana, este sonho apresenta características típicas do trabalho do sonho, onde o conteúdo latente se manifesta através de símbolos e metáforas. Os elementos descritos podem representar aspectos da sua personalidade que buscam expressão ou resolução de conflitos inconscientes.',
        symbols: [
          { symbol: 'Água', meaning: 'Representa o inconsciente e as emoções profundas' },
          { symbol: 'Casa', meaning: 'Simboliza o self e a estrutura psíquica' },
          { symbol: 'Animais', meaning: 'Instintos primitivos e impulsos reprimidos' },
          { symbol: 'Voar', meaning: 'Desejo de liberdade e transcendência' },
        ],
        themes: ['Desejos reprimidos', 'Conflitos familiares', 'Busca por identidade', 'Ansiedades do cotidiano'],
        associationPrompts: [
          'Que sentimentos este sonho desperta em você?',
          'Existe alguma situação atual que se relaciona com os elementos do sonho?',
          'Quais memórias da infância este sonho evoca?',
        ],
        cautionNote:
          'Esta interpretação é baseada em conceitos psicanalíticos clássicos e tem propósito educativo e de entretenimento. Não substitui acompanhamento psicológico profissional.',
        createdAt: new Date().toISOString(),
      };

      const updated = [...interpretations, mockInterpretation];
      setInterpretations(updated);
      if (interpsKey) localStorage.setItem(interpsKey, JSON.stringify(updated));

      return mockInterpretation;
    } finally {
      setLoading(false);
    }
  };

  const getDreamInterpretation = (dreamId) =>
    interpretations.find((i) => i.dreamId === dreamId);

  const toggleFavorite = (dreamId) => {
    if (!user) return;
    const updated = dreams.map((d) => (d.id === dreamId ? { ...d, isFavorite: !d.isFavorite } : d));
    setDreams(updated);
    if (dreamsKey) localStorage.setItem(dreamsKey, JSON.stringify(updated));
  };

  const deleteDream = (dreamId) => {
    if (!user) return;
    const updatedDreams = dreams.filter((d) => d.id !== dreamId);
    const updatedInterps = interpretations.filter((i) => i.dreamId !== dreamId);
    setDreams(updatedDreams);
    setInterpretations(updatedInterps);
    if (dreamsKey) localStorage.setItem(dreamsKey, JSON.stringify(updatedDreams));
    if (interpsKey) localStorage.setItem(interpsKey, JSON.stringify(updatedInterps));
  };

  const value = {
    dreams,
    interpretations,
    loading,
    saveDream,
    generateInterpretation,
    getDreamInterpretation,
    toggleFavorite,
    deleteDream,
  };

  return <DreamContext.Provider value={value}>{children}</DreamContext.Provider>;
};
