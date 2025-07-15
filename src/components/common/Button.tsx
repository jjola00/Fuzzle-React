import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Button variant types for different visual styles
 * Uses discriminated unions for type safety
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

/**
 * Button size types for consistent sizing
 */
type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Props interface for the Button component
 * Extends TouchableOpacity props for full customization
 */
interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  testID?: string;
}

/**
 * Reusable Button component with theme integration
 * Follows Single Responsibility Principle - handles button rendering and interaction
 * Implements accessibility best practices with proper ARIA attributes
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onPress,
  testID,
}) => {
  const { theme } = useTheme();

  /**
   * Generates button styles based on variant and theme
   * Keeps styles derived from props and theme state
   */
  const getButtonStyles = () => {
    const baseStyle = {
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
    };

    const sizeStyles = {
      small: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        minHeight: 32,
      },
      medium: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: 44,
      },
      large: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: 52,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: theme.colors.primary,
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      },
      text: {
        backgroundColor: 'transparent',
      },
    };

    const disabledStyle =
      disabled || loading
        ? {
            opacity: 0.5,
          }
        : {};

    return [baseStyle, sizeStyles[size], variantStyles[variant], disabledStyle];
  };

  /**
   * Generates text styles based on variant and theme
   */
  const getTextStyles = () => {
    const baseTextStyle = {
      fontWeight: '600' as const,
      textAlign: 'center' as const,
    };

    const sizeTextStyles = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    const variantTextStyles = {
      primary: { color: theme.colors.background },
      secondary: { color: theme.colors.background },
      outline: { color: theme.colors.primary },
      text: { color: theme.colors.primary },
    };

    return [baseTextStyle, sizeTextStyles[size], variantTextStyles[variant]];
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      onPress={onPress}
      disabled={disabled || loading}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
      testID={testID}>
      {loading && (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' || variant === 'text'
              ? theme.colors.primary
              : theme.colors.background
          }
          style={{ marginRight: theme.spacing.xs }}
        />
      )}
      <Text style={getTextStyles()}>{title}</Text>
    </TouchableOpacity>
  );
};
