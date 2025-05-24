import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/RootStack";

const Footer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = { name: "GridPointView" };
  const isGridActive = route.name === "GridPointView";
  const isListActive = route.name === "ListPointView";
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={[styles.iconButton, isGridActive && styles.activeTab]}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("GridPointView")}
      >
        <MaterialCommunityIcons
          name="view-dashboard-outline"
          size={isGridActive ? 30 : 28}
          color={isGridActive ? "#fff" : "#E0E0E0"}
          style={isGridActive ? styles.activeIcon : undefined}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, isListActive && styles.activeTab]}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("ListPointView")}
      >
        <MaterialCommunityIcons
          name="format-list-bulleted"
          size={isListActive ? 34 : 28}
          color={isListActive ? "#FFD600" : "#E0E0E0"}
          style={isListActive ? styles.activeIcon : undefined}
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
