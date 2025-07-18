import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, Image } from "react-native";
import Svg, { Circle } from "react-native-svg";

// Props interface for StudySessionInProgressScreen
interface StudySessionInProgressScreenProps {
  /** Total session length in minutes */
  totalMinutes: number;
  /** Invoke when timer completes naturally */
  onEndSession: () => void;
  /** Ask parent to show confirmation dialog; provide current remaining seconds */
  onRequestEndEarly: (remainingSeconds: number) => void;
  /** When resuming, optionally inject starting remaining seconds */
  initialRemainingSeconds?: number;
}

/**
 * StudySessionInProgressScreen – active countdown view.
 *
 * Replicates the mock-up provided in `image.png` using the same
 * neumorphic design language as the other screens. It shows:
 *   • Remaining minutes in large font
 *   • “Minutes remaining” label
 *   • A sleeping cat illustration centred inside the circle
 *   • A purple progress ring that shrinks clockwise as time elapses
 *   • An “End early” button beneath the timer
 */
export const StudySessionInProgressScreen: React.FC<StudySessionInProgressScreenProps> = ({
  totalMinutes,
  onEndSession,
  onRequestEndEarly,
  initialRemainingSeconds,
}) => {
  // Total duration in seconds (immutable)
  const totalSeconds = totalMinutes * 60;

  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    initialRemainingSeconds ?? totalSeconds,
  );

  // Keep latest remainingSeconds in a ref so the interval callback always has up-to-date value
  const remainingRef = useRef(remainingSeconds);
  remainingRef.current = remainingSeconds;

  // Tick every second using Date.now() to avoid timing drift.
  useEffect(() => {
    const endTime = Date.now() + remainingSeconds * 1000;

    const tick = () => {
      const now = Date.now();
      const remaining = Math.max(Math.round((endTime - now) / 1000), 0);

      if (remaining <= 0) {
        setRemainingSeconds(0);
        onEndSession();
      } else {
        setRemainingSeconds(remaining);
        setTimeout(tick, 1000);
      }
    };

    tick();
    return () => {}; // No cleanup needed as setTimeout is self-contained.
  }, [onEndSession, remainingSeconds]);

  // Derive minutes remaining (ceil so “55” shows until <54:00 etc.)
  const minutesDisplay = Math.ceil(remainingSeconds / 60);

  // Progress (0 – 1). When remaining === total, progress = 1 (full ring).
  const progress = remainingSeconds / totalSeconds;

  // Circle/ring geometry mirrors the enlarged timer screen
  const CIRCLE_CONTAINER_SIZE = 300;
  const CIRCLE_RADIUS = CIRCLE_CONTAINER_SIZE / 2; // 150

  const PURPLE_RING_RADIUS = CIRCLE_RADIUS - 13; // 137
  const GREY_TRACK_RADIUS = PURPLE_RING_RADIUS - 5; // 132
  const TRACK_STROKE_LENGTH = 2 * Math.PI * PURPLE_RING_RADIUS; // ≈ 861

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
    headerButtonText: {
      fontSize: 16,
      color: "#A3ADB2",
      fontWeight: "400",
      userSelect: "none",
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
      ...(Platform.OS === "web"
        ? { textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }
        : {
            textShadowColor: "rgba(0, 0, 0, 0.25)",
            textShadowOffset: { width: 0, height: 4 },
            textShadowRadius: 4,
          }),
    },
    content: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 10,
    },
    circleContainer: {
      width: CIRCLE_CONTAINER_SIZE,
      height: CIRCLE_CONTAINER_SIZE,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 60,
    },
    circle: {
      width: 250,
      height: 250,
      borderRadius: 125,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      boxShadow:
        Platform.OS === "web"
          ? "-10px -10px 30px #FFFFFF, 10px 10px 30px rgba(174, 174, 192, 0.5)"
          : undefined,
      shadowColor: Platform.OS !== "web" ? "#000" : undefined,
      shadowOffset: Platform.OS !== "web" ? { width: 0, height: 4 } : undefined,
      shadowOpacity: Platform.OS !== "web" ? 0.2 : undefined,
      shadowRadius: Platform.OS !== "web" ? 10 : undefined,
      elevation: Platform.OS === "android" ? 8 : 0,
    },
    minutesNumber: {
      fontSize: 45,
      marginTop: 60,
      fontWeight: "500",
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
    catImage: {
      width: 160,
      height: 160,
    },
    endButton: {
      width: 279,
      height: 64,
      borderRadius: 20,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginTop: 60,
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
    endButtonText: {
      fontSize: 21,
      fontWeight: "400",
      color: "#000000",
      textAlign: "center",
      fontFamily: "MavenPro-SemiBold",
      userSelect: "none",
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F0F3" />

      {/* Simple header mirroring other pages */}
      <View style={styles.header}>
        {/* Left (Hamburger) – non-functional placeholder */}
        <View style={styles.headerButton} />

        <Text style={styles.title} selectable={false}>
          Fuzzle
        </Text>

        {/* Right (Notification icon with dot) – static */}
        <View style={styles.headerButton}>
          <View style={styles.notificationDot} />
          <Text style={styles.headerButtonText} selectable={false}>
            🔔
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.circleContainer}>
          {/* Inner white circle */}
          <View style={styles.circle}>
            <Text style={styles.minutesNumber} selectable={false}>
              {minutesDisplay}
            </Text>
            <Text style={styles.minutesLabel} selectable={false}>
              Minutes remaining
            </Text>
            <Image
              source={require("../../assets/cat4.png")}
              style={styles.catImage}
              resizeMode="contain"
            />
          </View>

          {/* Progress ring */}
          <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 ${CIRCLE_CONTAINER_SIZE} ${CIRCLE_CONTAINER_SIZE}`}>
            {/* Grey track */}
            <Circle
              cx={CIRCLE_RADIUS}
              cy={CIRCLE_RADIUS}
              r={GREY_TRACK_RADIUS}
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              opacity="0.07"
            />
            {/* Purple progress */}
            <Circle
              cx={CIRCLE_RADIUS}
              cy={CIRCLE_RADIUS}
              r={PURPLE_RING_RADIUS}
              fill="none"
              stroke="#9281CD"
              strokeWidth="2"
              strokeDasharray={`${progress * TRACK_STROKE_LENGTH} ${TRACK_STROKE_LENGTH}`}
              strokeDashoffset="0"
              transform={`rotate(-90 ${CIRCLE_RADIUS} ${CIRCLE_RADIUS})`}
            />
          </Svg>
        </View>

        {/* End early button */}
        <TouchableOpacity
          style={styles.endButton}
          onPress={() => onRequestEndEarly(remainingSeconds)}
          activeOpacity={0.8}
          accessible
          accessibilityRole="button"
          accessibilityLabel="End study session early"
        >
          <Text style={styles.endButtonText} selectable={false}>
            End early
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 