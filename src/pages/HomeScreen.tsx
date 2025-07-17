import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, Image } from "react-native";

// Props interface for HomeScreen
interface HomeScreenProps {
  onNavigateToSettings: () => void;
  onNavigateToSessions: () => void;
}

/**
 * HomeScreen component implementing the final design
 * Features the Fuzzle app with neomorphism styling
 * Shows main navigation buttons as per the design mockup
 */
export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToSettings,
  onNavigateToSessions,
}) => {
  // Handle start new session button press
  const handleStartNewSession = () => {
    console.log("Start new session pressed");
    // TODO: Implement navigation to new session screen
  };

  // Handle points tally button press
  const handlePointsTally = () => {
    console.log("Points tally pressed");
    // TODO: Implement navigation to points tally screen
  };

  // Handle help button press
  const handleHelp = () => {
    console.log("Help pressed");
    // TODO: Implement help functionality
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0F0F3",
    },
    content: {
      flex: 1,
      paddingHorizontal: 33,
      paddingTop: Platform.OS === "ios" ? 70 : 40,
    },
    title: {
      fontSize: 30,
      fontWeight: "600",
      color: "#000000",
      textAlign: "center",
      marginBottom: 100,
      fontFamily: "MavenPro-SemiBold",
      userSelect: "none",
      textShadowColor: "rgba(0, 0, 0, 0.25)",
      textShadowOffset: { width: 0, height: 4 },
      textShadowRadius: 4,
    },
    startSessionContainer: {
      alignItems: "center",
      marginBottom: 30,
      position: "relative",
    },
    catImage: {
      width: 240,
      height: 200,
      position: "absolute",
      top: -110,
      right: 10,
      zIndex: 2,
    },
    startSessionButton: {
      width: 294,
      height: 98,
      borderRadius: 20,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      // Web requires boxShadow instead of individual shadow properties
      boxShadow:
        Platform.OS === "web"
          ? "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px #FFFFFF"
          : undefined,
      // Fallback shadows for native platforms
      shadowColor: Platform.OS !== "web" ? "#000" : undefined,
      shadowOffset: Platform.OS !== "web" ? { width: 0, height: 2 } : undefined,
      shadowOpacity: Platform.OS !== "web" ? 0.1 : undefined,
      shadowRadius: Platform.OS !== "web" ? 4 : undefined,
      elevation: Platform.OS === "android" ? 3 : 0,
    },
    mainButton: {
      width: 294,
      height: 98,
      borderRadius: 20,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
      alignSelf: "center",
      // Web requires boxShadow instead of individual shadow properties
      boxShadow:
        Platform.OS === "web"
          ? "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px #FFFFFF"
          : undefined,
      // Fallback shadows for native platforms
      shadowColor: Platform.OS !== "web" ? "#000" : undefined,
      shadowOffset: Platform.OS !== "web" ? { width: 0, height: 2 } : undefined,
      shadowOpacity: Platform.OS !== "web" ? 0.1 : undefined,
      shadowRadius: Platform.OS !== "web" ? 4 : undefined,
      elevation: Platform.OS === "android" ? 3 : 0,
    },
    mainButtonText: {
      fontSize: 24,
      fontWeight: "500",
      color: "#000000",
      textAlign: "center",
      fontFamily: "MavenPro-Medium",
      userSelect: "none",
    },
    startSessionText: {
      fontSize: 24,
      fontWeight: "500",
      color: "#000000",
      textAlign: "center",
      fontFamily: "MavenPro-Medium",
      userSelect: "none",
    },
    bottomButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 32,
      paddingBottom: Platform.OS === "ios" ? 40 : 20,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    circularButton: {
      width: 86,
      height: 80,
      borderRadius: 70,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      // Web requires boxShadow instead of individual shadow properties
      boxShadow:
        Platform.OS === "web"
          ? "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px #FFFFFF"
          : undefined,
      // Fallback shadows for native platforms
      shadowColor: Platform.OS !== "web" ? "#000" : undefined,
      shadowOffset: Platform.OS !== "web" ? { width: 0, height: 2 } : undefined,
      shadowOpacity: Platform.OS !== "web" ? 0.1 : undefined,
      shadowRadius: Platform.OS !== "web" ? 4 : undefined,
      elevation: Platform.OS === "android" ? 3 : 0,
    },
    circularButtonText: {
      fontSize: 24,
      color: "#A3ADB2",
      fontWeight: "400",
      userSelect: "none",
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F0F3" />
      
      <View style={styles.content}>
        <Text style={styles.title} selectable={false}>
          Fuzzle
        </Text>

        <View style={styles.startSessionContainer}>
          <Image
            source={require("../../assets/cat3.png")}
            style={styles.catImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.startSessionButton}
            onPress={handleStartNewSession}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Start new session"
          >
            <Text style={styles.startSessionText} selectable={false}>
              Start new session
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={handlePointsTally}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Points tally"
        >
          <Text style={styles.mainButtonText} selectable={false}>
            Points tally
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={onNavigateToSessions}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="View past sessions"
        >
          <Text style={styles.mainButtonText} selectable={false}>
            View past sessions
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.circularButton}
          onPress={handleHelp}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Help"
        >
          <Text style={styles.circularButtonText} selectable={false}>
            ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.circularButton}
          onPress={onNavigateToSettings}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Settings"
        >
          <Text style={styles.circularButtonText} selectable={false}>
            ⚙
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
