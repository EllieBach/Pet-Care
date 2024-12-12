import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const storedPets = await AsyncStorage.getItem("pets");
        if (storedPets) {
          const parsedPets = JSON.parse(storedPets);
          setPets(parsedPets);
        } else {
          console.log("No pets found in storage.");
        }
      } catch (error) {
        console.error("Error fetching pets from storage:", error);
      }
    };

    fetchPets();
  }, []);

  const deletePet = async (petId) => {
    Alert.alert(
      "Delete Pet",
      "Are you sure you want to delete this pet?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Remove the pet from the state
              const updatedPets = pets.filter((pet) => pet.id !== petId);
              setPets(updatedPets);

              // Update AsyncStorage
              await AsyncStorage.setItem("pets", JSON.stringify(updatedPets));
            } catch (error) {
              console.error("Error deleting pet:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id} // Ensure `id` is a string
        renderItem={({ item }) => (
          <View style={styles.petItem}>
            <Link href={`/PetDetails/${item.id}`} asChild>
              <Pressable>
                <Text style={styles.petText}>{item.name}</Text>
              </Pressable>
            </Link>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deletePet(item.id)}
            >
              <Text style={styles.deleteButtonText}>x</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noPetsText}>No pets added yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  petItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  petText: {
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
  },
  noPetsText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
  },
});
