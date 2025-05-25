import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Player } from "../../types/Player";
import { useGameContext } from "../../context/GameContext";

type GameFinishModalProps = {
  visible: boolean;
  playersBelowMin: Player[];
  onRestart: () => void;
  onContinue: () => void;
};

const avatarImages = [
  require("../../../assets/avatar/user1.png"),
  require("../../../assets/avatar/user2.png"),
  require("../../../assets/avatar/user3.png"),
  require("../../../assets/avatar/user4.png"),
  require("../../../assets/avatar/user5.png"),
  require("../../../assets/avatar/user6.png"),
  require("../../../assets/avatar/user7.png"),
  require("../../../assets/avatar/user8.png"),
  require("../../../assets/avatar/user9.png"),
];

const GameFinishModal: React.FC<GameFinishModalProps> = ({ visible, playersBelowMin, onRestart, onContinue }) => {
  playersBelowMin = [
    {
      id: 1,
      name: "Player 1",
      avatar: 0,
    },
  ];
  const { players } = useGameContext();
  return (
    <Modal visible={true} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Party Mode Icon */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 , gap: 10 }}>
            <MaterialCommunityIcons name="party-popper" size={40} color="#8E7DBE" style={styles.partyIcon} />
            <Text style={styles.title}>Party is ON!</Text>
          </View>
          <View style={styles.playerContainer}>
            {players.map((player) => (
              <View
                key={player.id}
                style={[styles.playerRow, { backgroundColor: playersBelowMin.some((x) => x.id === player.id) ? "#FFCCCC" : "#F3E8FF" }]}
              >
                <Image source={avatarImages[player.avatar]} style={styles.playerIcon} />
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.point}>{player.totalPoints}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.message}>Restart to start new game with same Players OR continue this game.</Text>
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
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    minWidth: 280,
  },
  partyIcon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8E7DBE",
  },
  playerContainer: {
    backgroundColor: "#F3E8FF",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    width: "100%",
    gap: 10,
  },
  playerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  playerName: {
    flex: 1,
    fontSize: 20,
    marginRight: 10,
    fontWeight: "bold",
  },
  point: {
    fontSize: 20,
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
