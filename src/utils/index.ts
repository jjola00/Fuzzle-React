// Utility functions for the Fuzzle React Native app
// Co-located with related utilities following the suggested structure

/**
 * Utility function to validate email format
 * Uses regex pattern to check for valid email structure
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Utility function to format currency values
 * Handles proper localization and formatting
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * Debounce function to limit the rate of function calls
 * Useful for search inputs and other high-frequency events
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (..._args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(..._args), delay);
  };
};

/**
 * Utility function to generate unique IDs
 * Simple implementation for demonstration purposes
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Utility function to safely parse JSON
 * Returns null if parsing fails, preventing errors
 */
export const safeJsonParse = <T>(jsonString: string): T | null => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
};

/**
 * Utility function to capitalize first letter of string
 * Handles edge cases like empty strings
 */
export const capitalizeFirst = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
