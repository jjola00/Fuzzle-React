import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
// Remove unused import
// import { useTheme } from "@/contexts/ThemeContext";

interface SettingsScreenProps {
  onNavigateBack: () => void;
  onNavigateToAccount: () => void;
}

/**
 * SettingsScreen component implementing the Figma design
 * Features neumorphism styling and menu structure
 * Follows project requirements for component structure
 */
export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigateBack,
  onNavigateToAccount,
}) => {
  // Remove unused theme variable
  // const { theme } = useTheme();

  // Settings menu items based on the Figma design
  const settingsItems = [
    {
      id: "account",
      title: "My account",
      onPress: onNavigateToAccount,
    },
    {
      id: "points",
      title: "Point tally",
      onPress: () => console.log("Point tally pressed"),
    },
    {
      id: "bug",
      title: "Report a bug",
      onPress: () => console.log("Report a bug pressed"),
    },
    {
      id: "review",
      title: "Leave a review",
      onPress: () => console.log("Leave a review pressed"),
    },
    {
      id: "privacy",
      title: "Privacy policy",
      onPress: () => console.log("Privacy policy pressed"),
    },
    {
      id: "terms",
      title: "Terms of service",
      onPress: () => console.log("Terms of service pressed"),
    },
  ];

  const handleBackPress = () => {
    onNavigateBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0F0F3",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 21,
      paddingTop: Platform.OS === "ios" ? 58 : 20,
      paddingBottom: 20,
      backgroundColor: "#F0F0F3",
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      position: "relative",
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
    backButtonText: {
      fontSize: 20,
      color: "#A3ADB2",
      fontWeight: "400",
      lineHeight: 24,
      userSelect: "none",
    },
    title: {
      fontSize: 28,
      fontWeight: "400",
      color: "#000000",
      textAlign: "center",
      flex: 1,
      marginLeft: -40, // Compensate for back button to center the title
      fontFamily: "MavenPro-SemiBold",
      userSelect: "none",
    },
    content: {
      paddingHorizontal: 29,
      paddingTop: 20,
    },
    menuItem: {
      height: 80,
      borderRadius: 20,
      backgroundColor: "#F0F0F3",
      marginBottom: 15,
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
    menuItemText: {
      fontSize: 20,
      fontWeight: "400",
      color: "#000000",
      textAlign: "center",
      fontFamily: "MavenPro-Medium",
      userSelect: "none",
    },
    // Remove unused menuItemPressed style
  });

  const renderMenuItem = (item: (typeof settingsItems)[0]) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem]}
      onPress={item.onPress}
      activeOpacity={0.95}
    >
      <Text style={styles.menuItemText} selectable={false}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F0F3" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back to home screen"
        >
          <Text style={styles.backButtonText} selectable={false}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.title} selectable={false}>
          Settings
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {settingsItems.map(renderMenuItem)}
      </ScrollView>
    </View>
  );
};
