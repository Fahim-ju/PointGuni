import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const ListPointView = () => {
  const names = ["A", "B", "C", "D"];
  const points = [
    [1, -5, 2, 4],
    [2, 3, 1, -4],
    [-1, 2, 3, 5],
    [4, -2, 1, -3],
    [0, 1, -2, 3],
    [-3, 4, -1, 2],
    [5, -4, 0, 1],
    [1, -5, 2, 4],
    [2, 3, 1, -4],
    [-1, 2, 3, 5],
    [4, -2, 1, -3],
    [0, 1, -2, 3],
    [-3, 4, -1, 2],
    [5, -4, 0, 1],
    [-2, 3, -5, 4],
    [1, -1, 2, -2],
    [3, 0, -4, 5],
  ];
  return (
    <ScrollView>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={[styles.column, styles.colHeader, styles.commonTableHeader]}>
            <Text style={styles.headerText}>User A </Text>
          </View>
          <View style={[styles.column, styles.colHeader, styles.commonTableHeader]}>
            <Text style={styles.headerText}>User B</Text>
          </View>
          <View style={[styles.column, styles.colHeader, styles.commonTableHeader]}>
            <Text style={styles.headerText}>User C</Text>
          </View>
          <View style={[styles.column, styles.colHeader, styles.commonTableHeader]}>
            <Text style={styles.headerText}>User D</Text>
          </View>
        </View>
        {/* Table Row */}
        {points.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((point, colIndex) => (
              <View key={colIndex} style={[styles.column, (styles as any)[`col${names[colIndex]}`]]}>
                <Text style={styles.text}>{point}</Text>
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderWidth: 0.5,
    borderColor: "black",
  },
  colHeader: {
    borderBottomWidth: 0,
    borderBottomColor: "#888",
  },
  commonTableHeader: { backgroundColor: "#2a9d8f" },
  colA: {
    backgroundColor: "#caf0f8",
  },
  colB: {
    backgroundColor: "#f5ebe0",
  },
  colC: {
    backgroundColor: "#e3d5ca",
  },
  colD: {
    backgroundColor: "#90e0ef",
  },
  text: {
    fontSize: 18,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "condensedBold",
    color: "white",
  },
});
