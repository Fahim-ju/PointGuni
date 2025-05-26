import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootStack";
import { useGameContext } from "../context/GameContext";
import Icon from "react-native-vector-icons/FontAwesome";

// Add more settings as needed
export type GameSettings = {
  minPoint: number;
  allowNegative: boolean;
};

type GameSettingsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "PlayerSetupScreen">;
};

const GameSettingsScreen = ({ navigation }: GameSettingsScreenProps) => {
  const { updateGameSettings } = useGameContext();
  const [minPoint, setMinPoint] = useState("-50");

  const handleNext = () => {
    if (!minPoint || isNaN(Number(minPoint))) {
      alert("Please enter a valid minimum point value.");
    }
    updateGameSettings({ minPoints: Number(minPoint) });
    navigation.navigate("PointView");
  };

  const handlePrev = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Settings</Text>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Minimum Points to End The Game</Text>
        <TextInput style={styles.input} value={minPoint} onChangeText={setMinPoint} keyboardType="numeric" />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.nextButton} onPress={handlePrev}>
            <Icon name="backward" size={24} color="#fff" />
          <Text style={styles.nextButtonText}>Player Setup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Start Game</Text>
            <Icon name="forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E9DBF8", padding: 12, justifyContent: "flex-start" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 32, textAlign: "center" },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    justifyContent: "space-between",
    backgroundColor: "#D6C1E6",
    borderWidth: 0.5,
    borderColor: "#C1B2D6",
    padding: 16,
    borderRadius: 8,
  },
  label: { fontSize: 17, fontWeight: "600" },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 8, width: 80, fontSize: 16, textAlign: "center" },
  nextButton: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#3B3B98",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  nextButtonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});

export default GameSettingsScreen;
