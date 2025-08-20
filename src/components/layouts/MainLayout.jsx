import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { BookOpen, BarChart2, User, BrainCircuit, Home as HomeIcon } from 'lucide-react';

const MainLayout = () => {
  const navItems = [
    { to: "/", icon: HomeIcon, label: "Início" },
    { to: "/journal", icon: BookOpen, label: "Diário" },
    { to: "/progress", icon: BarChart2, label: "Progresso" },
    { to: "/exercises", icon: BrainCircuit, label: "Exercícios" },
    { to: "/profile", icon: User, label: "Perfil" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col vintage-paper">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="sticky bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.1)]">
        <nav className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center transition-colors w-full h-full ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`
              }
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default MainLayout;
