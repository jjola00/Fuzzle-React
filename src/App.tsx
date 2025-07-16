import React, { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { Button, ErrorBoundary } from '@/components';
import { HomeScreen } from '@/pages/HomeScreen';
import { LoadingScreen } from '@/pages/LoadingScreen';

/**
 * Main AppContent component
 * Shows LoadingScreen first, then HomeScreen after toggle
 * Demonstrates screen switching for design/testing
 */
const AppContent: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const [showHome, setShowHome] = useState(false);

  // Handler to switch from loading to home screen
  const handleContinue = () => setShowHome(true);

  // Debug logs
  console.log('AppContent rendering, showHome:', showHome);
  console.log('Theme:', theme);

  // Safety check to ensure theme is loaded
  if (!theme) {
    console.log('Theme not loaded, returning null');
    return null;
  }

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: theme.colors.background,
      // Add a bright border to make sure container is visible
      borderWidth: 2,
      borderColor: '#FF0000' // Red border for debugging
    }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      {!showHome ? (
        <>
          <LoadingScreen />
          <View style={{ 
            alignItems: 'center', 
            marginTop: theme.spacing.lg,
            backgroundColor: '#00FF00', // Green background for debugging
            padding: theme.spacing.md
          }}>
            <Button
              title="Continue to Home Screen"
              variant="primary"
              onPress={handleContinue}
              testID="continue-button"
            />
          </View>
        </>
      ) : (
        <HomeScreen />
      )}
    </View>
  );
};

/**
 * Main App component with theme provider, error boundary, and React.StrictMode
 * Demonstrates composition over inheritance
 * Wraps the app with necessary providers and development tools
 */
export const App: React.FC = () => {
  console.log('App component rendering');
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
