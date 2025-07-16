import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAsyncState } from '@/hooks/useAsyncState';
import { Button } from '@/components';

// Props interface for HomeScreen
interface HomeScreenProps {
  onNavigateToSettings: () => void;
}

/**
 * HomeScreen component demonstrating page structure
 * Shows proper use of hooks, context, and component composition
 * Follows the suggested folder layout from requirements
 */
export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToSettings }) => {
  const { theme } = useTheme();
  const { state, execute } = useAsyncState<string>();

  // Debug log to ensure component is rendering
  console.log('HomeScreen rendering with theme:', theme);

  /**
   * Simulates an async operation for demonstration
   * Shows how to use the custom useAsyncState hook
   */
  const handleAsyncOperation = async () => {
    await execute(async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return 'Async operation completed successfully!';
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      userSelect: 'none', // Prevent text selection on web
    },
    description: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.lg,
      lineHeight: 24,
      userSelect: 'none', // Prevent text selection on web
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      userSelect: 'none', // Prevent text selection on web
    },
    result: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      marginTop: theme.spacing.md,
    },
    resultText: {
      fontSize: 14,
      color: theme.colors.text,
      userSelect: 'none', // Prevent text selection on web
    },
    errorText: {
      fontSize: 14,
      color: theme.colors.error,
      userSelect: 'none', // Prevent text selection on web
    },
    settingsSection: {
      marginTop: theme.spacing.xl,
      paddingTop: theme.spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.surface,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title} selectable={false}>Home Screen</Text>

        <Text style={styles.description} selectable={false}>
          This is an example page component demonstrating the folder structure
          and component composition patterns outlined in the project
          requirements.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} selectable={false}>Async State Demo</Text>
          <Button
            title="Run Async Operation"
            variant="primary"
            loading={state.loading}
            onPress={handleAsyncOperation}
            testID="async-button"
          />

          {state.data && (
            <View style={styles.result}>
              <Text style={styles.resultText} selectable={false}>{state.data}</Text>
            </View>
          )}

          {state.error && (
            <View style={styles.result}>
              <Text style={styles.errorText} selectable={false}>Error: {state.error}</Text>
            </View>
          )}
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle} selectable={false}>Navigation</Text>
          <Button
            title="Go to Settings"
            variant="secondary"
            onPress={onNavigateToSettings}
            testID="settings-button"
          />
        </View>
      </View>
    </ScrollView>
  );
};
