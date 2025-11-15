import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const [note, setNote] = useState({ title: "", description: "" });
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotes();
    });
    return unsubscribe;
  }, [navigation]);

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
    setLoading(true);
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Błąd podczas ładowania notatek:", error);
    } finally {
      setLoading(false);
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
    <TouchableOpacity
      style={styles.noteContainer}
      onPress={() =>
        navigation.navigate("Detail", {
          note: item,
          index: index,
        })
      }
      accessible={true}
      accessibilityLabel={`Notatka: ${item.title}, ${formatDate(
        item.createdAt
      )}`}
      accessibilityRole="button"
    >
      <View style={styles.noteContent}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {item.title} || "Bez tytułu"
        </Text>
        <Text style={styles.noteDate}>{formatDate(item.createdAt)}</Text>
        {item.location && (
          <Text style={styles.noteLocation}>
            {item.location.latitude.toFixed(4)},{" "}
            {item.location.longitude.toFixed(4)}
          </Text>
        )}
        <Text style={styles.notePreview} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNote(index)}
        accessible={true}
        accessibilityLabel={"Usuń notatkę: ${item.title}"}
        accessibilityRole="button"
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : notes.lenght === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Brak notatek</Text>
          <Text style={styles.emptySubtext}>Dodaj pierwszą notatkę</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  noteContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 48,
  },
  noteContent: {
    flex: 1,
    marginRight: 10,
  },
  noteTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  noteDate: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },
  noteLocation: {
    fontSize: 12,
    color: "#0066cc",
    marginBottom: 5,
  },
  notePreview: {
    fontSize: 14,
    color: "#555",
  },
  deleteBtn: {
    padding: 8,
    minHeight: 48,
    minWidth: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtnText: {
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 10,
  },
});
