import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { DreamProvider } from '@/context/DreamContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DreamProvider>
          <App />
          <Toaster />
        </DreamProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
