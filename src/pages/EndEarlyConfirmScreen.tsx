import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { supabase } from "@/services";

interface EndEarlyConfirmScreenProps {
  /** Remaining seconds in the session when user pressed End Early */
  remainingSeconds: number;
  /** Supabase session row id – required for updating points */
  sessionId: string;
  /** Current authenticated user id (child) */
  userId: string;
  /** Invoke after successfully allocating points so parent can navigate */
  onConfirmWithPoints: () => void;
  /** Confirm with no points – implementation deferred */
  onConfirmWithoutPoints: () => void;
  /** Cancel and resume timer */
  onCancel: () => void;
  /** Navigate back arrow */
  onNavigateBack: () => void;
}

export const EndEarlyConfirmScreen: React.FC<EndEarlyConfirmScreenProps> = ({
  remainingSeconds: _remainingSeconds,
  sessionId,
  userId,
  onConfirmWithPoints,
  onConfirmWithoutPoints,
  onCancel,
  onNavigateBack,
}) => {
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

  // ---------------------------------------------------------------------
  // Local modal state
  // ---------------------------------------------------------------------
  const [pointsModalVisible, setPointsModalVisible] = React.useState(false);
  const [pointsInput, setPointsInput] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleAllocatePoints = async () => {
    const parsed = parseInt(pointsInput, 10);
    if (Number.isNaN(parsed) || parsed < 0) {
      Alert.alert("Invalid input", "Enter a valid positive number");
      return;
    }

    const dbEnabled = Boolean(userId && sessionId);

    if (!dbEnabled) {
      // Offline / placeholder mode — skip DB writes, go straight to next screen
      setPointsModalVisible(false);
      onConfirmWithPoints();
      return;
    }

    try {
      setSubmitting(true);

      // Upsert into points table
      const { data: existing, error } = await supabase
        .from("points")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (existing) {
        const updatedTotal = (existing.total_points ?? 0) + parsed;
        const { error: updErr } = await supabase
          .from("points")
          .update({
            total_points: updatedTotal,
            last_updated: new Date().toISOString(),
          })
          .eq("user_id", userId);
        if (updErr) throw updErr;
      } else {
        const { error: insErr } = await supabase.from("points").insert({
          user_id: userId,
          total_points: parsed,
          last_updated: new Date().toISOString(),
        });
        if (insErr) throw insErr;
      }

      // Update session row with points_earned & ended_early flag
      const { error: sessErr } = await supabase
        .from("sessions")
        .update({ points_earned: parsed, ended_early: true })
        .eq("id", sessionId);
      if (sessErr) throw sessErr;

      setPointsModalVisible(false);
      onConfirmWithPoints();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to save points. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
          onPress={() => setPointsModalVisible(true)}
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

      {/* Points allocation modal/overlay */}
      {pointsModalVisible && (
        Platform.OS === "web" ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.25)",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            {/** Re-use same content as native modal */}
            <View
              style={{
                width: "100%",
                maxWidth: 340,
                borderRadius: 20,
                backgroundColor: "#F0F0F3",
                padding: 24,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "600",
                  fontFamily: "MavenPro-SemiBold",
                  color: "#000",
                  marginBottom: 18,
                  textAlign: "center",
                }}
              >
                How many points should we award?
              </Text>

              <TextInput
                style={{
                  width: "100%",
                  height: 56,
                  borderRadius: 12,
                  backgroundColor: "#F0F0F3",
                  paddingHorizontal: 16,
                  fontSize: 20,
                  fontFamily: "MavenPro-Medium",
                  color: "#000",
                  marginBottom: 24,
                }}
                placeholder="Enter points"
                placeholderTextColor="#A3ADB2"
                keyboardType="number-pad"
                value={pointsInput}
                onChangeText={setPointsInput}
              />

              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: "#7859BB",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleAllocatePoints}
                disabled={submitting}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "#fff",
                    fontFamily: "MavenPro-SemiBold",
                  }}
                >
                  {submitting ? "Saving…" : "Confirm"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Modal transparent animationType="fade" visible>
            <KeyboardAvoidingView
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.25)",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 24,
              }}
              behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
              <View
                style={{
                  width: "100%",
                  maxWidth: 340,
                  borderRadius: 20,
                  backgroundColor: "#F0F0F3",
                  padding: 24,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "600",
                    fontFamily: "MavenPro-SemiBold",
                    color: "#000",
                    marginBottom: 18,
                    textAlign: "center",
                  }}
                >
                  How many points should we award?
                </Text>

                <TextInput
                  style={{
                    width: "100%",
                    height: 56,
                    borderRadius: 12,
                    backgroundColor: "#F0F0F3",
                    paddingHorizontal: 16,
                    fontSize: 20,
                    fontFamily: "MavenPro-Medium",
                    color: "#000",
                    marginBottom: 24,
                  }}
                  placeholder="Enter points"
                  placeholderTextColor="#A3ADB2"
                  keyboardType="number-pad"
                  value={pointsInput}
                  onChangeText={setPointsInput}
                />

                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "#7859BB",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={handleAllocatePoints}
                  disabled={submitting}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                      fontFamily: "MavenPro-SemiBold",
                    }}
                  >
                    {submitting ? "Saving…" : "Confirm"}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        )
      )}
    </View>
  );
};
