import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

// Props interface for SettingsScreen
interface SettingsScreenProps {
  onNavigateBack: () => void;
}

/**
 * SettingsScreen component implementing the Figma design
 * Features neumorphism styling and menu structure
 * Follows project requirements for component structure
 */
export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onNavigateBack }) => {
  const { theme } = useTheme();

  // Debug log to ensure component is rendering
  console.log('SettingsScreen rendering with theme:', theme);

  // Settings menu items based on the Figma design
  const settingsItems = [
    { id: 'account', title: 'My account', onPress: () => console.log('My account pressed') },
    { id: 'points', title: 'Point tally', onPress: () => console.log('Point tally pressed') },
    { id: 'bug', title: 'Report a bug', onPress: () => console.log('Report a bug pressed') },
    { id: 'review', title: 'Leave a review', onPress: () => console.log('Leave a review pressed') },
    { id: 'privacy', title: 'Privacy policy', onPress: () => console.log('Privacy policy pressed') },
    { id: 'terms', title: 'Terms of service', onPress: () => console.log('Terms of service pressed') },
  ];

  /**
   * Handles back button press with proper navigation
   */
  const handleBackPress = () => {
    console.log('=== BACK BUTTON PRESSED ===');
    console.log('handleBackPress function called');
    console.log('onNavigateBack prop:', onNavigateBack);
    console.log('typeof onNavigateBack:', typeof onNavigateBack);
    
    try {
      if (onNavigateBack) {
        console.log('Calling onNavigateBack...');
        onNavigateBack();
        console.log('onNavigateBack called successfully');
      } else {
        console.log('ERROR: onNavigateBack is undefined or null');
      }
    } catch (error) {
      console.log('ERROR calling onNavigateBack:', error);
    }
    
    console.log('=== END BACK BUTTON PRESSED ===');
  };

  // Add logging to check if component receives the right props
  console.log('SettingsScreen props:', { onNavigateBack: typeof onNavigateBack });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F0F3', // Matching the Figma design background
    },
    statusBar: {
      backgroundColor: '#F0F0F3',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 21,
      paddingTop: Platform.OS === 'ios' ? 58 : 20,
      paddingBottom: 20,
      backgroundColor: '#F0F0F3',
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F0F0F3',
      justifyContent: 'center',
      alignItems: 'center',
      // Ensure button is touchable
      zIndex: 10,
      position: 'relative',
      // Web-compatible boxShadow for neumorphism effect
      boxShadow: Platform.OS === 'web' 
        ? '-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3)' 
        : undefined,
      // Fallback shadows for native platforms
      shadowColor: Platform.OS !== 'web' ? '#000' : undefined,
      shadowOffset: Platform.OS !== 'web' ? { width: 0, height: 2 } : undefined,
      shadowOpacity: Platform.OS !== 'web' ? 0.1 : undefined,
      shadowRadius: Platform.OS !== 'web' ? 4 : undefined,
      elevation: Platform.OS === 'android' ? 3 : 0,
      // Debug border to make sure button is visible (remove this later)
      borderWidth: 1,
      borderColor: 'red',
    },
    backButtonText: {
      fontSize: 20,
      color: '#A3ADB2',
      fontWeight: '400',
      lineHeight: 24,
      userSelect: 'none', // Prevent text selection on web
    },
    title: {
      fontSize: 28,
      fontWeight: '600',
      color: '#000000',
      textAlign: 'center',
      flex: 1,
      marginLeft: -40, // Compensate for back button to center the title
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
      userSelect: 'none', // Prevent text selection on web
    },
    content: {
      paddingHorizontal: 29,
      paddingTop: 20,
    },
    menuItem: {
      height: 80,
      borderRadius: 20,
      backgroundColor: '#F0F0F3',
      marginBottom: 15,
      justifyContent: 'center',
      alignItems: 'center',
      // Web-compatible boxShadow for neumorphism effect
      boxShadow: Platform.OS === 'web' 
        ? '-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3)' 
        : undefined,
      // Fallback shadows for native platforms
      shadowColor: Platform.OS !== 'web' ? '#000' : undefined,
      shadowOffset: Platform.OS !== 'web' ? { width: 0, height: 2 } : undefined,
      shadowOpacity: Platform.OS !== 'web' ? 0.1 : undefined,
      shadowRadius: Platform.OS !== 'web' ? 4 : undefined,
      elevation: Platform.OS === 'android' ? 3 : 0,
    },
    menuItemText: {
      fontSize: 20,
      fontWeight: '500',
      color: '#000000',
      textAlign: 'center',
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
      userSelect: 'none', // Prevent text selection on web
    },
    menuItemPressed: {
      // Pressed state - inset shadow effect for web
      boxShadow: Platform.OS === 'web' 
        ? 'inset 2px 2px 4px rgba(174, 174, 192, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.3)' 
        : undefined,
    },
  });

  /**
   * Renders a menu item with neumorphism styling
   */
  const renderMenuItem = (item: typeof settingsItems[0], index: number) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem]}
      onPress={item.onPress}
      activeOpacity={0.95}
    >
      <Text style={styles.menuItemText} selectable={false}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F0F3" />
      
      {/* Header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          onPressIn={() => console.log('BACK BUTTON: onPressIn - touch detected')}
          onPressOut={() => console.log('BACK BUTTON: onPressOut - touch released')}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back to home screen"
        >
          <Text style={styles.backButtonText} selectable={false}>‹</Text>
        </TouchableOpacity>
        
        <Text style={styles.title} selectable={false}>Settings</Text>
      </View>

      {/* Settings menu items */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {settingsItems.map((item, index) => renderMenuItem(item, index))}
      </ScrollView>
    </View>
  );
}; 