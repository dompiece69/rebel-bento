import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'banksy' | 'pixel' | 'futuristic';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: AppTheme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'banksy',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<AppTheme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('rebel-bento-theme') as AppTheme | null;
    if (saved && ['banksy', 'pixel', 'futuristic'].includes(saved)) {
      setThemeState(saved);
    }
    setMounted(true);
  }, []);

  // Save to localStorage and apply to DOM
  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('rebel-bento-theme', newTheme);
    document.documentElement.setAttribute('data-rebel-theme', newTheme);
  };

  // Apply theme on mount and change
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-rebel-theme', theme);
    }
  }, [theme, mounted]);

  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
