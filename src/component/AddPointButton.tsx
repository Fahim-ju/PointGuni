import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
  onPress?: () => void;
};

const AddPointButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Icon name="plus" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF6EC7", // Your preferred color
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default AddPointButton;
