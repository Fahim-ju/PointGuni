import { View } from "react-native";
import React from "react";
import GridPointScreen from "./GridPointScreen";
import ListPointScreen from "./ListPointScreen";
import Footer from "../component/Footer";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/RootStack";

const PointViewerScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "PointView">>();
  const view = (route.params as any)?.view || "grid";

  const handleGridPress = () => {
    if (view !== "grid") {
      navigation.setParams?.({ view: "grid" });
    }
  };
  const handleListPress = () => {
    if (view !== "list") {
      navigation.setParams?.({ view: "list" });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {view === "grid" ? <GridPointScreen /> : <ListPointScreen />}
      <Footer onGridPress={handleGridPress} onListPress={handleListPress} isGridViewActive={view === "grid"} />
    </View>
  );
};

export default PointViewerScreen;
