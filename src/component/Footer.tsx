import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/RootStack";
import Toast from "react-native-toast-message";

type Props = {
  onGridPress: () => void;
  onListPress: () => void;
  isGridViewActive?: boolean;
};

const Footer: React.FC<Props> = ({ onGridPress, onListPress, isGridViewActive }) => {
  const handleGridPress = () => {
    if (isGridViewActive) {
      // Replace Alert with Toast for better UX
      // If using 'react-native-toast-message':
      // import Toast from 'react-native-toast-message';
      // Toast.show({ type: 'info', text1: 'Already in Grid View', text2: 'You are already viewing the grid layout.' });

      // If using 'react-native-simple-toast':
      // import Toast from 'react-native-simple-toast';
      // Toast.show('Already in Grid View');

      // Example with 'react-native-toast-message':
      // (Make sure to install and configure the toast library in your project)
      // Toast.show({
      //   type: 'info',
      //   text1: 'Already in Grid View',
      //   text2: 'You are already viewing the grid layout.',
      // });

      // For demonstration, here's a simple Toast usage:
      Toast.show({
        type: "info",
        text1: "Already in Grid View",
        text2: "You are already viewing the grid layout.",
      });
    } else {
      onGridPress();
    }
  };

  const handleListPress = () => {
    if (!isGridViewActive) {
      Alert.alert("Already in List View", "You are already viewing the list layout.");
    } else {
      onListPress();
    }
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={[styles.iconButton, isGridViewActive && styles.activeTab]} activeOpacity={0.85} onPress={handleGridPress}>
        <MaterialCommunityIcons
          name="view-dashboard-outline"
          size={isGridViewActive ? 30 : 28}
          color={isGridViewActive ? "#fff" : "#E0E0E0"}
          style={isGridViewActive ? styles.activeIcon : undefined}
        />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconButton, !isGridViewActive && styles.activeTab]} activeOpacity={0.85} onPress={handleListPress}>
        <MaterialCommunityIcons
          name="format-list-bulleted"
          size={!isGridViewActive ? 30 : 28}
          color={!isGridViewActive ? "#fff" : "#E0E0E0"}
          style={!isGridViewActive ? styles.activeIcon : undefined}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#8E7DBE",
    paddingVertical: 8,
    borderTopWidth: 0.2,
    borderTopColor: "#eee",
  },
  iconButton: {
    padding: 10,
    borderRadius: 24,
    marginHorizontal: 6,
  },
  activeTab: {
    backgroundColor: "#6C5B9F",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 10,
    shadowColor: "#6C5B9F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#fff",
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIcon: {
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    transform: [{ scale: 1.02 }],
  },
});

export default Footer;
