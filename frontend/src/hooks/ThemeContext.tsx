import { createContext, useContext } from 'react';
import { useTheme } from '../useTheme';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const themeValue = useTheme();
  
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
}; 