import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Player } from "../../types/Player";
import { useGameContext } from "../../context/GameContext";

type GameFinishModalProps = {
  visible: boolean;
  playersBelowMin: Player[];
  onRestart: () => void;
  onContinue: () => void;
};

const GameFinishModal: React.FC<GameFinishModalProps> = ({ visible, playersBelowMin, onRestart, onContinue }) => {
  const { players } = useGameContext();
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Party Mode Icon */}
          <MaterialCommunityIcons name="party-popper" size={80} color="#8E7DBE" style={styles.partyIcon} />
          <Text style={styles.title}>Party Mode!</Text>
          <Text style={styles.message}>{playersBelowMin.map((p) => p.name).join(", ")} reached the minimum point!</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onRestart} style={[styles.button, { marginRight: 16 }]}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onContinue} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0008",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    minWidth: 280,
  },
  partyIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  message: {
    marginBottom: 16,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#E9DBF8",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#3B3B98",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GameFinishModal;
