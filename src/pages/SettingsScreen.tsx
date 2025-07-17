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
 * SettingsScreen component implementing the exact Figma design
 * Features neumorphism styling and exact menu structure from design
 * Uses Maven Pro font and specific measurements from Figma
 */
export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigateBack,
}) => {
  // Menu items matching the exact Figma design
  const settingsItems = [
    {
      title: "My account",
      action: () => console.log("My account pressed"),
    },
    {
      title: "Point tally",
      action: () => console.log("Point tally pressed"),
    },
    {
      title: "Report a bug",
      action: () => console.log("Report a bug pressed"),
    },
    {
      title: "Leave a review",
      action: () => console.log("Leave a review pressed"),
    },
    {
      title: "Privacy policy",
      action: () => console.log("Privacy policy pressed"),
    },
    {
      title: "Terms of service",
      action: () => console.log("Terms of service pressed"),
    },
  ];

  const handleBackPress = () => {
    onNavigateBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0F0F3",
      width: 375,
      height: 812,
      position: "relative",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 21,
      paddingTop: 58,
      paddingBottom: 20,
      backgroundColor: "#F0F0F3",
    },
    backButton: {
      width: 40,
      height: 40,
      backgroundColor: "#F0F0F3",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
      ...(Platform.OS !== "web" && {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -5, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
      }),
      // Additional shadow for neumorphic effect
      ...(Platform.OS !== "web" && {
        shadowColor: "rgba(174, 174, 192, 0.3)",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 10,
      }),
    },
    backButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#A3ADB2",
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "600",
      color: "#000000",
      fontFamily: Platform.OS === "ios" ? "Maven Pro" : "Maven Pro",
      lineHeight: 13,
      textAlign: "center",
      flex: 1,
      marginRight: 56, // Compensate for back button width
    },
    content: {
      flex: 1,
      paddingHorizontal: 27,
      paddingTop: 20,
    },
    menuItem: {
      width: 321,
      height: 80,
      backgroundColor: "#F0F0F3",
      marginBottom: 15,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      // Neumorphic shadow effect from Figma
      ...(Platform.OS !== "web" && {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -5, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
      }),
      // Secondary shadow for depth
      ...(Platform.OS === "android" && {
        elevation: 10,
      }),
    },
    menuItemText: {
      fontSize: 20,
      fontWeight: "500",
      color: "#000000",
      fontFamily: Platform.OS === "ios" ? "Maven Pro" : "Maven Pro",
      lineHeight: 24,
      textAlign: "center",
    },
    // Individual positioning for web shadow effects
    menuItemShadow: {
      ...(Platform.OS === "web" && {
        boxShadow: "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px #FFFFFF",
      }),
    },
    backButtonShadow: {
      ...(Platform.OS === "web" && {
        boxShadow: "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px #FFFFFF",
      }),
    },
  });

  const renderMenuItem = (item: (typeof settingsItems)[0], index: number) => (
    <TouchableOpacity
      key={`${item.title}-${index}`}
      style={[styles.menuItem, styles.menuItemShadow]}
      onPress={item.action}
      activeOpacity={0.95}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${item.title} settings option`}
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
          style={[styles.backButton, styles.backButtonShadow]}
          onPress={handleBackPress}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back to previous screen"
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
