import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  StartScreen: undefined;
  GridPointView: undefined;
};

type StartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "StartScreen">;
};

const StartScreen: React.FC<StartScreenProps> = ({ navigation }) => {
  const handleNewGame = () => {
    navigation.navigate("GridPointView");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleNewGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default StartScreen;
