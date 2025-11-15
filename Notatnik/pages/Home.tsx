import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

type HomeScreenProps = {
  navigation: any;
};

type Note = {
  text: string;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const savedNotes = await AsyncStorage.getItem("notes");
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  };

  return (
    <View>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notatka", { note: item })}
          >
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Dodaj notatkę"
        onPress={() => navigation.navigate("Notatka")}
      />
    </View>
  );
}
