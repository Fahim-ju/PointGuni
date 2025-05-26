import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { Player } from "../../types/Player";
import { useGameContext } from "../../context/GameContext";

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

const playerRowColors = ["#FDEBD0", "#D6EAF8", "#D5F5E3", "#F9E79F", "#F5CBA7", "#E8DAEF", "#FADBD8", "#D4E6F1", "#D1F2EB"];

type Props = {
  visible: boolean;
  onClose: () => void;
};

const SettingsModal: React.FC<Props> = ({ visible, onClose }) => {
  const { players, setPlayers, gameSettings, setGameSettings } = useGameContext();
  const [threshold, setThreshold] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    setThreshold(gameSettings?.minPoints?.toString() || "");
    setNames(players.map((p: Player) => p.name));
  }, [players, visible, gameSettings]);

  const handleNameChange = (text: string, idx: number) => {
    const newNames = [...names];
    newNames[idx] = text;
    setNames(newNames);
  };

  const handleSubmit = () => {
    // Validate threshold
    if (!threshold.trim() || isNaN(Number(threshold))) {
      alert("Please enter a valid threshold value.");
      return;
    }
    // Validate names
    if (names.some((n) => !n.trim())) {
      alert("Please enter all player names.");
      return;
    }
    // Update player names
    const updatedPlayers = players.map((p: Player, idx: number) => ({ ...p, name: names[idx] }));
    setPlayers(updatedPlayers);
    // Update threshold
    setGameSettings({ ...gameSettings, minPoints: Number(threshold) });
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Game Settings</Text>
          <Text style={styles.label}>Game Threshold (Min Points):</Text>
          <TextInput
            placeholder="Enter threshold value"
            keyboardType="numeric"
            value={threshold}
            onChangeText={setThreshold}
            style={styles.input}
          />
          <Text style={[styles.label, { marginTop: 16 }]}>Rename Players:</Text>
          <View>
            {players.map((player: Player, index: number) => (
              <View key={player.id} style={[styles.row, { backgroundColor: playerRowColors[index % playerRowColors.length] }]}>
                <Image source={avatarImages[player.avatar]} style={styles.avatar} />
                <TextInput
                  placeholder="Player Name"
                  value={names[index]}
                  onChangeText={(text) => handleNameChange(text, index)}
                  style={styles.nameInput}
                />
              </View>
            ))}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.btn}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={[styles.btn, styles.submitBtn]}>
              <Text style={styles.btnText}>Save</Text>
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
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: 340,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  btn: {
    padding: 10,
  },
  submitBtn: {
    marginLeft: 10,
  },
  btnText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default SettingsModal;
