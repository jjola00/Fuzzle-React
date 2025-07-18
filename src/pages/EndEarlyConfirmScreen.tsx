import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, Image } from "react-native";

interface EndEarlyConfirmScreenProps {
  /** Remaining seconds in the session when user pressed End Early */
  remainingSeconds: number;
  /** Confirm with points – implementation deferred */
  onConfirmWithPoints: () => void;
  /** Confirm with no points – implementation deferred */
  onConfirmWithoutPoints: () => void;
  /** Cancel and resume timer */
  onCancel: () => void;
  /** Navigate back arrow */
  onNavigateBack: () => void;
}

export const EndEarlyConfirmScreen: React.FC<EndEarlyConfirmScreenProps> = ({
  remainingSeconds,
  onConfirmWithPoints,
  onConfirmWithoutPoints,
  onCancel,
  onNavigateBack,
}) => {
  const minutesRemaining = Math.ceil(remainingSeconds / 60);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0F0F3",
      alignItems: "center",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 22,
      paddingTop: Platform.OS === "ios" ? 56 : 20,
      marginBottom: 20,
      justifyContent: "center",
    },
    backButton: {
      position: "absolute",
      left: 22,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      boxShadow:
        Platform.OS === "web"
          ? "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px #FFFFFF"
          : undefined,
      shadowColor: Platform.OS !== "web" ? "#000" : undefined,
      shadowOffset: Platform.OS !== "web" ? { width: 0, height: 2 } : undefined,
      shadowOpacity: Platform.OS !== "web" ? 0.1 : undefined,
      shadowRadius: Platform.OS !== "web" ? 4 : undefined,
      elevation: Platform.OS === "android" ? 3 : 0,
    },
    backText: {
      fontSize: 20,
      color: "#A3ADB2",
      fontWeight: "400",
      userSelect: "none",
    },
    title: {
      fontSize: 28,
      fontWeight: "600",
      color: "#000000",
      fontFamily: "MavenPro-SemiBold",
      userSelect: "none",
      ...(Platform.OS === "web"
        ? { textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }
        : {
            textShadowColor: "rgba(0, 0, 0, 0.25)",
            textShadowOffset: { width: 0, height: 4 },
            textShadowRadius: 4,
          }),
    },
    catImage: {
      width: 248,
      height: 248,
      marginTop: 20,
      marginBottom: 20,
    },
    questionBox: {
      width: 333,
      height: 87,
      backgroundColor: "rgba(246, 246, 246, 0.65)",
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.03)",
      justifyContent: "center",
      alignItems: "center",
      boxShadow:
        Platform.OS === "web"
          ? "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 11px #FFFFFF"
          : undefined,
    },
    questionText: {
      fontSize: 20,
      fontWeight: "500",
      fontFamily: "MavenPro-SemiBold",
      textAlign: "center",
      color: "#000",
    },
    optionRow: {
      flexDirection: "row",
      marginTop: 40,
      marginBottom: 40,
      gap: 16,
    },
    optionButton: {
      width: 160,
      height: 114,
      borderRadius: 20,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      boxShadow:
        Platform.OS === "web"
          ? "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px #FFFFFF"
          : undefined,
      shadowColor: Platform.OS !== "web" ? "#000" : undefined,
      shadowOffset: Platform.OS !== "web" ? { width: 0, height: 2 } : undefined,
      shadowOpacity: Platform.OS !== "web" ? 0.1 : undefined,
      shadowRadius: Platform.OS !== "web" ? 4 : undefined,
      elevation: Platform.OS === "android" ? 3 : 0,
    },
    optionText: {
      fontSize: 20,
      fontWeight: "500",
      fontFamily: "MavenPro-Medium",
      textAlign: "center",
      color: "#1E1E1E",
    },
    cancelButton: {
      width: 279,
      height: 64,
      borderRadius: 32,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
      boxShadow:
        Platform.OS === "web"
          ? "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px #FFFFFF"
          : undefined,
      shadowColor: Platform.OS !== "web" ? "#000" : undefined,
      shadowOffset: Platform.OS !== "web" ? { width: 0, height: 2 } : undefined,
      shadowOpacity: Platform.OS !== "web" ? 0.1 : undefined,
      shadowRadius: Platform.OS !== "web" ? 4 : undefined,
      elevation: Platform.OS === "android" ? 3 : 0,
    },
    cancelText: {
      fontSize: 20,
      fontWeight: "500",
      fontFamily: "MavenPro-SemiBold",
      color: "#000",
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F0F3" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>End Early</Text>
      </View>

      <Image
        source={require("../../assets/sadCat.png")}
        style={styles.catImage}
        resizeMode="contain"
      />

      <View style={styles.questionBox}>
        <Text style={styles.questionText}>
          Do you wish to end this session early?
        </Text>
      </View>

      <View style={styles.optionRow}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={onConfirmWithPoints}
        >
          <Text style={styles.optionText}>Yes, and{"\n"}give points</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={onConfirmWithoutPoints}
        >
          <Text style={styles.optionText}>Yes, and{"\n"}give no points</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}; 