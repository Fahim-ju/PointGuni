import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Player } from "../types/Player";
import { useGameContext } from "../context/GameContext";

const ListPointView = () => {
  const { players } = useGameContext();

  // Find the max number of rounds (points) among all players
  const maxRounds = players.reduce((max, p) => Math.max(max, p.points?.length || 0), 0);

  return (
    <ScrollView horizontal style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.tableWrapper}>
        {/* Table Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerCellFirst}>
            <Text style={styles.headerText}>Round</Text>
          </View>
          {players.map((player) => (
            <View style={styles.headerCell} key={player.id}>
              <Text style={styles.headerText}>{player.name}</Text>
            </View>
          ))}
        </View>

        {/* Table Rows */}
        {Array.from({ length: maxRounds }).map((_, roundIdx) => (
          <View style={[styles.row, roundIdx % 2 === 0 ? styles.rowEven : styles.rowOdd]} key={roundIdx}>
            <View style={styles.cellFirst}>
              <Text style={styles.roundText}>{roundIdx + 1}</Text>
            </View>
            {players.map((player) => (
              <View style={styles.cell} key={player.id}>
                <Text style={styles.pointText}>
                  {player.points && player.points[roundIdx] !== undefined ? player.points[roundIdx] : "-"}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ListPointView;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#E9DBF8",
    minWidth: "100%",
  },
  tableWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#B39DDB",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    minWidth: 320,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#8E7DBE",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 44,
    alignItems: "center",
  },
  headerCellFirst: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#6C5B9F",
    borderTopLeftRadius: 16,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
  },
  rowEven: {
    backgroundColor: "#F3EFFF",
  },
  rowOdd: {
    backgroundColor: "#fff",
  },
  cellFirst: {
    minWidth: 60,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
  },
  cell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#F0F0F0",
  },
  roundText: {
    fontWeight: "bold",
    color: "#6C5B9F",
    fontSize: 15,
  },
  pointText: {
    fontSize: 15,
    color: "#3B3B98",
    fontWeight: "600",
  },
});
