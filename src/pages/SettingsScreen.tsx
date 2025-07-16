import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * SettingsScreen component implementing the Figma design
 * Features neumorphism styling and menu structure
 * Follows project requirements for component structure
 */
export const SettingsScreen: React.FC = () => {
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
   * Handles back button press
   * In a real app, this would navigate back
   */
  const handleBackPress = () => {
    console.log('Back button pressed');
    // TODO: Implement navigation back
  };

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
      // Neumorphism shadow effect - outer raised shadow
      shadowColor: '#FFFFFF',
      shadowOffset: { width: -5, height: -5 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: Platform.OS === 'android' ? 5 : 0,
    },
    backButtonShadow: {
      position: 'absolute',
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F0F0F3',
      // Secondary shadow for depth
      shadowColor: '#AEAEC0',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: Platform.OS === 'android' ? 2 : 0,
    },
    backButtonText: {
      fontSize: 20,
      color: '#A3ADB2',
      fontWeight: '400',
      lineHeight: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: '600',
      color: '#000000',
      textAlign: 'center',
      flex: 1,
      marginLeft: -40, // Compensate for back button to center the title
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
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
      // Neumorphism shadow effect - outer raised shadow
      shadowColor: '#FFFFFF',
      shadowOffset: { width: -5, height: -5 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: Platform.OS === 'android' ? 5 : 0,
    },
    menuItemShadow: {
      position: 'absolute',
      width: '100%',
      height: 80,
      borderRadius: 20,
      backgroundColor: '#F0F0F3',
      // Secondary shadow for depth
      shadowColor: '#AEAEC0',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: Platform.OS === 'android' ? 2 : 0,
    },
    menuItemContent: {
      backgroundColor: '#F0F0F3',
      width: '100%',
      height: 80,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    menuItemText: {
      fontSize: 20,
      fontWeight: '500',
      color: '#000000',
      textAlign: 'center',
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    },
    menuItemPressed: {
      // Pressed state - inset shadow effect
      shadowColor: '#AEAEC0',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: Platform.OS === 'android' ? 1 : 0,
    },
    // Additional neumorphism layer for better depth
    neumorphismLayer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 20,
      backgroundColor: '#F0F0F3',
      // Subtle gradient effect simulation
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 1,
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
      <View style={styles.menuItemShadow} />
      <View style={styles.neumorphismLayer} />
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
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
          activeOpacity={0.8}
        >
          <View style={styles.backButtonShadow} />
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Settings</Text>
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