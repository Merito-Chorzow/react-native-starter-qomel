import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

export default function DetailScreen({ route, navigation }) {
  const [note] = useState(route.params?.note);
  const index = route.params?.index;

  const handleEdit = () => {
    navigation.navigate("AddEdit", { note, index });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Brak daty";
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{note?.title || "Bez tytułu"}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{formatDate(note?.createdAt)}</Text>
        </View>

        {note?.location && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Lokalizacja:</Text>
            <Text style={styles.value}>
              📍 {note.location.latitude.toFixed(4)},{" "}
              {note.location.longitude.toFixed(4)}
            </Text>
          </View>
        )}

        <View style={styles.divider} />

        <Text style={styles.descriptionLabel}>Opis:</Text>
        <Text style={styles.description}>
          {note?.description || "Brak opisu"}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editBtn]}
            onPress={handleEdit}
            accessible={true}
            accessibilityLabel="Edytuj notatkę"
            accessibilityRole="button"
            accessibilityHint="Naciśnij aby edytować tę notatkę"
          >
            <Text style={styles.buttonText}>Edytuj</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.backBtn]}
            onPress={() => navigation.goBack()}
            accessible={true}
            accessibilityLabel="Powrót do listy"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Powrót</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  value: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    minHeight: 48,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 48,
  },
  editBtn: {
    backgroundColor: "#007AFF",
  },
  backBtn: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
