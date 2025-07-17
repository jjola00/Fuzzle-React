import { Theme } from "@/types";

/**
 * Default theme configuration for the Fuzzle app
 * Provides a consistent design system with accessibility in mind
 */
export const defaultTheme: Theme = {
  colors: {
    primary: "#007AFF",
    secondary: "#5856D6",
    background: "#FFFFFF",
    surface: "#F2F2F7",
    text: "#000000",
    textSecondary: "#8E8E93",
    error: "#FF3B30",
    success: "#30D158",
    warning: "#FF9500",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
};

/**
 * Light theme configuration (alias for defaultTheme)
 * Provides consistency with dark theme naming
 */
export const lightTheme: Theme = defaultTheme;

/**
 * Dark theme configuration for the Fuzzle app
 * Provides dark mode support with proper contrast ratios
 */
export const darkTheme: Theme = {
  colors: {
    primary: "#0A84FF",
    secondary: "#5E5CE6",
    background: "#000000",
    surface: "#1C1C1E",
    text: "#FFFFFF",
    textSecondary: "#8E8E93",
    error: "#FF453A",
    success: "#32D74B",
    warning: "#FF9F0A",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
};

/**
 * Utility function to get theme colors with proper type safety
 */
export const getThemeColor = (
  theme: Theme,
  colorKey: keyof Theme["colors"],
): string => {
  return theme.colors[colorKey];
};

/**
 * Utility function to get theme spacing with proper type safety
 */
export const getThemeSpacing = (
  theme: Theme,
  spacingKey: keyof Theme["spacing"],
): number => {
  return theme.spacing[spacingKey];
};
