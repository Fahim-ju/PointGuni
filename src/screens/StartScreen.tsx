import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

type StartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "StartScreen">;
};

const StartScreen: React.FC<StartScreenProps> = ({ navigation }) => {
  const [canResume, setCanResume] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("players").then((data) => setCanResume(!!data));
  }, []);

  const handleNewGame = () => {
    navigation.navigate("PlayerSetupScreen");
  };
  const handleResume = () => {
    if (!canResume) Alert.alert("No saved game found", "Please start a new game first.");
    else navigation.navigate("PointView");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleNewGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleResume}>
        <Text style={styles.buttonText}>Resume</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9DBF8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#3B3B98",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    maxHeight: 60,
    minWidth: 200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default StartScreen;
