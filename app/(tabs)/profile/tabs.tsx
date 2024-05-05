import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

function HomeScreen() {
  return <div>HomeScreen</div>;
}
function SettingsScreen() {
  return <div>SettingsScreen</div>;
}

export default function TabsComponent() {
  return <View>home</View>;
}
function makeIconRender(name) {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}
