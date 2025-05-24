import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import GridPointView from "../component/GridPointView";
import { RootStackParamList } from "../types/RootStack";
import { RouteProp } from "@react-navigation/native";
import AddPointButton from "../component/AddPointButton";
import AddPointModal from "../component/modal/AddPointInputModal";

type GridPointViewProps = {
  route: RouteProp<RootStackParamList, "GridPointView">;
};
const GridPointScreen: React.FC<GridPointViewProps> = ({ route }) => {
  const { players } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Handle submitted points here
  const handlePointSubmit = (values: number[]) => {
    console.log("Submitted points:", values);
    // You can update your player points or state here
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#E9DBF8" }}>
      <GridPointView players={players} />
      <View style={styles.addButtonContainer}>
        <AddPointButton onPress={openModal} />
      </View>
      <AddPointModal visible={modalVisible} onClose={closeModal} onSubmit={handlePointSubmit} />
    </View>
  );
};

export default GridPointScreen;

const styles = StyleSheet.create({
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
