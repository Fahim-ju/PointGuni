import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import { Player } from "../types/Player";
import { useGameContext } from "../context/GameContext";
import { Round } from "../types/Game";

const screenHeight = Dimensions.get("window").height;

const ListPointView = () => {
  const { players } = useGameContext();
  const rounds: Round[] = React.useMemo(() => {
    const maxRounds = Math.max(...players.map((player) => player.points?.length ?? 0));
    const tempRounds: Round[] = [];
    for (let roundIndex = 0; roundIndex < maxRounds; roundIndex++) {
      const scores = players.map((player) => ({
        playerId: player.id,
        points: player.points?.[roundIndex] ?? 0,
      }));
      tempRounds.push({
        roundNumber: roundIndex + 1,
        scores,
      });
    }
    return tempRounds;
  }, [players]);


  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
      <View style={styles.tableWrapper}>
        <View style={[styles.tableRow, { backgroundColor: "#F5F1FA" }]}>
          <Text style={[styles.tableCell, styles.tableHeader, styles.firstCell, { color: "#6C3FC5" }]}>T</Text>
          <Text style={[styles.tableCell, styles.tableHeader, { color: "#6C3FC5" }]}>{players?.[0]?.totalPoints ?? "_"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader, { color: "#6C3FC5" }]}>{players?.[1]?.totalPoints ?? "_"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader, { color: "#6C3FC5" }]}>{players?.[2]?.totalPoints ?? "_"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader, { color: "#6C3FC5" }]}>{players?.[3]?.totalPoints ?? "_"}</Text>
        </View>
        <View style={[styles.tableRow, { backgroundColor: "#6C3FC5" }]}>
          <Text style={[styles.tableCell, styles.tableHeader, styles.firstCell, { color: "#fff" }]}>SL.</Text>
          <Text style={[styles.tableCell, styles.tableHeader, { color: "#fff" }]}>{players?.[0].name ?? "-"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader, { color: "#fff" }]}>{players?.[1].name ?? "-"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader, { color: "#fff" }]}>{players?.[2].name ?? "-"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader, { color: "#fff" }]}>{players?.[3].name ?? "-"}</Text>
        </View>
        {/* Scrollable Body */}
        <ScrollView style={[styles.bodyScroll]} showsVerticalScrollIndicator={false}>
          {rounds.map((round, index) => (
            <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#F3E9FC" : "#fff" }]}>
              <Text style={[styles.tableCell, styles.tableData, styles.firstCell]}>{index + 1}</Text>
              <Text style={[styles.tableCell, styles.tableData]}>{round.scores?.[0].points ?? "-"}</Text>
              <Text style={[styles.tableCell, styles.tableData]}>{round.scores?.[1].points ?? "-"}</Text>
              <Text style={[styles.tableCell, styles.tableData]}>{round.scores?.[2].points ?? "-"}</Text>
              <Text style={[styles.tableCell, styles.tableData]}>{round.scores?.[3].points ?? "-"}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ListPointView;
const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
    backgroundColor: "#E9DBF8",
  },
  tableWrapper: {
    alignItems: "center",
    borderRadius: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderRadius: 5,
  },
  tableCell: {
    padding: 10,
    alignItems: "center",
    textAlign: "center",
    width: 80,
    overflow: "hidden",
    maxHeight: 40,
  },
  firstCell: {
    fontWeight: "500",
    width: 40,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  tableSumHeader: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "gray",
    color: "#fff",
  },
  tableData: {
    fontSize: 18,
    fontWeight: "600",
  },
  bodyScroll: {
    maxHeight: screenHeight,
  },
});
