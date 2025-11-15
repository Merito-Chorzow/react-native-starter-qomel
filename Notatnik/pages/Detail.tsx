import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NoteScreenProps = {
  route: any;
  navigation: any;
};

export default function NoteScreen({ route, navigation }: NoteScreenProps) {
  const [text, setText] = useState(route.params?.note?.text || "");

  const saveNote = async () => {
    const saved = await AsyncStorage.getItem("notes");
    const notes = JSON.parse(saved ?? "[]") as Array<{ text: string }>;
    notes.push({ text });
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Wpisz notatkę"
      />
      <Button title="Zapisz" onPress={saveNote} />
    </View>
  );
}
