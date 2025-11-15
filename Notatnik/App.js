import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";

import HomeScreen from "./screens/Home";
import AddEditScreen from "./screens/AddEdit";
import SettingsScreen from "./screens/Settings";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#999",
          headerShown: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Moje notatki",
            tabBarLabel: "Lista",
          }}
        />
        <Tab.Screen
          name="AddEdit"
          component={AddEditScreen}
          options={{
            title: "Dodaj notatkę",
            tabBarLabel: "Dodaj",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Ustawienia",
            tabBarLabel: "Info",
          }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
