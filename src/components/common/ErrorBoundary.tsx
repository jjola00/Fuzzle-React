import React, { Component, ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "./Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component for graceful error handling
 * Catches JavaScript errors anywhere in the child component tree
 * Follows React error boundary patterns with proper error reporting
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Static method to update state when an error occurs
   * Returns new state object to trigger re-render with error UI
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Logs error information and performs additional error handling
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // TODO: Report error to error tracking service in production
    // Example: errorReportingService.logError(error, errorInfo);
  }

  /**
   * Resets the error state to retry rendering
   * Called when user clicks the retry button
   */
  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI can be provided via props
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI with retry functionality
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.message || "An unexpected error occurred"}
          </Text>
          <Button
            title="Try Again"
            variant="primary"
            onPress={this.handleRetry}
            testID="error-retry-button"
          />
        </View>
      );
    }

    return this.props.children;
  }
}

/**
 * Styles for the error boundary UI
 * Uses consistent spacing and typography
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#dc3545",
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 24,
  },
});
