import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";

import Home from "./screens/Home";
import AddEdit from "./screens/AddEdit";
import Settings from "./screens/Settings";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
          tabBarActiveTintColor: "gray",
          headerShown: true,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="AddEdit" component={AddEdit} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
