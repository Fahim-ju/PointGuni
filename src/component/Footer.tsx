import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("GridPointView")}>
        <MaterialCommunityIcons name="view-dashboard-outline" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("ListPointView")}>
        <MaterialCommunityIcons name="format-list-bulleted" size={28} color="white" />
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
    paddingVertical: 10,
    borderTopWidth: 0.2,
    borderTopColor: "#eee",
  },
  iconButton: {
    padding: 10,
  },
});

export default Footer;
