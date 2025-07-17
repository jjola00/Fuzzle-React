import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

/**
 * LoadingScreen component displays a loading indicator and message
 * Used during app initialization and other loading states
 */
export const LoadingScreen: React.FC = () => {
  // Simple loading screen with spinner and message
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 24,
    fontSize: 18,
    color: '#8E8E93',
    textAlign: 'center' as const,
  },
}; 