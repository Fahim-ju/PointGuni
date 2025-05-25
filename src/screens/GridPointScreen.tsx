import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import GridPointView from "../component/GridPointView";
import AddPointButton from "../component/AddPointButton";
import AddPointModal from "../component/modal/AddPointInputModal";
import { useGameContext } from "../context/GameContext";
import { PointRow } from "../types/Game";
import GameFinishModal from "../component/modal/GameFinishModal";
import { Player } from "../types/Player";

const GridPointScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [playersBelowMin, setPlayersBelowMin] = useState<Player[]>([]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const { players, updatePlayerPoints, resetPoints, checkGameFinish, updateGameSettings } = useGameContext();

  const handlePointSubmit = (values: PointRow[]) => {
    updatePlayerPoints(values);
    setPlayersBelowMin(checkGameFinish());
  };

  const handleContinueGame = () => {
    updateGameSettings({ minPoints: -999999999 });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E9DBF8" }}>
      <GridPointView players={players} />
      <View style={styles.addButtonContainer}>
        <AddPointButton onPress={openModal} />
      </View>
      <GameFinishModal
        visible={playersBelowMin.length > 0}
        playersBelowMin={playersBelowMin}
        onRestart={resetPoints}
        onContinue={() => console.log("continue")}
      />
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
