import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAsyncState } from '@/hooks/useAsyncState';
import { Button } from '@/components';

/**
 * HomeScreen component demonstrating page structure
 * Shows proper use of hooks, context, and component composition
 * Follows the suggested folder layout from requirements
 */
export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { state, execute } = useAsyncState<string>();

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
    },
    description: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.lg,
      lineHeight: 24,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
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
    },
    errorText: {
      fontSize: 14,
      color: theme.colors.error,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home Screen</Text>

        <Text style={styles.description}>
          This is an example page component demonstrating the folder structure
          and component composition patterns outlined in the project
          requirements.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Async State Demo</Text>
          <Button
            title="Run Async Operation"
            variant="primary"
            loading={state.loading}
            onPress={handleAsyncOperation}
            testID="async-button"
          />

          {state.data && (
            <View style={styles.result}>
              <Text style={styles.resultText}>{state.data}</Text>
            </View>
          )}

          {state.error && (
            <View style={styles.result}>
              <Text style={styles.errorText}>Error: {state.error}</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
