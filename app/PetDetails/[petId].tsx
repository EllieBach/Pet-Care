import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router"; // For dynamic routing

export default function PetDetails() {
  const [pet, setPet] = useState(null); // State for the pet details
  const { petId } = useLocalSearchParams(); // Extract petId from the URL

  useEffect(() => {
    const loadPetDetails = async () => {
      try {
        const storedPets = await AsyncStorage.getItem("pets");
        if (storedPets) {
          const pets = JSON.parse(storedPets); // Parse the stored pets
          const selectedPet = pets.find((p) => p.id.toString() === petId); // Find the pet by ID
          setPet(selectedPet); // Set the selected pet in state
        }
      } catch (error) {
        console.error("Error loading pet details:", error);
      }
    };

    if (petId) {
      loadPetDetails();
    }
  }, [petId]);

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          {petId ? "Loading pet details..." : "Invalid pet ID provided."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Details</Text>
      <Text style={styles.detail}>Name: {pet.name}</Text>
      <Text style={styles.detail}>Gender: {pet.gender}</Text>
      <Text style={styles.detail}>Type: {pet.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
  message: {
    fontSize: 16,
    color: "#555",
  },
});
