import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import axios from "axios";

export default function AddEditScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());

  useEffect(() => {
    if (route.params?.note) {
      const note = route.params.note;
      setTitle(note.title);
      setDescription(note.description);
      setLocation(note.location || null);
      setCreatedAt(note.createdAt);
    } else {
      setCreatedAt(new Date().toISOString());
    }
  }, [route.params?.note]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Błąd", "Brak dostępu do lokalizacji");
        return;
      }

      setLoading(true);
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Sukces", "Lokalizacja pobrana!");
    } catch (error) {
      console.error("Błąd lokalizacji:", error);
      Alert.alert("Błąd", "Nie udało się pobrać lokalizacji");
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentTime = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://worldtimeapi.org/api/timezone/Europe/Warsaw"
      );
      const apiTime = new Date(response.data.datetime).toISOString();
      setCreatedAt(apiTime);
      Alert.alert(
        "Czas z API",
        'Data ustawiona na: ${new Date(apiTime).toLocaleString("pl-PL")}'
      );
    } catch (error) {
      console.error("Błąd pobierania czasu:", error);
      Alert.alert("Błąd", "Nie udało się pobrać czasu");
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async () => {
    if (!title.trim()) {
      Alert.alert("Błąd", "Tytuł jest wymagany");
      return;
    }

    try {
      setLoading(true);
      const newNote = {
        title,
        description,
        location,
        createdAt,
      };

      let allNotes = [];
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        allNotes = JSON.parse(storedNotes);
      }

      if (route.params?.index !== undefined) {
        // Edycja
        allNotes[route.params.index] = newNote;
      } else {
        // Dodanie
        allNotes.push(newNote);
      }

      await AsyncStorage.setItem("notes", JSON.stringify(allNotes));
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Sukces", "Notatka zapisana!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Błąd zapisywania:", error);
      Alert.alert("Błąd", "Nie udało się zapisać notatki");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Tytuł *</Text>
        <TextInput
          style={styles.input}
          placeholder="Wpisz tytuł notatki"
          value={title}
          onChangeText={setTitle}
          accessible={true}
          accessibilityLabel="Pole tytułu"
          accessibilityHint="Wpisz tutaj tytuł notatki"
        />

        <Text style={styles.label}>Opis</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Wpisz opis notatki"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          accessible={true}
          accessibilityLabel="Pole opisu"
          accessibilityHint="Wpisz tutaj opis notatki"
        />

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.locationBtn]}
            onPress={requestLocationPermission}
            disabled={loading}
            accessible={true}
            accessibilityLabel="Pobierz lokalizację"
            accessibilityRole="button"
            accessibilityHint="Naciśnij aby pobrać twoją aktualną pozycję GPS"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Pobierz lokalizację</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.timeBtn]}
            onPress={fetchCurrentTime}
            disabled={loading}
            accessible={true}
            accessibilityLabel="Pobierz czas"
            accessibilityRole="button"
            accessibilityHint="Naciśnij aby pobrać aktualny czas z API"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Pobierz czas</Text>
            )}
          </TouchableOpacity>
        </View>

        {location && (
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Lokalizacja:</Text>
            <Text style={styles.infoText}>
              Lat: {location.latitude.toFixed(4)}, Lng:{" "}
              {location.longitude.toFixed(4)}
            </Text>
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Data stworzenia:</Text>
          <Text style={styles.infoText}>
            {new Date(createdAt).toLocaleString("pl-PL")}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.saveBtn]}
          onPress={saveNote}
          disabled={loading}
          accessible={true}
          accessibilityLabel="Zapisz notatkę"
          accessibilityRole="button"
          accessibilityHint="Naciśnij aby zapisać notatkę"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Zapisz notatkę</Text>
          )}
        </TouchableOpacity>
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
  form: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fafafa",
    fontSize: 16,
    minHeight: 48,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 15,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 48,
  },
  locationBtn: {
    backgroundColor: "#34C759",
  },
  timeBtn: {
    backgroundColor: "#FF9500",
  },
  saveBtn: {
    backgroundColor: "#007AFF",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
});
