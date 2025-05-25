import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootStack";
import { Player } from "../types/Player";
import { useGameContext } from "../context/GameContext";

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

  // Refs for each player's avatar ScrollView
  const avatarScrollRefs = useRef<(ScrollView | null)[]>([]);

  useEffect(() => {
    temporaryPlayers.forEach((player, idx) => {
      const ref = avatarScrollRefs.current[idx];
      if (ref && player.avatar != null) {
        const scrollToX = Math.max(0, player.avatar * 48 - 42);
        ref.scrollTo({ x: scrollToX, animated: true });
      }
    });
  }, []); 

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
    const allNamesFilled = temporaryPlayers.every((p) => p.name.trim().length > 0);
    if (!allNamesFilled) {
      alert("Please enter a name for every player.");
      return;
    }
    setPlayers(temporaryPlayers);
    navigation.navigate("GameSettingsScreen");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Player Setup</Text>
      {temporaryPlayers.map((player, idx) => (
        <View key={idx} style={styles.playerBlock}>
          <Text style={styles.label}>Player {idx + 1}</Text>
          <View style={styles.playerInfo}>
            <TextInput
              style={styles.input}
              value={player.name}
              onChangeText={(text) => handleNameChange(idx, text)}
              placeholder={`Enter name of Player ${idx + 1}`}
              multiline={false}
              numberOfLines={1}
              textAlignVertical="center"
            />
            <ScrollView
              ref={(ref) => {
                avatarScrollRefs.current[idx] = ref;
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.avatarScroll}
              contentContainerStyle={styles.avatarRow}
            >
              {avatars.map((avatar, aIdx) => (
                <TouchableOpacity
                  key={aIdx}
                  onPress={() => handleAvatarSelect(idx, aIdx)}
                  style={[styles.avatarContainer, player.avatar === aIdx && styles.selectedAvatar]}
                >
                  <Image source={avatar} style={styles.avatar} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Next</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12, backgroundColor: "#E9DBF8", flexGrow: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  playerBlock: {
    marginBottom: 20,
    backgroundColor: "#D6C1E6",
    borderWidth: 0.5,
    borderColor: "#C1B2D6",
    padding: 10,
    borderRadius: 5,
    elevation: 8,
    shadowColor: "white",
    shadowOpacity: 0.7,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  playerInfo: { flexDirection: "row", alignItems: "center" },
  label: { fontSize: 16, fontWeight: "600" },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 8, flex: 1, fontSize: 16 },
  avatarRow: { flexDirection: "row", alignItems: "center" },
  avatarScroll: { margin: 10, maxWidth: 153 },
  avatarContainer: { margin: 4, borderWidth: 2, borderColor: "transparent", borderRadius: 8 },
  selectedAvatar: { borderColor: "midnightblue" },
  avatar: { width: 40, height: 40, borderRadius: 5 },
  startButton: { marginTop: 10, backgroundColor: "#3B3B98", padding: 10, borderRadius: 10, alignItems: "center" },
  startButtonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});

export default PlayerSetupScreen;
