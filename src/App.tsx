import React, { useState } from "react";
import { View, StyleSheet, Platform, StatusBar as RNStatusBar, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import Footer from "./component/Footer";
import HeaderBar from "./component/HeaderBar";
import AddPointButton from "./component/AddPointButton";
import AddPointModal from "./component/modal/AddPointInputModal";
import AppNavigator from "./navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Handle submitted points here
  const handlePointSubmit = (values: number[]) => {
    console.log("Submitted points:", values);
    // You can update your player points or state here
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <ImageBackground style={styles.background} resizeMode="cover" blurRadius={3}>
          <HeaderBar />
          <AppNavigator />
          <View style={styles.addButtonContainer}>
            <AddPointButton onPress={openModal} />
          </View>
          <Footer />
          <AddPointModal visible={modalVisible} onClose={closeModal} onSubmit={handlePointSubmit} />
        </ImageBackground>
      </NavigationContainer>
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
    backgroundColor: "#D7C3F1",
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});