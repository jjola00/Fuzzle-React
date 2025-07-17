import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Font from 'expo-font';
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Button, ErrorBoundary } from "@/components";
import { HomeScreen, LoadingScreen, SettingsScreen, AccountSettingsScreen } from "@/pages";

// Define screen types for navigation
type ScreenType = "loading" | "home" | "settings" | "account";

/**
 * Main AppContent component
 * Handles navigation between screens with proper props passing
 * Clean implementation without external navigation buttons
 */
const AppContent: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("loading");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load fonts on component mount
  useEffect(() => {
    Font.loadAsync({
      'MavenPro-Regular': require('../assets/fonts/MavenPro-Regular.ttf'),
      'MavenPro-Medium': require('../assets/fonts/MavenPro-Medium.ttf'),
      'MavenPro-SemiBold': require('../assets/fonts/MavenPro-SemiBold.ttf'),
      'MavenPro-Bold': require('../assets/fonts/MavenPro-Bold.ttf'),
      'MavenPro-ExtraBold': require('../assets/fonts/MavenPro-ExtraBold.ttf'),
      'MavenPro-Black': require('../assets/fonts/MavenPro-Black.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  // Handler to switch screens
  const navigateToScreen = (screen: ScreenType) => setCurrentScreen(screen);

  // Safety check to ensure theme and fonts are loaded before rendering
  if (!theme || !fontsLoaded) {
    return null;
  }

  // Render loading screen with continue button
  const renderLoadingScreen = () => (
    <>
      <LoadingScreen />
      <View
        style={{
          alignItems: "center",
          marginTop: theme.spacing.lg,
          padding: theme.spacing.md,
        }}
      >
        <Button
          title="Continue to Home Screen"
          variant="primary"
          onPress={() => navigateToScreen("home")}
          testID="continue-button"
        />
      </View>
    </>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      {currentScreen === "loading" && renderLoadingScreen()}
      {currentScreen === "home" && (
        <HomeScreen onNavigateToSettings={() => navigateToScreen("settings")} />
      )}
      {currentScreen === "settings" && (
        <SettingsScreen 
          onNavigateBack={() => navigateToScreen("home")}
          onNavigateToAccount={() => navigateToScreen("account")}
        />
      )}
      {currentScreen === "account" && (
        <AccountSettingsScreen onNavigateBack={() => navigateToScreen("settings")} />
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
