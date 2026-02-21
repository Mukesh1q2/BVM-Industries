"use client";
import { createContext, useContext, useEffect, type ReactNode } from 'react';

type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void; // Kept for type compatibility, but does nothing
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme: Theme = 'dark';

  useEffect(() => {
    // Apply strict dark theme to document
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  const toggleTheme = () => {
    // No-op: Dark theme is strictly enforced for premium B2B branding
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
