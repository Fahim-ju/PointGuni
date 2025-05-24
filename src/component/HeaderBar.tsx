import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
type Props = {
  hideActionIcons?: boolean;
};

const HeaderBar: React.FC<Props> = ({ hideActionIcons }) => {
  const navigation = useNavigation<any>();
  const onRestart = () => {
    navigation.navigate("Home");
  };
  const onSettings = () => {
    console.log("Settings pressed");
  };

  const handleRestart = () => {
    Alert.alert("sure to restart?", "Restarting will reset all points.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Restart",
        style: "destructive",
        onPress: onRestart,
      },
    ]);
  };
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Point Tracker</Text>
      {!hideActionIcons && (
        <View style={{ flexDirection: "row", gap: 25 }}>
          <TouchableOpacity onPress={handleRestart}>
            <Icon name="refresh" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSettings}>
            <Icon name="cog" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
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
