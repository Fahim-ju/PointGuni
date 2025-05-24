import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";

const avatars = [
  require("../../assets/avatar/user1.png"),
  require("../../assets/avatar/user2.png"),
  require("../../assets/avatar/user3.png"),
  require("../../assets/avatar/user4.png"),
  require("../../assets/avatar/user5.png"),
  require("../../assets/avatar/user6.png"),
  require("../../assets/avatar/user7.png"),
  require("../../assets/avatar/user8.png"),
  require("../../assets/avatar/user9.png"),
];

import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootStack";
import { Player } from "../types/Player";
import { useGameContext } from "../context/GameContext";

type PlayerSetupScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "PointView">;
};

const PlayerSetupScreen = ({ navigation }: PlayerSetupScreenProps) => {
  const { setPlayers } = useGameContext();

  const [temporaryPlayers, setTemporaryPlayers] = useState<Player[]>([
    { id: 1, name: "", avatar: 0 },
    { id: 2, name: "", avatar: 1 },
    { id: 3, name: "", avatar: 2 },
    { id: 4, name: "", avatar: 3 },
  ]);

  const handleNameChange = (index: number, name: string) => {
    const updated = [...temporaryPlayers];
    updated[index].name = name;
    setTemporaryPlayers(updated);
  };

  const handleAvatarSelect = (playerIndex: number, avatarIndex: number) => {
    const updated = [...temporaryPlayers];
    updated[playerIndex].avatar = avatarIndex;
    setTemporaryPlayers(updated);
  };

  const handleStart = () => {
    // Pass players data to next screen or save in context/state
    setPlayers(temporaryPlayers);
    navigation.navigate("PointView");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Player Setup</Text>
      {temporaryPlayers.map((player, idx) => (
        <View key={idx} style={styles.playerBlock}>
          <Text style={styles.label}>Player {idx + 1} Name:</Text>
          <TextInput
            style={styles.input}
            value={player.name}
            onChangeText={(text) => handleNameChange(idx, text)}
            placeholder={`Enter name for Player ${idx + 1}`}
          />
          <Text style={styles.label}>Select Avatar:</Text>
          <View style={styles.avatarRow}>
            {avatars.map((avatar, aIdx) => (
              <TouchableOpacity
                key={aIdx}
                onPress={() => handleAvatarSelect(idx, aIdx)}
                style={[styles.avatarContainer, player.avatar === aIdx && styles.selectedAvatar]}
              >
                <Image source={avatar} style={styles.avatar} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#E9DBF8", flexGrow: 1 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  playerBlock: { marginBottom: 30 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 10, marginBottom: 10 },
  avatarRow: { flexDirection: "row", flexWrap: "wrap" },
  avatarContainer: { margin: 5, borderWidth: 2, borderColor: "transparent", borderRadius: 8 },
  selectedAvatar: { borderColor: "#3B3B98" },
  avatar: { width: 50, height: 50, borderRadius: 8 },
  startButton: { backgroundColor: "#3B3B98", padding: 16, borderRadius: 10, alignItems: "center" },
  startButtonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});

export default PlayerSetupScreen;
