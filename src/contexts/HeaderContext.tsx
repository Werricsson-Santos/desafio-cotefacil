import React, { createContext, useState, useContext, type ReactNode } from 'react';

interface HeaderContextType {
  title: string;
  setTitle: (title: string) => void;
  actions: ReactNode | null;
  setActions: (actions: ReactNode | null) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState('Página Inicial'); // Título padrão
  const [actions, setActions] = useState<ReactNode | null>(null);

  return (
    <HeaderContext.Provider value={{ title, setTitle, actions, setActions }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};