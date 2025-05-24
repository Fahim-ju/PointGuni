import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: number[]) => void;
};

const AddPointModal: React.FC<Props> = ({ visible, onClose, onSubmit }) => {
  const [points, setPoints] = useState(["", "", "", ""]);

  const handleInputChange = (text: string, index: number) => {
    const newPoints = [...points];
    newPoints[index] = text;
    setPoints(newPoints);
  };

  const handleSubmit = () => {
    const numericPoints = points.map(p => parseInt(p, 10) || 0);
    onSubmit(numericPoints);
    setPoints(["", "", "", ""]);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add 4 Point Values</Text>

          {points.map((val, index) => (
            <TextInput
              key={index}
              placeholder={`Point ${index + 1}`}
              keyboardType="numeric"
              value={val}
              onChangeText={(text) => handleInputChange(text, index)}
              style={styles.input}
            />
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
    width: 300,
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
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
