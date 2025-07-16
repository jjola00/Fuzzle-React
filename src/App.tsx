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
 * Shows LoadingScreen first, then allows navigation between different screens
 * Demonstrates screen switching for design/testing
 */
const AppContent: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('loading');

  // Handler to switch screens
  const navigateToScreen = (screen: ScreenType) => setCurrentScreen(screen);

  // Debug logs
  console.log('AppContent rendering, currentScreen:', currentScreen);
  console.log('Theme:', theme);

  // Safety check to ensure theme is loaded
  if (!theme) {
    console.log('Theme not loaded, returning null');
    return null;
  }

  // Render loading screen with navigation options
  const renderLoadingScreen = () => (
    <>
      <LoadingScreen />
      <View style={{ 
        alignItems: 'center', 
        marginTop: theme.spacing.lg,
        backgroundColor: '#00FF00', // Green background for debugging
        padding: theme.spacing.md,
        gap: theme.spacing.md,
      }}>
        <Button
          title="Continue to Home Screen"
          variant="primary"
          onPress={() => navigateToScreen('home')}
          testID="continue-button"
        />
        <Button
          title="Go to Settings"
          variant="secondary"
          onPress={() => navigateToScreen('settings')}
          testID="settings-button"
        />
      </View>
    </>
  );

  // Render home screen with navigation to settings
  const renderHomeScreen = () => (
    <>
      <HomeScreen />
      <View style={{ 
        alignItems: 'center', 
        padding: theme.spacing.md,
        backgroundColor: '#FFFF00', // Yellow background for debugging
        gap: theme.spacing.md,
      }}>
        <Button
          title="Go to Settings"
          variant="secondary"
          onPress={() => navigateToScreen('settings')}
          testID="home-settings-button"
        />
        <Button
          title="Back to Loading"
          variant="outline"
          onPress={() => navigateToScreen('loading')}
          testID="back-loading-button"
        />
      </View>
    </>
  );

  // Render settings screen with back navigation
  const renderSettingsScreen = () => (
    <>
      <SettingsScreen />
      <View style={{ 
        alignItems: 'center', 
        padding: theme.spacing.md,
        backgroundColor: '#00FFFF', // Cyan background for debugging
        gap: theme.spacing.md,
      }}>
        <Button
          title="Back to Home"
          variant="outline"
          onPress={() => navigateToScreen('home')}
          testID="settings-back-button"
        />
        <Button
          title="Back to Loading"
          variant="text"
          onPress={() => navigateToScreen('loading')}
          testID="settings-loading-button"
        />
      </View>
    </>
  );

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: theme.colors.background,
      // Add a bright border to make sure container is visible
      borderWidth: 2,
      borderColor: '#FF0000' // Red border for debugging
    }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      {currentScreen === 'loading' && renderLoadingScreen()}
      {currentScreen === 'home' && renderHomeScreen()}
      {currentScreen === 'settings' && renderSettingsScreen()}
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
