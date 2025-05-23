import React from "react";
import { View, StyleSheet } from "react-native";
import PlayerCard from "./PlayerCard";

const GridPointView = () => {
  const players = [
    { name: "Alice", totalPoints: 120, lastPoint: 10, avatarName: "user1" },
    { name: "Bob", totalPoints: 95, lastPoint: 20, avatarName: "user2" },
    { name: "Charlie", totalPoints: 110, lastPoint: 5, avatarName: "user3" },
    { name: "Diana", totalPoints: 85, lastPoint: 15, avatarName: "user4" },
  ];

  return (
    <View style={styles.container}>
      {players.map((player, index) => (
        <PlayerCard
          key={index}
          name={player.name}
          totalPoints={player.totalPoints}
          lastPoint={player.lastPoint}
          avatarName={player.avatarName}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // or 'space-between'
  },
});

export default GridPointView;
