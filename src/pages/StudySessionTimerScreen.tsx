import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, PanResponder } from "react-native";
import Svg, { Circle } from "react-native-svg";

// Props interface for StudySessionTimerScreen
interface StudySessionTimerScreenProps {
  onNavigateBack: () => void;
  onStartSession: (minutes: number) => void;
}

/**
 * StudySessionTimerScreen component implementing the timer selection interface
 * Features an interactive circular slider to select study session duration
 * Follows the design provided in the mockup with neomorphism styling
 */
export const StudySessionTimerScreen: React.FC<StudySessionTimerScreenProps> = ({
  onNavigateBack,
  onStartSession,
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState(60);
  const MIN_MINUTES = 5;
  const MAX_MINUTES = 120;
  const STEP = 5;
  
  // Circle dimensions
  const CIRCLE_RADIUS = 118; // Half of 236px
  const CENTER_X = 118; // Center of SVG viewBox
  const CENTER_Y = 118; // Center of SVG viewBox
  const SLIDER_RADIUS = 28; // Half of 49px slider size

  // Handle touch events for dragging the slider
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => true,
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      
      // Calculate angle from touch position relative to circle center
      const dx = locationX - CENTER_X;
      const dy = locationY - CENTER_Y;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // Normalize angle to 0-360 range
      if (angle < 0) angle += 360;
      
      // Convert to our coordinate system where 270 degrees = 12 o'clock (5 minutes)
      // and we go clockwise for 360 degrees total
      let normalizedAngle = (angle + 90) % 360;
      
      // Clamp to our valid range (0 to 360 degrees maps to 5 to 120 minutes)
      // No clamping needed since we're using the full circle
      
      // Convert angle to minutes
      const progress = normalizedAngle / 360;
      const minutes = Math.round((progress * (MAX_MINUTES - MIN_MINUTES) + MIN_MINUTES) / STEP) * STEP;
      const clampedMinutes = Math.max(MIN_MINUTES, Math.min(MAX_MINUTES, minutes));
      
      setSelectedMinutes(clampedMinutes);
    },
    onPanResponderRelease: () => {
      // Optional: Add haptic feedback here
    },
  });

  // Calculate angle from minutes (0 degrees = 12 o'clock position)
  const minutesToAngle = (minutes: number) => {
    const progress = (minutes - MIN_MINUTES) / (MAX_MINUTES - MIN_MINUTES);
    return (progress * 360) - 90; // -90 to start at 12 o'clock
  };

  // Calculate minutes from angle (simplified since we now clamp in PanResponder)
  const angleToMinutes = (angle: number) => {
    // Convert to progress (0 to 1)
    const progress = (angle + 90) / 360;
    
    // Clamp progress to 0-1 range
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    const minutes = Math.round((clampedProgress * (MAX_MINUTES - MIN_MINUTES) + MIN_MINUTES) / STEP) * STEP;
    return Math.max(MIN_MINUTES, Math.min(MAX_MINUTES, minutes));
  };

  // Calculate slider position from angle
  const getSliderPosition = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: CENTER_X + (CIRCLE_RADIUS - SLIDER_RADIUS) * Math.cos(rad),
      y: CENTER_Y + (CIRCLE_RADIUS - SLIDER_RADIUS) * Math.sin(rad),
    };
  };

  // Handle menu button press
  const handleMenuPress = () => {
    console.log("Menu pressed");
    // TODO: Implement menu functionality
  };

  // Handle notification button press
  const handleNotificationPress = () => {
    console.log("Notification pressed");
    // TODO: Implement notification functionality
  };

  // Handle title press - navigate back to home
  const handleTitlePress = () => {
    onNavigateBack();
  };

  // Handle start session
  const handleStartSession = () => {
    onStartSession(selectedMinutes);
  };

  // Calculate slider position from the constrained selected minutes (not directly from angle)
  const sliderPosition = getSliderPosition(minutesToAngle(selectedMinutes));

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0F0F3",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 22,
      paddingTop: Platform.OS === "ios" ? 56 : 20,
      paddingBottom: 20,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
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
    headerButtonText: {
      fontSize: 16,
      color: "#A3ADB2",
      fontWeight: "400",
      userSelect: "none",
    },
    notificationButton: {
      position: "relative",
    },
    notificationDot: {
      position: "absolute",
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: "#7859BB",
      borderWidth: 2,
      borderColor: "#F0F0F3",
      top: -2,
      right: -2,
      zIndex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: "#000000",
      textAlign: "center",
      fontFamily: "MavenPro-SemiBold",
      userSelect: "none",
      textShadowColor: "rgba(0, 0, 0, 0.25)",
      textShadowOffset: { width: 0, height: 4 },
      textShadowRadius: 4,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 20,
    },
    timerContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 60,
    },
    circleContainer: {
      width: 236,
      height: 236,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    circle: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      // Web requires boxShadow instead of individual shadow properties
      boxShadow:
        Platform.OS === "web"
          ? "-10px -10px 30px #FFFFFF, 10px 10px 30px rgba(174, 174, 192, 0.5)"
          : undefined,
      // Fallback shadows for native platforms
      shadowColor: Platform.OS !== "web" ? "#000" : undefined,
      shadowOffset: Platform.OS !== "web" ? { width: 0, height: 4 } : undefined,
      shadowOpacity: Platform.OS !== "web" ? 0.2 : undefined,
      shadowRadius: Platform.OS !== "web" ? 10 : undefined,
      elevation: Platform.OS === "android" ? 8 : 0,
    },
    minutesNumber: {
      fontSize: 45,
      fontWeight: "600",
      color: "#000000",
      textAlign: "center",
      fontFamily: "MavenPro-SemiBold",
      userSelect: "none",
      lineHeight: 45,
    },
    minutesLabel: {
      fontSize: 20,
      fontWeight: "500",
      color: "#000000",
      textAlign: "center",
      fontFamily: "MavenPro-Medium",
      userSelect: "none",
      marginTop: 8,
    },
    progressCircle: {
      position: "absolute",
      width: 236,
      height: 236,
    },
    startButton: {
      width: 279,
      height: 64,
      borderRadius: 20,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
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
    startButtonText: {
      fontSize: 21,
      fontWeight: "600",
      color: "#000000",
      textAlign: "center",
      fontFamily: "MavenPro-SemiBold",
      userSelect: "none",
    },
    controls: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: 200,
      marginTop: 30,
    },
    controlButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
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
    controlButtonText: {
      fontSize: 24,
      color: "#A3ADB2",
      fontWeight: "400",
      userSelect: "none",
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F0F3" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleMenuPress}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Menu"
        >
          <Text style={styles.headerButtonText} selectable={false}>
            ≡
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleTitlePress}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
        >
          <Text style={styles.title} selectable={false}>
            Fuzzle
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.headerButton, styles.notificationButton]}
          onPress={handleNotificationPress}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <View style={styles.notificationDot} />
          <Text style={styles.headerButtonText} selectable={false}>
            🔔
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.timerContainer}>
          <View style={styles.circleContainer} {...panResponder.panHandlers}>
            {/* Progress circle background */}
            <Svg style={styles.progressCircle} viewBox="0 0 236 236">
              <Circle
                cx="118"
                cy="118"
                r="116"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                opacity="0.07"
              />
              <Circle
                cx="118"
                cy="118"
                r="105"
                fill="none"
                stroke="#9281CD"
                strokeWidth="2"
                strokeDasharray={`${(selectedMinutes / MAX_MINUTES) * 660} 660`}
                strokeDashoffset="-165"
                transform="rotate(-90 118 118)"
              />
              {/* Slider position indicator */}
              <Circle
                cx={sliderPosition.x}
                cy={sliderPosition.y}
                r="24.5"
                fill="#FFFFFF"
                stroke="none"
                filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              />
            </Svg>

            {/* Main timer circle */}
            <View style={styles.circle}>
              <Text style={styles.minutesNumber} selectable={false}>
                {selectedMinutes}
              </Text>
              <Text style={styles.minutesLabel} selectable={false}>
                Minutes
              </Text>
            </View>
          </View>

          {/* Time adjustment controls */}
          <View style={styles.controls}>
             
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartSession}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Start study session"
        >
          <Text style={styles.startButtonText} selectable={false}>
            Ok, lets begin!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 