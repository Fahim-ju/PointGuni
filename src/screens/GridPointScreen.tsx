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
  const [gameFinishModalVisible, setGameFinishModalVisible] = useState(false);
  const [playersBelowMin, setPlayersBelowMin] = useState<Player[]>([]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const { players, updatePlayerPoints, resetPoints, checkGameFinish, updateGameSettings } = useGameContext();

  const handlePointSubmit = (values: PointRow[]) => {
    const updatedPlayers = updatePlayerPoints(values);
    const finishers = checkGameFinish(updatedPlayers);
    setPlayersBelowMin(finishers);
    console.log("Loser Players:", finishers);
    if (finishers.length > 0) {
      setGameFinishModalVisible(true);
    }
  };

  const handleContinueGame = () => {
    setGameFinishModalVisible(false);
    updateGameSettings({ minPoints: -999999999 });
  };

  const handleRestartGame = () => {
    resetPoints();
    setGameFinishModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E9DBF8" }}>
      <GridPointView players={players} />
      <View style={styles.addButtonContainer}>
        <AddPointButton onPress={openModal} />
      </View>
      <GameFinishModal
        visible={gameFinishModalVisible}
        playersBelowMin={playersBelowMin}
        onRestart={handleRestartGame}
        onContinue={handleContinueGame}
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
