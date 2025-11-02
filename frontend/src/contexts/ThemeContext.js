import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'rd-station-theme';

const applyThemeToDocument = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

const getStoredTheme = () => {
  return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
};

const saveThemeToStorage = (theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const initialTheme = getStoredTheme();
    applyThemeToDocument(initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    applyThemeToDocument(theme);
    saveThemeToStorage(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('Toggling theme from', prevTheme, 'to', newTheme);
      return newTheme;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
