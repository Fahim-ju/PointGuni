import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import PlayerCard from "./PlayerCard";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 30;

const players = [
  { name: "Hannan", totalPoints: 120, lastPoint: 10, avatarName: "user1" },
  { name: "Rijvy", totalPoints: 95, lastPoint: 20, avatarName: "user2" },
  { name: "Anowar", totalPoints: 110, lastPoint: 5, avatarName: "user3" },
  { name: "Sohan", totalPoints: 85, lastPoint: 15, avatarName: "user4" },
];

const GridPointView = () => {
  return (
    <FlatList
      data={players}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <PlayerCard name={item.name} totalPoints={item.totalPoints} lastPoint={item.lastPoint} avatarName={item.avatarName} />
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardWrapper: {
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
  },
});

export default GridPointView;
