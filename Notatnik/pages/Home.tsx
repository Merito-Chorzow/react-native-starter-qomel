import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import React,{useEffect, useState} from "react";

export default function HomeScreen({navigation}) {
    const[notes, setNotes] = useState([]);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        const savedNotes = await AsyncStorage.getItem("notes");
        if (savedNotes) setNotes(JSON.parse(savedNotes));
}