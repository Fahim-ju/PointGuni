import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import PlayerCard from "./PlayerCard";
import { Player } from "../types/Player";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 30;

const GridPointView: React.FC<{ players: Player[] }> = ({ players }) => {
  return (
    <FlatList
      data={players}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <PlayerCard player={item} />
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
