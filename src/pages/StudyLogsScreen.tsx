import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useAsyncState } from "@/hooks/useAsyncState";
import { databaseService, SessionData } from "@/services";
import { Button } from "@/components";

// Props interface for StudySessionsScreen
interface StudySessionsScreenProps {
  onNavigateBack: () => void;
}

/**
 * StudySessionsScreen component displays past study sessions with pagination
 * Shows session duration, breaks taken, and whether sessions ended early
 * Follows the design provided in the mockup with neomorphism styling
 */
export const StudyLogsScreen: React.FC<StudySessionsScreenProps> = ({
  onNavigateBack,
}) => {
  const { theme } = useTheme();
  const { state: sessionsState, execute: fetchSessions } = useAsyncState<SessionData[]>();
  const [allSessions, setAllSessions] = useState<SessionData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const ITEMS_PER_PAGE = 5;

  // Fetch initial sessions on component mount
  useEffect(() => {
    loadSessions(0, true);
  }, []);

  // Load sessions with pagination
  const loadSessions = async (page: number, isInitialLoad: boolean = false) => {
    const offset = page * ITEMS_PER_PAGE;
    
    if (isInitialLoad) {
      fetchSessions(async () => {
        const sessions = await databaseService.getSessions(undefined, offset, ITEMS_PER_PAGE);
        setAllSessions(sessions);
        setCurrentPage(0);
        setHasMorePages(sessions.length === ITEMS_PER_PAGE);
        return sessions;
      });
    } else {
      setIsLoadingMore(true);
      try {
        const newSessions = await databaseService.getSessions(undefined, offset, ITEMS_PER_PAGE);
        setAllSessions(prev => [...prev, ...newSessions]);
        setCurrentPage(page);
        setHasMorePages(newSessions.length === ITEMS_PER_PAGE);
      } catch (error) {
        console.error('Error loading more sessions:', error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  // Handle back button press
  const handleBackPress = () => {
    onNavigateBack();
  };

  // Handle retry loading sessions
  const handleRetry = () => {
    setAllSessions([]);
    setCurrentPage(0);
    setHasMorePages(true);
    loadSessions(0, true);
  };

  // Handle next page
  const handleNextPage = () => {
    if (hasMorePages && !isLoadingMore) {
      loadSessions(currentPage + 1);
    }
  };

  // Render individual session item
  const renderSessionItem = (session: SessionData) => (
    <View key={session.id} style={styles.sessionItem}>
      <View style={styles.sessionContent}>
        <Text style={styles.sessionDuration} selectable={false}>
          {session.ended_early ? "Ended early" : `${session.duration_minutes} Minutes`}
        </Text>
        {!session.ended_early && (
          <Text style={styles.sessionBreaks} selectable={false}>
            {session.breaks_taken} breaks taken
          </Text>
        )}
      </View>
    </View>
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText} selectable={false}>
        No study sessions found
      </Text>
      <Text style={styles.emptySubText} selectable={false}>
        Start studying to see your recent sessions here
      </Text>
    </View>
  );

  // Render next page button
  const renderNextPageButton = () => {
    if (!hasMorePages || allSessions.length === 0) return null;

    return (
      <TouchableOpacity
        style={styles.nextPageButton}
        onPress={handleNextPage}
        disabled={isLoadingMore}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Load more sessions"
      >
        <Text style={styles.nextPageButtonText} selectable={false}>
          {isLoadingMore ? "Loading..." : "Load More"}
        </Text>
      </TouchableOpacity>
    );
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
      fontWeight: "500",
      color: "#000000",
      textAlign: "center",
      flex: 1,
      marginLeft: -40, // Compensate for back button width
      fontFamily: "MavenPro-SemiBold",
      userSelect: "none",
    },
    content: {
      flex: 1,
      paddingHorizontal: 27,
      paddingTop: 20,
    },
    sessionItem: {
      marginBottom: 15,
      backgroundColor: "#F0F0F3",
      borderRadius: 20,
      // Web requires boxShadow instead of individual shadow properties
      boxShadow:
        Platform.OS === "web"
          ? "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3)"
          : undefined,
      // Fallback shadows for native platforms
      shadowColor: Platform.OS !== "web" ? "#000" : undefined,
      shadowOffset: Platform.OS !== "web" ? { width: 0, height: 2 } : undefined,
      shadowOpacity: Platform.OS !== "web" ? 0.1 : undefined,
      shadowRadius: Platform.OS !== "web" ? 4 : undefined,
      elevation: Platform.OS === "android" ? 3 : 0,
    },
    sessionContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 25,
      minHeight: 80,
    },
    sessionDuration: {
      fontSize: 22,
      fontWeight: "500",
      color: "#000000",
      fontFamily: "MavenPro-Medium",
      userSelect: "none",
    },
    sessionBreaks: {
      fontSize: 16,
      fontWeight: "500",
      color: "#000000",
      fontFamily: "MavenPro-Medium",
      userSelect: "none",
    },
    nextPageButton: {
      height: 50,
      backgroundColor: "#F0F0F3",
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
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
    nextPageButtonText: {
      fontSize: 18,
      fontWeight: "500",
      color: "#000000",
      fontFamily: "MavenPro-Medium",
      userSelect: "none",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100,
    },
    loadingText: {
      fontSize: 16,
      color: "#677278",
      marginTop: 10,
      fontFamily: "MavenPro-Medium",
      userSelect: "none",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: "#FF3B30",
      textAlign: "center",
      fontFamily: "MavenPro-Medium",
      userSelect: "none",
      marginBottom: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100,
    },
    emptyText: {
      fontSize: 18,
      color: "#677278",
      fontFamily: "MavenPro-Medium",
      userSelect: "none",
      textAlign: "center",
    },
    emptySubText: {
      fontSize: 14,
      color: "#A3ADB2",
      fontFamily: "MavenPro-Regular",
      userSelect: "none",
      textAlign: "center",
      marginTop: 8,
    },
  });

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
          Past sessions
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {sessionsState.loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText} selectable={false}>
              Loading sessions...
            </Text>
          </View>
        )}

        {sessionsState.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText} selectable={false}>
              Error loading sessions: {sessionsState.error}
            </Text>
            <Button
              title="Try Again"
              variant="primary"
              onPress={handleRetry}
              testID="retry-button"
            />
          </View>
        )}

        {sessionsState.data && sessionsState.data.length === 0 && (
          renderEmptyState()
        )}

        {allSessions.length > 0 && (
          <>
            {allSessions.map(renderSessionItem)}
            {renderNextPageButton()}
          </>
        )}
      </ScrollView>
    </View>
  );
}; 