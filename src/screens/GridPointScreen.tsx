import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import GridPointView from "../component/GridPointView";
import AddPointButton from "../component/AddPointButton";
import AddPointModal from "../component/modal/AddPointInputModal";
import { useGameContext } from "../context/GameContext";
import { PointRow } from "../types/Game";


const GridPointScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const { players, updatePlayerPoints } = useGameContext();

  const handlePointSubmit = (values: PointRow[]) => {
    console.log("Submitted points:", values);
    updatePlayerPoints(values);
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: "#E9DBF8" }}>
      <GridPointView players={players} />
      <View style={styles.addButtonContainer}>
        <AddPointButton onPress={openModal} />
      </View>
      <AddPointModal visible={modalVisible} onClose={closeModal} onSubmit={handlePointSubmit} players={players} />
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
