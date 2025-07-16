import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Test LoadingScreen component
 * Shows a centered spinner and placeholder text
 * Follows project requirements for style and comments
 */
export const LoadingScreen: React.FC = () => {
  const { theme } = useTheme();

  // Debug log to ensure component is rendering
  console.log('LoadingScreen rendering with theme:', theme);

  // Safety check to ensure theme is loaded
  if (!theme) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 24, fontSize: 18, color: '#8E8E93', textAlign: 'center' }}>
          Loading, please wait...
        </Text>
      </View>
    );
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    }}>
      <View style={{
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        minWidth: 200,
      }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{
          marginTop: theme.spacing.lg,
          fontSize: 18,
          color: theme.colors.text,
          textAlign: 'center',
          fontWeight: '600',
        }}>
          Loading...
        </Text>
        <Text style={{
          marginTop: theme.spacing.sm,
          fontSize: 14,
          color: theme.colors.textSecondary,
          textAlign: 'center',
        }}>
          Please wait while we load the app
        </Text>
      </View>
    </View>
  );
}; 