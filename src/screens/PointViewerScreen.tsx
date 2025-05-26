import { View, BackHandler } from "react-native";
import React from "react";
import GridPointScreen from "./GridPointScreen";
import ListPointScreen from "./ListPointScreen";
import Footer from "../component/Footer";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/RootStack";
import { ToastAndroid } from "react-native";

const PointViewerScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "PointView">>();
  const view = (route.params as any)?.view || "grid";

  // Double tap back to exit app
  const backPressCount = React.useRef(0);
  const backPressTimeout = React.useRef<NodeJS.Timeout | null>(null);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (backPressCount.current === 0) {
          backPressCount.current = 1;
            // Optionally show a toast here: "Press back again to exit"
            // Example using react-native's ToastAndroid (Android only):
            ToastAndroid.show("Press back again to exit", 1000);
          if (backPressTimeout.current) clearTimeout(backPressTimeout.current);
          backPressTimeout.current = setTimeout(() => {
            backPressCount.current = 0;
          }, 1000);
          return true;
        } else {
          BackHandler.exitApp();
          return true;
        }
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        subscription.remove();
        if (backPressTimeout.current) clearTimeout(backPressTimeout.current);
        backPressCount.current = 0;
      };
    }, [])
  );

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
