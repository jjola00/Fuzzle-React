import React, { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { Button, ErrorBoundary } from '@/components';
import { HomeScreen, LoadingScreen, SettingsScreen } from '@/pages';

// Define screen types for navigation
type ScreenType = 'loading' | 'home' | 'settings';

/**
 * Main AppContent component
 * Handles navigation between screens with proper props passing
 * Clean implementation without external navigation buttons
 */
const AppContent: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('loading');

  // Handler to switch screens
  const navigateToScreen = (screen: ScreenType) => {
    console.log('=== NAVIGATE TO SCREEN ===');
    console.log('Current screen:', currentScreen);
    console.log('Target screen:', screen);
    setCurrentScreen(screen);
    console.log('setCurrentScreen called');
    console.log('=== END NAVIGATE TO SCREEN ===');
  };

  // Debug logs
  console.log('AppContent rendering, currentScreen:', currentScreen);
  console.log('Theme:', theme);

  // Safety check to ensure theme is loaded
  if (!theme) {
    console.log('Theme not loaded, returning null');
    return null;
  }

  // Render loading screen with continue button
  const renderLoadingScreen = () => (
    <>
      <LoadingScreen />
      <View style={{ 
        alignItems: 'center', 
        marginTop: theme.spacing.lg,
        padding: theme.spacing.md,
      }}>
        <Button
          title="Continue to Home Screen"
          variant="primary"
          onPress={() => navigateToScreen('home')}
          testID="continue-button"
        />
      </View>
    </>
  );

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: theme.colors.background,
    }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      {currentScreen === 'loading' && renderLoadingScreen()}
      {currentScreen === 'home' && (
        <HomeScreen 
          onNavigateToSettings={() => navigateToScreen('settings')}
        />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen 
          onNavigateBack={() => {
            console.log('=== SETTINGS SCREEN onNavigateBack CALLED ===');
            console.log('About to call navigateToScreen(home)');
            navigateToScreen('home');
            console.log('navigateToScreen(home) completed');
            console.log('=== END SETTINGS SCREEN onNavigateBack ===');
          }}
        />
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
