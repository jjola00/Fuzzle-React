import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextInput,
  Alert,
  Image,
} from "react-native";
// Remove unused import
// import { useTheme } from "@/contexts/ThemeContext";

interface AccountSettingsScreenProps {
  onNavigateBack: () => void;
}

interface ChildInfo {
  name: string;
  dob: string;
}

interface ParentInfo {
  name: string;
  email: string;
  phone: string;
}

/**
 * AccountSettingsScreen component implementing the Figma design
 * Features editable child and parental information with neumorphism styling
 * Follows project requirements for component structure
 */
export const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = ({
  onNavigateBack,
}) => {
  // Remove unused theme variable
  // const { theme } = useTheme();

  // State for child information
  const [childInfo, setChildInfo] = useState<ChildInfo>({
    name: "Philippa",
    dob: "DD/MM/YY",
  });

  // State for parental information
  const [parentInfo, setParentInfo] = useState<ParentInfo>({
    name: "Ruairi",
    email: "email@gmail.com",
    phone: "123456",
  });

  // Edit mode states
  const [isEditingChild, setIsEditingChild] = useState(false);
  const [isEditingParent, setIsEditingParent] = useState(false);

  // Temporary state for editing
  const [tempChildInfo, setTempChildInfo] = useState<ChildInfo>(childInfo);
  const [tempParentInfo, setTempParentInfo] = useState<ParentInfo>(parentInfo);

  // Error states
  const [errors, setErrors] = useState<{
    childName?: string;
    childDob?: string;
    parentName?: string;
    parentEmail?: string;
    parentPhone?: string;
  }>({});

  const handleBackPress = () => {
    onNavigateBack();
  };

  const validateDate = (text: string) => {
    // Simple validation for DD/MM/YY format
    const datePattern = /^\d{2}\/\d{2}\/\d{2}$/;
    return datePattern.test(text);
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone: string) => {
    // Allow numbers, spaces, dashes, parentheses, and plus signs - fix escape characters
    const phonePattern = /^[\d\s\-()]+$/;
    return phonePattern.test(phone) && phone.trim().length >= 6;
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleEditChild = () => {
    if (isEditingChild) {
      clearErrors();
      // Fix any type to proper interface
      const newErrors: Record<string, string> = {};

      // Validate child name
      if (!validateName(tempChildInfo.name)) {
        newErrors.childName = "Name must be at least 2 characters long";
      }

      // Validate date format
      if (tempChildInfo.dob && !validateDate(tempChildInfo.dob)) {
        newErrors.childDob = "Please enter date in DD/MM/YY format";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Save changes
      setChildInfo(tempChildInfo);
      setIsEditingChild(false);
      Alert.alert("Success", "Child information updated successfully");
    } else {
      // Enter edit mode
      setTempChildInfo(childInfo);
      setIsEditingChild(true);
      clearErrors();
    }
  };

  const handleEditParent = () => {
    if (isEditingParent) {
      clearErrors();
      // Fix any type to proper interface
      const newErrors: Record<string, string> = {};

      // Validate parent name
      if (!validateName(tempParentInfo.name)) {
        newErrors.parentName = "Name must be at least 2 characters long";
      }

      // Validate email
      if (!validateEmail(tempParentInfo.email)) {
        newErrors.parentEmail = "Please enter a valid email address";
      }

      // Validate phone
      if (!validatePhone(tempParentInfo.phone)) {
        newErrors.parentPhone = "Please enter a valid phone number";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Save changes
      setParentInfo(tempParentInfo);
      setIsEditingParent(false);
      Alert.alert("Success", "Parental information updated successfully");
    } else {
      // Enter edit mode
      setTempParentInfo(parentInfo);
      setIsEditingParent(true);
      clearErrors();
    }
  };

  const handleCancelEdit = (type: "child" | "parent") => {
    clearErrors();
    if (type === "child") {
      setTempChildInfo(childInfo);
      setIsEditingChild(false);
    } else {
      setTempParentInfo(parentInfo);
      setIsEditingParent(false);
    }
  };

  const handleDateChange = (text: string) => {
    // Allow user to type freely but validate on save
    setTempChildInfo({ ...tempChildInfo, dob: text });
    // Clear error when user starts typing
    if (errors.childDob) {
      setErrors({ ...errors, childDob: undefined });
    }
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
      boxShadow:
        Platform.OS === "web"
          ? "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3)"
          : undefined,
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
      fontWeight: "600",
      color: "#000000",
      textAlign: "center",
      flex: 1,
      marginLeft: -40,
      fontFamily: "MavenPro-SemiBold",
      userSelect: "none",
    },
    content: {
      paddingHorizontal: 29,
      paddingTop: 20,
    },
    infoCard: {
      backgroundColor: "#F0F0F3",
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      minHeight: 273,
      position: "relative",
      boxShadow:
        Platform.OS === "web"
          ? "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(174, 174, 192, 0.3)"
          : undefined,
      shadowColor: Platform.OS !== "web" ? "#000" : undefined,
      shadowOffset: Platform.OS !== "web" ? { width: 0, height: 2 } : undefined,
      shadowOpacity: Platform.OS !== "web" ? 0.1 : undefined,
      shadowRadius: Platform.OS !== "web" ? 4 : undefined,
      elevation: Platform.OS === "android" ? 3 : 0,
    },
    parentCard: {
      minHeight: 291,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: "#000000",
      fontFamily: "MavenPro-SemiBold",
      userSelect: "none",
    },
    editButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
      backgroundColor: "#F0F0F3",
      boxShadow:
        Platform.OS === "web"
          ? "-3px -3px 6px #FFFFFF, 3px 3px 6px rgba(174, 174, 192, 0.3)"
          : undefined,
      shadowColor: Platform.OS !== "web" ? "#000" : undefined,
      shadowOffset: Platform.OS !== "web" ? { width: 0, height: 1 } : undefined,
      shadowOpacity: Platform.OS !== "web" ? 0.1 : undefined,
      shadowRadius: Platform.OS !== "web" ? 2 : undefined,
      elevation: Platform.OS === "android" ? 2 : 0,
    },
    editButtonText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#7B868C",
      fontFamily: "MavenPro-Medium",
      userSelect: "none",
    },
    saveButton: {
      backgroundColor: "#00754A",
    },
    saveButtonText: {
      color: "#FFFFFF",
    },
    cancelButton: {
      backgroundColor: "#E53E3E",
      marginLeft: 8,
    },
    cancelButtonText: {
      color: "#FFFFFF",
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    infoLabel: {
      fontSize: 16,
      fontWeight: "500",
      color: "#000000",
      fontFamily: "MavenPro-Medium",
      minWidth: 80,
      userSelect: "none",
    },
    infoValue: {
      fontSize: 16,
      fontWeight: "400",
      color: "#000000",
      fontFamily: "MavenPro-Regular",
      flex: 1,
      userSelect: "none",
    },
    textInput: {
      fontSize: 16,
      fontWeight: "400",
      color: "#000000",
      fontFamily: "MavenPro-Regular",
      flex: 1,
      maxWidth: 200,
      backgroundColor: "#FFFFFF",
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#E0E0E0",
    },
    textInputError: {
      borderColor: "#E53E3E",
      borderWidth: 2,
    },
    errorMessage: {
      fontSize: 12,
      color: "#E53E3E",
      fontFamily: "MavenPro-Medium",
      marginTop: 4,
      marginLeft: 80,
      maxWidth: 200,
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: "#F0F0F3",
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "#E53E3E",
      overflow: "hidden",
    },
    childCatImage: {
      position: "absolute",
      width: 137,
      height: 111,
      left: 3, // 32px from screen left - 29px card left margin = 3px
      top: 167, // 300px from screen top - 133px card top = 167px
    },
    parentCatImage: {
      position: "absolute",
      width: 129,
      height: 190,
      right: 0, // Move to the very right edge of the card
      top: 118, // 549px from screen top - 431px card top = 118px
    },
    buttonRow: {
      flexDirection: "row",
      alignItems: "center",
    },
  });

  const renderErrorMessage = (error: string | undefined) => {
    if (!error) return null;
    return <Text style={styles.errorMessage}>{error}</Text>;
  };

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
          accessibilityLabel="Go back to settings"
        >
          <Text style={styles.backButtonText} selectable={false}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.title} selectable={false}>
          Account settings
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Child's Information Card */}
        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Child's information</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.editButton, isEditingChild && styles.saveButton]}
                onPress={handleEditChild}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.editButtonText,
                    isEditingChild && styles.saveButtonText,
                  ]}
                >
                  {isEditingChild ? "Save" : "Edit"}
                </Text>
              </TouchableOpacity>
              {isEditingChild && (
                <TouchableOpacity
                  style={[styles.editButton, styles.cancelButton]}
                  onPress={() => handleCancelEdit("child")}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[styles.editButtonText, styles.cancelButtonText]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            {isEditingChild ? (
              <TextInput
                style={[
                  styles.textInput,
                  errors.childName && styles.textInputError,
                ]}
                value={tempChildInfo.name}
                onChangeText={(text) => {
                  setTempChildInfo({ ...tempChildInfo, name: text });
                  if (errors.childName) {
                    setErrors({ ...errors, childName: undefined });
                  }
                }}
                placeholder="Enter child's name"
              />
            ) : (
              <Text style={styles.infoValue}>{childInfo.name}</Text>
            )}
          </View>
          {renderErrorMessage(errors.childName)}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>DOB:</Text>
            {isEditingChild ? (
              <TextInput
                style={[
                  styles.textInput,
                  errors.childDob && styles.textInputError,
                ]}
                value={tempChildInfo.dob}
                onChangeText={handleDateChange}
                placeholder="DD/MM/YY"
                maxLength={8}
              />
            ) : (
              <Text style={styles.infoValue}>{childInfo.dob}</Text>
            )}
          </View>
          {renderErrorMessage(errors.childDob)}

          <Image
            source={require("../../assets/childCat.png")}
            style={styles.childCatImage}
            resizeMode="contain"
          />
        </View>

        {/* Parental Information Card */}
        <View style={[styles.infoCard, styles.parentCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Parental information</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.editButton,
                  isEditingParent && styles.saveButton,
                ]}
                onPress={handleEditParent}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.editButtonText,
                    isEditingParent && styles.saveButtonText,
                  ]}
                >
                  {isEditingParent ? "Save" : "Edit"}
                </Text>
              </TouchableOpacity>
              {isEditingParent && (
                <TouchableOpacity
                  style={[styles.editButton, styles.cancelButton]}
                  onPress={() => handleCancelEdit("parent")}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[styles.editButtonText, styles.cancelButtonText]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            {isEditingParent ? (
              <TextInput
                style={[
                  styles.textInput,
                  errors.parentName && styles.textInputError,
                ]}
                value={tempParentInfo.name}
                onChangeText={(text) => {
                  setTempParentInfo({ ...tempParentInfo, name: text });
                  if (errors.parentName) {
                    setErrors({ ...errors, parentName: undefined });
                  }
                }}
                placeholder="Enter parent's name"
              />
            ) : (
              <Text style={styles.infoValue}>{parentInfo.name}</Text>
            )}
          </View>
          {renderErrorMessage(errors.parentName)}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            {isEditingParent ? (
              <TextInput
                style={[
                  styles.textInput,
                  errors.parentEmail && styles.textInputError,
                ]}
                value={tempParentInfo.email}
                onChangeText={(text) => {
                  setTempParentInfo({ ...tempParentInfo, email: text });
                  if (errors.parentEmail) {
                    setErrors({ ...errors, parentEmail: undefined });
                  }
                }}
                placeholder="Enter email address"
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.infoValue}>{parentInfo.email}</Text>
            )}
          </View>
          {renderErrorMessage(errors.parentEmail)}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            {isEditingParent ? (
              <TextInput
                style={[
                  styles.textInput,
                  errors.parentPhone && styles.textInputError,
                ]}
                value={tempParentInfo.phone}
                onChangeText={(text) => {
                  setTempParentInfo({ ...tempParentInfo, phone: text });
                  if (errors.parentPhone) {
                    setErrors({ ...errors, parentPhone: undefined });
                  }
                }}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.infoValue}>{parentInfo.phone}</Text>
            )}
          </View>
          {renderErrorMessage(errors.parentPhone)}

          <Image
            source={require("../../assets/parentCat.png")}
            style={styles.parentCatImage}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
};
