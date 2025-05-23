import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert("Home")}>
        <MaterialCommunityIcons
          name="view-dashboard-outline"
          size={28}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert("List")}>
        <MaterialCommunityIcons
          name="format-list-bulleted"
          size={28}
          color="white"
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
    backgroundColor: "#3B3B98",
    paddingVertical: 10,
    borderTopWidth: .2,
    borderTopColor: "#eee",
  },
  iconButton: {
    padding: 10,
  },
});

export default Footer;
