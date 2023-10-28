import { ReactNode, createContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleMode: () => {},
});

interface ThemeProps {
  children: ReactNode;
}
export const ThemaContextProvider = ({ children }: ThemeProps) => {
  const initialTheme =
    window.localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');

  const [theme, setTheme] = useState(initialTheme);

  const toggleMode = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
