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

interface SettingsScreenProps {
  onNavigateBack: () => void;
}

/**
 * SettingsScreen component implementing the Figma design
 * Features neumorphism styling and menu structure
 * Follows project requirements for component structure
 */
export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigateBack,
}) => {
  // Example settings data
  const settingsItems = [
    {
      title: "Account",
      icon: "👤",
      action: () => console.log("Account pressed"),
    },
    {
      title: "Privacy",
      icon: "🔒",
      action: () => console.log("Privacy pressed"),
    },
    {
      title: "Notifications",
      icon: "🔔",
      action: () => console.log("Notifications pressed"),
    },
    {
      title: "Appearance",
      icon: "🎨",
      action: () => console.log("Appearance pressed"),
    },
    {
      title: "Language",
      icon: "🌐",
      action: () => console.log("Language pressed"),
    },
    {
      title: "Help & Support",
      icon: "❓",
      action: () => console.log("Help pressed"),
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
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: "#F0F0F3",
      ...(Platform.OS !== "web" && {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      }),
    },
    backButton: {
      marginRight: 16,
    },
    backButtonText: {
      fontSize: 16,
      color: "#A3ADB2",
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: "#000000",
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    menuItem: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: "#F0F0F3",
      marginVertical: 4,
      borderRadius: 8,
      ...(Platform.OS !== "web" && {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }),
    },
    menuItemText: {
      fontSize: 16,
      fontWeight: "500",
      color: "#000000",
    },
  });

  const renderMenuItem = (item: (typeof settingsItems)[0]) => (
    <TouchableOpacity
      key={item.title}
      style={[styles.menuItem]}
      onPress={item.action}
      activeOpacity={0.95}
    >
      <Text style={styles.menuItemText} selectable={false}>
        {item.icon} {item.title}
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

        <Text style={styles.headerTitle} selectable={false}>
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
