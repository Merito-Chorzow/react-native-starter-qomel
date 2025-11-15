import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

export default function Detail({ route, navigation }) {
  const [note] = useState(route.params?.note);
  const index = route.params?.index;

  const handleEdit = () => {
    navigation.navigate("AddEdit", { note, index });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Brak daty";
    const date = new Date(dateString);
    return date.toLocaleDateStringDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ScrillView style={style.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{note.title}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Utworzono:</Text>
          <Text style={styles.info}>{formatDate(note.createdAt)}</Text>
        </View>
        {note.location && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Lokalizacja:</Text>
            <Text style={styles.info}>
              {note.location.latitude.toFixed(4)},{" "}
              {note.location.longitude.toFixed(4)}
            </Text>
          </View>
        )}
        <Text style={styles.divider} />

        <Text style={styles.descriptionLabel}>Opis:</Text>
        <Text style={styles.description}>
          {note.description || "Brak opisu"}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={handleEdit}
            accessible={true}
            accessibilityLabel="Edytuj notatkę"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Edytuj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrillView>
  );
}
