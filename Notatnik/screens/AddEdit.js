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

import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import axios from "axios";

export default function AddEdit({ route, navigation }) {
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
      setCreatedAt(new Date().toDateString());
    }
  }, [route.params]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Błąd", "Brak pozwolenia na dostęp do lokalizacji");
        return;
      }

      setLoading(true);
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Sukces", "Lokalizacja została dodana do notatki");
    } catch (error) {
      console.error("Błąd podczas pobierania lokalizacji:", error);
      Alert.alert("Błąd", "Nie udało się pobrać lokalizacji");
    } finally {
      setLoading(false);
    }
  };
}

const saveNote = async () => {
  if (!title.trim()) {
    Alert.alert("Błąd", "Tytyuł notatki nie może być pusty");
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
    const sotredNotes = await AsyncStorage.getItem("notes");
    if (sotredNotes) {
      allNotes = JSON.parse(sotredNotes);
    }
    if (route.params?.index !== undefined) {
      allNotes[route.params.index] = newNote;
    } else {
      allNotes.push(newNote);
    }

    await AsyncStorage.setItem("notes", JSON.stringify(allNotes));
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Sukces", "Notatka została zapisana");
    navigation.goBack();
  } catch (error) {
    console.error("Błąd podczas zapisywania notatki:", error);
    Alert.alert("Błąd", "Nie udało się zapisać notatki");
  } finally {
    setLoading(false);
  }
};

return (
  <TextInput
    style={styles.input}
    placeholder="Wpisz tytuł notatki"
    value={title}
    onChangeText={setTitle}
    accessible={true}
    accessibilityLabel="Pole tytułu"
    accessibilityHint="Wpisz tutaj tytuł notatki"
  />
);
