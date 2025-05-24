import { useNavigation, useNavigationState } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useGameContext } from "../context/GameContext";
import SettingsModal from "./modal/SettingsModal";
type Props = {
  hideActionIcons?: boolean;
};

const HeaderBar: React.FC<Props> = ({ hideActionIcons }) => {
  const navigation = useNavigation<any>();
  const { resetPoints } = useGameContext();
  const [settingsVisible, setSettingsVisible] = useState(false);

  const onRestart = () => {
    resetPoints();
  };
  const handleHome = () => {
    navigation.navigate("Home");
  };
  const onSettings = () => {
    setSettingsVisible(true);
  };

  const handleRestart = () => {
    Alert.alert("Reset", "Restarting will reset all points.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "RESTART",
        style: "destructive",
        onPress: onRestart,
      },
    ]);
  };
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Point Tracker</Text>
        {!hideActionIcons && (
          <View style={{ flexDirection: "row", gap: 25 }}>
            <TouchableOpacity onPress={handleHome}>
              <Icon name="home" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRestart}>
              <Icon name="refresh" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSettings}>
              <Icon name="cog" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#8E7DBE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default HeaderBar;
