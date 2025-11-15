import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotes();
    });
    return unsubscribe;
  }, [navigation]);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Błąd ładowania notatek:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Brak daty";
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL");
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
      accessibilityLabel={"Notatka: ${item.title}, ${formatDate"(
        item.createdAt
      )}
      accessibilityRole="button"
    >
      <View style={styles.noteContent}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {item.title || "Bez tytułu"}
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
        style={styles.deleteBtn}
        onPress={() => deleteNote(index)}
        accessible={true}
        accessibilityLabel={"Usuń notatkę: ${item.title}"}
        accessibilityRole="button"
      >
        <Text style={styles.deleteBtnText}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Brak notatek</Text>
          <Text style={styles.emptySubtext}>Dodaj swoją pierwszą notatkę!</Text>
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
