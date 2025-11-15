import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [note, setNote] = useState([{ title: "", description: "" }]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const saveNote = async () => {
    const newNotes = [...notes, note];
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
    setNote({ title: "", description: "" });
  };

  const deleteNote = async (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const loadNotes = async () => {
    const storedNotes = await AsyncStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  };

  const renderDeleteButton = (index) => {
    return (
      <TouchableOpacity>
        <Text style={styles.deleteButton} onPress={deleteNote}>
          Usuń
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }) => {
    <View style={styles.noteContainer}>
      <View>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text>{item.noteDescription}</Text>
      </View>
      {renderDeleteButton(index)}
    </View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Temat"
          value={note.title}
          onChangeText={(text) => setNote({ ...note, title: text })}
        />
        <Button title="Zapisz notatkę" />
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.notesList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>Brak notatek</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
