import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";

import type { Session as SessionRow } from "@/services";
import { databaseService } from "@/services";

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

/**
 * Props for the SessionCompleteScreen component.
 *
 * We keep the surface area minimal – only the IDs required to fetch data and
 * navigation callbacks for the host application. All other information is
 * derived from the database.
 */
export interface SessionCompleteScreenProps {
  /**
   * Supabase `sessions.id` for the session that has just finished.
   * The component will fetch its statistics (duration, breaks, etc.) at mount.
   */
  sessionId: string;
  /** Supabase `users.id` for the signed-in child. Needed for the points table. */
  userId: string;
  /** Navigate back arrow in the header. */
  onNavigateBack: () => void;
  /** Invoked after the user dismisses the screen via the “Okay!” button. */
  onDone: () => void;
}

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

export const SessionCompleteScreen: React.FC<SessionCompleteScreenProps> = ({
  sessionId,
  userId: _userId,
  onNavigateBack,
  onDone,
}) => {
  // -------------------------------------------------------------------------
  // Local state
  // -------------------------------------------------------------------------
  const [session, setSession] = useState<SessionRow | null>(null);
  // No points modal here – allocation happens in EndEarlyConfirmScreen

  // -------------------------------------------------------------------------
  // Fetch session info once on mount
  // -------------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await databaseService.getSession(sessionId);
        if (isMounted) setSession(data);
      } catch (error) {
        console.error("Failed to fetch session", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  // -------------------------------------------------------------------------
  // Derived display values – fallbacks while loading
  // -------------------------------------------------------------------------
  const durationMinutes = session?.duration_minutes ?? 0;
  const breaksTaken = session?.breaks_taken ?? 0;
  const hintsGiven = session?.hints_given ?? 0;
  const distractions = session?.distractions ?? 0;
  const pointsEarned = session?.points_earned ?? 0;

  // -------------------------------------------------------------------------
  // Styles
  // -------------------------------------------------------------------------
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
      fontSize: 20,
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
    catImage: {
      width: 200,
      height: 200,
      marginTop: 10,
      marginBottom: 20,
    },
    headline: {
      fontSize: 24,
      fontWeight: "600",
      fontFamily: "MavenPro-SemiBold",
      color: "#000",
      textAlign: "center",
      marginBottom: 20,
    },
    statsBox: {
      width: 333,
      paddingVertical: 35,
      borderRadius: 20,
      backgroundColor: "rgba(246, 246, 246, 0.65)",
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.03)",
      justifyContent: "center",
      alignItems: "center",
      boxShadow:
        Platform.OS === "web"
          ? "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 11px #FFFFFF"
          : undefined,
      marginBottom: 50,
    },
    statsTextPrimary: {
      fontSize: 28,
      fontWeight: "700",
      fontFamily: "MavenPro-SemiBold",
      textAlign: "center",
      color: "#000",
      marginBottom: 18,
    },
    statsTextSecondary: {
      fontSize: 20,
      fontWeight: "500",
      fontFamily: "MavenPro-Medium",
      textAlign: "center",
      color: "#000",
      lineHeight: 30,
    },
    okayButton: {
      width: 279,
      height: 64,
      borderRadius: 32,
      backgroundColor: "#F0F0F3",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: 40,
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
    okayButtonText: {
      fontSize: 24,
      fontWeight: "600",
      fontFamily: "MavenPro-SemiBold",
      color: "#000",
    },
    // Modal styles
    modalBackdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.25)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    modalContent: {
      width: "100%",
      maxWidth: 340,
      borderRadius: 20,
      backgroundColor: "#F0F0F3",
      padding: 24,
      alignItems: "center",
      boxShadow:
        Platform.OS === "web"
          ? "-10px -10px 30px #FFFFFF, 10px 10px 30px rgba(174,174,192,0.5)"
          : undefined,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: "600",
      fontFamily: "MavenPro-SemiBold",
      color: "#000",
      marginBottom: 18,
      textAlign: "center",
    },
    pointsInput: {
      width: "100%",
      height: 56,
      borderRadius: 12,
      backgroundColor: "#F0F0F3",
      paddingHorizontal: 16,
      fontSize: 20,
      fontFamily: "MavenPro-Medium",
      color: "#000",
      marginBottom: 24,
      boxShadow:
        Platform.OS === "web"
          ? "inset -4px -4px 8px #FFFFFF, inset 4px 4px 8px rgba(0, 0, 0, 0.1)"
          : undefined,
    },
    confirmButton: {
      width: "100%",
      height: 56,
      borderRadius: 28,
      backgroundColor: "#7859BB",
      justifyContent: "center",
      alignItems: "center",
    },
    confirmButtonText: {
      fontSize: 20,
      fontWeight: "600",
      fontFamily: "MavenPro-SemiBold",
      color: "#FFFFFF",
    },
  });

  // -------------------------------------------------------------------------
  // Render helpers
  // -------------------------------------------------------------------------

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Left – hamburger icon */}
      <TouchableOpacity style={styles.headerButton} onPress={onNavigateBack}>
        <Text style={styles.headerButtonText}>≡</Text>
      </TouchableOpacity>

      <Text style={styles.title} selectable={false}>
        Fuzzle
      </Text>

      {/* Right – bell icon placeholder with notification dot */}
      <View style={styles.headerButton}>
        <View style={styles.notificationDot} />
        {/* Simple bell glyph − not importing an icon set to keep deps minimal */}
        <Text style={styles.headerButtonText}>🔔</Text>
      </View>
    </View>
  );

  const renderStatsBox = () => (
    <View style={styles.statsBox}>
      <Text style={styles.statsTextPrimary}>{durationMinutes} minutes</Text>

      <Text style={styles.statsTextSecondary}>
        {breaksTaken} Breaks taken{"\n"}
        {hintsGiven} Hints given{"\n"}
        {distractions} Distractions
      </Text>

      {/* Gap */}
      <View style={{ height: 24 }} />

      <Text style={styles.statsTextSecondary}>{pointsEarned} points earned</Text>
    </View>
  );

  // -------------------------------------------------------------------------
  // JSX
  // -------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      {renderHeader()}

      <View style={styles.content}>
        <Image
          source={require("../../assets/trophyCat.png")}
          style={styles.catImage}
          resizeMode="contain"
        />

        <Text style={styles.headline}>Woohoo, session complete!</Text>

        {renderStatsBox()}

        <TouchableOpacity style={styles.okayButton} onPress={onDone}>
          <Text style={styles.okayButtonText}>Okay!</Text>
        </TouchableOpacity>
      </View>

      {/* No handlers – allocation already done. */}
    </View>
  );
}; 