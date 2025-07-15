import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Theme } from '@/types';
import { defaultTheme, darkTheme } from '@/utils/theme';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

/**
 * Context for theme management across the app
 * Provides theme state and functions to update it
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

/**
 * ThemeProvider component that manages theme state
 * Wraps the app to provide theme context to all components
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = defaultTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  /**
   * Toggles between light and dark theme
   * Uses useCallback to prevent unnecessary re-renders
   */
  const toggleTheme = useCallback(() => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      setTheme(newMode ? darkTheme : defaultTheme);
      return newMode;
    });
  }, []);

  /**
   * Sets a custom theme
   * Allows for theme customization beyond light/dark modes
   */
  const setCustomTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    // Determine if the new theme is dark based on background color
    const isDark =
      newTheme.colors.background === '#000000' ||
      newTheme.colors.background.toLowerCase().includes('dark');
    setIsDarkMode(isDark);
  }, []);

  const value: ThemeContextType = {
    theme,
    isDarkMode,
    toggleTheme,
    setTheme: setCustomTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * Custom hook to access theme context
 * Provides type-safe access to theme state and functions
 * Throws error if used outside of ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
