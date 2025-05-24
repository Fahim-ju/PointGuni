import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../screens/StartScreen";
import GridPointScreen from "../screens/GridPointScreen";
import ListPointScreen from "../screens/ListPointScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={StartScreen} options={{ title: "", headerTransparent: true }} />
        <Stack.Screen name="GridPointView" component={GridPointScreen} options={{ title: "", headerTransparent: true }} />
        <Stack.Screen name="ListPointView" component={ListPointScreen} options={{ title: "", headerTransparent: true }} />
      </Stack.Navigator>
  );
}
