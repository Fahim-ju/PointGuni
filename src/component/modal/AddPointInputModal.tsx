import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Player } from "../../types/Player";
import { PointRow } from "../../types/Game";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: PointRow[]) => void;
  players: Player[];
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

const AddPointModal: React.FC<Props> = ({ visible, onClose, onSubmit, players }) => {
  const [points, setPoints] = useState<string[]>([]);

  useEffect(() => {
    setPoints(players.map(() => ""));
  }, [players, visible]);

  const handleInputChange = (text: string, index: number) => {
    const newPoints = [...points];
    newPoints[index] = text;
    setPoints(newPoints);
  };

  const handleSubmit = () => {
    // Check if all fields are filled
    const allFilled = points.every((val) => val.trim() !== "");
    if (!allFilled) {
      alert("Please fill in all point fields.");
      return;
    }
    const pointRows: PointRow[] = players.map((player, idx) => ({
      playerId: player.id,
      point: parseInt(points[idx], 10) || 0,
    }));
    onSubmit(pointRows);
    setPoints(players.map(() => ""));
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add Points</Text>
          {players.map((player, index) => (
            <View key={player.id} style={styles.row}>
              <Image source={avatarImages[player.avatar]} style={styles.avatar} />
              <Text style={styles.name}>{player.name}</Text>
              <TextInput
                placeholder="Point"
                keyboardType="numeric"
                value={points[index]}
                onChangeText={(text) => handleInputChange(text, index)}
                style={styles.input}
              />
            </View>
          ))}
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.btn}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={[styles.btn, styles.submitBtn]}>
              <Text style={styles.btnText}>Submit</Text>
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
    width: 320,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  name: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    width: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    textAlign: "center",
    backgroundColor: "#f9f9f9",
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

export default AddPointModal;
