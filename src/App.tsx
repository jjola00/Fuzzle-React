import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Button, ErrorBoundary } from "@/components";
import {
  HomeScreen,
  LoadingScreen,
  SettingsScreen,
  AccountSettingsScreen,
  StudyLogsScreen,
  StudyTimerScreen,
  StudySessionScreen,
  EndEarlyConfirmScreen,
} from "@/pages";

// Define screen types for navigation
type ScreenType =
  | "loading"
  | "home"
  | "settings"
  | "account"
  | "sessions"
  | "timer"
  | "inProgress"
  | "confirmEnd";

/**
 * Main AppContent component
 * Handles navigation between screens with proper props passing
 * Clean implementation without external navigation buttons
 */
const AppContent: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("loading");
  const [activeSessionMinutes, setActiveSessionMinutes] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load fonts on component mount
  useEffect(() => {
    Font.loadAsync({
      "MavenPro-Regular": require("../assets/fonts/MavenPro-Regular.ttf"),
      "MavenPro-Medium": require("../assets/fonts/MavenPro-Medium.ttf"),
      "MavenPro-SemiBold": require("../assets/fonts/MavenPro-SemiBold.ttf"),
      "MavenPro-Bold": require("../assets/fonts/MavenPro-Bold.ttf"),
      "MavenPro-ExtraBold": require("../assets/fonts/MavenPro-ExtraBold.ttf"),
      "MavenPro-Black": require("../assets/fonts/MavenPro-Black.ttf"),
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

  // Render HomeScreen with navigation callbacks
  const renderHomeScreen = () => (
    <HomeScreen
      onNavigateToSettings={() => navigateToScreen("settings")}
      onNavigateToSessions={() => navigateToScreen("sessions")}
      onNavigateToTimer={() => navigateToScreen("timer")}
    />
  );

  // Render SettingsScreen with navigation callbacks
  const renderSettingsScreen = () => (
    <SettingsScreen
      onNavigateBack={() => navigateToScreen("home")}
      onNavigateToAccount={() => navigateToScreen("account")}
    />
  );

  // Render AccountSettingsScreen with navigation callback
  const renderAccountSettingsScreen = () => (
    <AccountSettingsScreen
      onNavigateBack={() => navigateToScreen("settings")}
    />
  );

  // Render StudySessionsScreen with navigation callback
  const renderStudySessionsScreen = () => (
    <StudyLogsScreen onNavigateBack={() => navigateToScreen("home")} />
  );

  // Render StudySessionTimerScreen with navigation callbacks
  const renderStudySessionTimerScreen = () => (
    <StudyTimerScreen
      onNavigateBack={() => navigateToScreen("home")}
      onStartSession={(minutes: number) => {
        console.log(`Starting ${minutes} minute session`);
        setActiveSessionMinutes(minutes);
        setRemainingSeconds(minutes * 60);
        navigateToScreen("inProgress");
      }}
    />
  );

  // Render active study session screen
  const renderStudySessionInProgressScreen = () => (
    <StudySessionScreen
      totalMinutes={activeSessionMinutes}
      onEndSession={() => navigateToScreen("home")}
      initialRemainingSeconds={remainingSeconds}
      onRequestEndEarly={(secs: number) => {
        setRemainingSeconds(secs);
        navigateToScreen("confirmEnd");
      }}
    />
  );

  const renderEndEarlyConfirmScreen = () => (
    <EndEarlyConfirmScreen
      remainingSeconds={remainingSeconds}
      onConfirmWithPoints={() => navigateToScreen("home")}
      onConfirmWithoutPoints={() => navigateToScreen("home")}
      onCancel={() => navigateToScreen("inProgress")}
      onNavigateBack={() => navigateToScreen("inProgress")}
    />
  );

  // Render appropriate screen based on current state
  const renderScreen = () => {
    switch (currentScreen) {
      case "loading":
        return renderLoadingScreen();
      case "home":
        return renderHomeScreen();
      case "settings":
        return renderSettingsScreen();
      case "account":
        return renderAccountSettingsScreen();
      case "sessions":
        return renderStudySessionsScreen();
      case "timer":
        return renderStudySessionTimerScreen();
      case "inProgress":
        return renderStudySessionInProgressScreen();
      case "confirmEnd":
        return renderEndEarlyConfirmScreen();
      default:
        return renderHomeScreen();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      {renderScreen()}
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
