import { createContext, useEffect, useState } from 'react';

interface ThemeProps {
  theme: any;
  setTheme: any;
}

export const ThemeContext = createContext({} as ThemeProps);

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'light';
    }
  }

  // If you want to use light theme as the default,
  // return "light" instead
  return 'light';
};

export const ThemeProvider = ({ initialTheme, children }: any) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const rawSetTheme = (theme: any) => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);

    localStorage.setItem('color-theme', theme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
