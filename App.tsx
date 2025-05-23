import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar as RNStatusBar, ScrollView, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import Footer from "./component/Footer";
import Icon from "react-native-vector-icons/FontAwesome";
import PlayerCard from "./component/PlayerCard";
import GridPointView from "./component/GridPointView";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ImageBackground source={require("./assets/icon.png")} style={styles.background} resizeMode="cover">
        <View style={styles.header}>
          <Text style={styles.title}>PointGuni</Text>
        </View>
        <GridPointView />
      </ImageBackground>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  background: {
    flex: 1,
  },
  header: {
    backgroundColor: "#264653",
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    elevation: 2,
  },
  title: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
  },
  playerContainer: {
    flexDirection: "row",
  },
});
