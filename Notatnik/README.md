# Field Notes (Notatnik)

Prosty starter React Native (Expo) — lista notatek, dodawanie/edycja, opcjonalne pobieranie lokalizacji oraz synchronizacja czasu z publicznym API.

## Szybkie uruchomienie

1. Wejdź do katalogu `Notatnik`:

   ```bash
   cd Notatnik
   ```

2. Zainstaluj zależności i uruchom Expo:

   ```bash
   npm install
   npm start
   ```

3. Otwórz w `Expo Go` na urządzeniu lub w emulatorze.

## Gdzie są pliki

- `App.js` — konfiguracja nawigacji
- `screens/Home.js` — lista notatek (dodano przycisk debugowy do czyszczenia `AsyncStorage`)
- `screens/AddEdit.js` — formularz dodawania/edycji (pobieranie lokalizacji wyłączone w trybie debug)
- `screens/Detail.js` — widok szczegółów
