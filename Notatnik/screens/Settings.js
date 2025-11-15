import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>O aplikacji</Text>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Nazwa:</Text>
          <Text style={styles.value}>Field Notes</Text>
        </View>

        <Text style={styles.sectionTitle}>Dostępność</Text>
        <Text style={styles.description}>
          Aplikacja obsługuje:{"\n"}• Etykiety dla czytników ekranu
          (screenreaders){"\n"}• Minimalne docelowe rozmiary przycisków (48 px)
          {"\n"}• Kontrastowe kolory{"\n"}• Opisane pole tekstowe i akcje
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Linking.openURL("https://worldtimeapi.org/pages/example")
          }
          accessible={true}
          accessibilityLabel="Dokumentacja World Time API"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>API Dokumentacja</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#333",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
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
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },
  featureList: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#34C759",
  },
  featureItem: {
    fontSize: 14,
    color: "#333",
    marginVertical: 4,
  },
  techList: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  techItem: {
    fontSize: 13,
    color: "#555",
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 48,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
