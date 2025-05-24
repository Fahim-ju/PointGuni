import React, { useState, useRef } from "react";
import { View, StyleSheet, Platform, StatusBar as RNStatusBar, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import Footer from "./component/Footer";
import HeaderBar from "./component/HeaderBar";
import AppNavigator from "./navigation/AppNavigator";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { GameProvider } from "./context/GameContext";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string | undefined>("Home");
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  return (
    <GameProvider>
      <View style={styles.container}>
        <NavigationContainer ref={navigationRef} onStateChange={() => setCurrentRoute(navigationRef.current?.getCurrentRoute()?.name)}>
          <StatusBar style="dark" />
          <ImageBackground style={styles.background} resizeMode="cover" blurRadius={3}>
            <HeaderBar hideActionIcons={currentRoute === "Home"} />
            <AppNavigator />
            {currentRoute !== "Home" && <Footer />}
          </ImageBackground>
        </NavigationContainer>
      </View>
    </GameProvider>
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
});
