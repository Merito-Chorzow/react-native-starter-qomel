import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "./screens/Home";
import AddEdit from "./screens/AddEdit";
import Settings from "./screens/Settings";

export default function App() {
  const [note, setNote] = useState({ title: "", description: "" });
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

  const renderItem = ({ item, index }) => (
    <View style={styles.noteContainer}>
      <View>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
      {renderDeleteButton(index)}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Temat"
          value={note.title}
          onChangeText={(text) => setNote({ ...note, title: text })}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Opis"
          multiline={true}
          numberOfLines={5}
          value={note.description}
          onChangeText={(text) => setNote({ ...note, description: text })}
        />

        <Button title="Zapisz notatkę" onPress={saveNote} />
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.noteList}
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
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  form: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    width: "100%",
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  noteList: {
    paddingBottom: 20,
  },
  noteContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  noteTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 16,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
  },
});
