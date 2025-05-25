import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Player } from "../types/Player";
import { useGameContext } from "../context/GameContext";
import { Round } from "../types/Game";

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
    <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
      <View style={styles.tableWrapper}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader, styles.firstCell]}>SL.</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Hannan</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Fahimul</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Nahina</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>RAhima</Text>
        </View>
        {rounds.map((round, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? "#F3E9FC" : "#fff" }, 
            ]}
          >
            <Text style={[styles.tableCell, styles.tableData, styles.firstCell]}>{index + 1}</Text>
            <Text style={[styles.tableCell, styles.tableData]}>{round.scores?.[0].points ?? "-"}</Text>
            <Text style={[styles.tableCell, styles.tableData]}>{round.scores?.[1].points ?? "-"}</Text>
            <Text style={[styles.tableCell, styles.tableData]}>{round.scores?.[2].points ?? "-"}</Text>
            <Text style={[styles.tableCell, styles.tableData]}>{round.scores?.[3].points ?? "-"}</Text>
          </View>
        ))}
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
    padding: 8,
    alignItems: "center",
    textAlign: "center",
    width: 80,
    overflow: "hidden",
    maxHeight: 40,
  },
  firstCell: {
    width: 40,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#6C3FC5",
    color: "#fff", 
  },
  tableData: {
    fontSize: 16,
  },
});
