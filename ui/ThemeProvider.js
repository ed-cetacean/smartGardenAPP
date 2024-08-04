
// -------------------------------------------------------------------------- //

import { COLORS } from './Styles';

import { useColorScheme } from 'react-native';
import React, { createContext, useState, useContext } from 'react';

// -------------------------------------------------------------------------- //

// CONTEXT: ThemeContext.
const ThemeContext = createContext();

// PROVIDER: ThemeProvider.
export const ThemeProvider = ({ children }) => {
    const scheme = useColorScheme(); // Detecta el tema del sistema.
    const [ theme, setTheme ] = useState(scheme === 'dark' ? 'dark' : 'light');
    const themePallete = theme === 'dark' ? COLORS.darkPallete : COLORS.lightPallete;

    // ---------------------------------------------------------------------- //

    // Cambia el tema manualmente.
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // ---------------------------------------------------------------------- //

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, themePallete, isDark: theme === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    );

};

// -------------------------------------------------------------------------- //

// Hook para usar el contexto del tema.
export const useTheme = () => useContext(ThemeContext);

// -------------------------------------------------------------------------- //
