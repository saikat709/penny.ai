import { createContext, useContext } from 'react';
import type { ThemeContextType } from '../libs/HookTypes';

export const ThemeContext = createContext<ThemeContextType|null>(null);

const useTheme = () => {
   return useContext(ThemeContext);
}; 

export default useTheme;