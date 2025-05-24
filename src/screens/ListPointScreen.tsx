import { View, Text } from "react-native";
import React from "react";
import ListPointView from "../component/ListPointView";
import { useGameContext } from "../context/GameContext";

const ListPointScreen = () => {
  const { players, updatePlayerPoints } = useGameContext();
  return (
    <View style={{ flex: 1, backgroundColor: "#E9DBF8" }}>
      <ListPointView players={players} />
    </View>
  );
};

export default ListPointScreen;
