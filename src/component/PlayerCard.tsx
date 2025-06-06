import React, { use } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { Dimensions } from "react-native";
import { Player } from "../types/Player";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 30;

type PlayerCardProps = {
  player: Player;
};
const avatarMap: Record<string, any> = {
  user1: require("../../assets/avatar/user1.png"),
  user2: require("../../assets/avatar/user2.png"),
  user3: require("../../assets/avatar/user3.png"),
  user4: require("../../assets/avatar/user4.png"),
  user5: require("../../assets/avatar/user5.png"),
  user6: require("../../assets/avatar/user6.png"),
  user7: require("../../assets/avatar/user7.png"),
  user8: require("../../assets/avatar/user8.png"),
  user9: require("../../assets/avatar/user9.png"),
};
const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { name, totalPoints } = player;
  const lastPoint = player.points?.length ? player.points[player.points.length - 1] : undefined;
  const avatarName = player.avatar !== undefined ? `user${player.avatar + 1}` : "user1"; // Default to user1 if avatar is not set
  return (
    <ImageBackground
      source={require(`../../assets/blackcards.jpg`)} // Add a dynamic, stylish background
      style={styles.card}
      imageStyle={styles.cardImage}
    >
      <View style={styles.topSection}>
        <Image source={avatarMap[avatarName ?? "user1"]} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>{totalPoints ?? 0}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>{lastPoint ?? "---"}</Text>
          <Text style={styles.statLabel}>Last</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 250,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "white",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#B39DDB",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardImage: {
    resizeMode: "cover",
  },
  topSection: {
    alignItems: "center",
    marginTop: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    shadowOpacity: 0.2,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
  },
  statBlock: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "#eee",
    marginTop: 4,
    textTransform: "uppercase",
  },
});

export default PlayerCard;
