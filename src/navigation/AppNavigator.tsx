import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../screens/StartScreen";
import GridPointScreen from "../screens/GridPointScreen";
import ListPointScreen from "../screens/ListPointScreen";
import PlayerSetupScreen from "../screens/PlayerSetupScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={StartScreen} options={{ title: "", headerTransparent: true, headerLeft: () => null }} />
      <Stack.Screen
        name="GridPointView"
        component={GridPointScreen}
        options={{ title: "", headerTransparent: true, headerLeft: () => null }}
      />
      <Stack.Screen
        name="ListPointView"
        component={ListPointScreen}
        options={{ title: "", headerTransparent: true, headerLeft: () => null }}
      />
      <Stack.Screen name="PlayerSetupScreen" component={PlayerSetupScreen} />
    </Stack.Navigator>
  );
}
