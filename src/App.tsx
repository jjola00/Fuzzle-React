import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { Button, ErrorBoundary } from '@/components';

/**
 * Main App Content component
 * Demonstrates component hierarchy and theme usage
 * Follows one-way data flow and composition patterns
 */
const AppContent: React.FC = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  /**
   * Styles derived from theme state
   * Demonstrates immutable patterns and theme integration
   */
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xl,
      textAlign: 'center',
    },
    buttonContainer: {
      gap: theme.spacing.md,
      width: '100%',
      maxWidth: 300,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <Text style={styles.title}>Welcome to Fuzzle!</Text>

      <Text style={styles.subtitle}>
        A React Native app built with TypeScript, following modern best
        practices
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          variant="primary"
          size="large"
          onPress={toggleTheme}
          testID="theme-toggle-button"
        />

        <Button
          title="Secondary Button"
          variant="secondary"
          size="medium"
          onPress={() => console.log('Secondary button pressed')}
          testID="secondary-button"
        />

        <Button
          title="Outline Button"
          variant="outline"
          size="medium"
          onPress={() => console.log('Outline button pressed')}
          testID="outline-button"
        />
      </View>
    </View>
  );
};

/**
 * Main App component with theme provider, error boundary, and React.StrictMode
 * Demonstrates composition over inheritance
 * Wraps the app with necessary providers and development tools
 */
export const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};
