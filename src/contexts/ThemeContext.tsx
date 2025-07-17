import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { Theme } from "@/types";
import { defaultTheme, darkTheme, lightTheme } from "@/utils/theme";

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
  const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Toggle between light and dark themes
   * Updates both the theme state and dark mode flag
   */
  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newDarkMode = !prev;
      setCurrentTheme(newDarkMode ? darkTheme : lightTheme);
      return newDarkMode;
    });
  }, []);

  /**
   * Manually set a specific theme
   * Useful for custom theme configurations
   */
  const setTheme = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    // Update dark mode flag based on theme colors
    setIsDarkMode(theme.colors.background === "#000000");
  }, []);

  const value = useMemo(
    () => ({
      theme: currentTheme,
      isDarkMode,
      toggleTheme,
      setTheme,
    }),
    [currentTheme, isDarkMode, toggleTheme, setTheme],
  );

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
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
