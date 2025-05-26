import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StartScreen from "../screens/StartScreen";
import GameSettingsScreen from "../screens/GameSettingsScreen";
import PointViewerScreen from "../screens/PointViewerScreen";
import ListPointScreen from "../screens/ListPointScreen";
import PlayerSetupScreen from "../screens/PlayerSetupScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={StartScreen} options={{ title: "", headerTransparent: true, headerLeft: () => null }} />
      <Stack.Screen
        name="GameSettingsScreen"
        component={GameSettingsScreen}
        options={{ title: "", headerTransparent: true, headerLeft: () => null }}
      />
      <Stack.Screen
        name="PlayerSetupScreen"
        component={PlayerSetupScreen}
        options={{ title: "", headerTransparent: true, headerLeft: () => null }}
      />
      <Stack.Screen
        name="PointView"
        component={PointViewerScreen}
        options={{ title: "", headerTransparent: true, headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
}
