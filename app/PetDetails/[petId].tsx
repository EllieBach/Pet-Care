import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router"; // Updated hook

export default function PetDetails() {
  const [pet, setPet] = useState(null);
  const { petId } = useLocalSearchParams(); // Get query parameters

  useEffect(() => {
    const loadPetDetails = async () => {
      try {
        const storedPets = await AsyncStorage.getItem("pets");
        if (storedPets) {
          const pets = JSON.parse(storedPets);
          const selectedPet = pets.find((p) => p.id.toString() === petId); // Match petId
          setPet(selectedPet);
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
        <Text>Loading...</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 18,
    marginTop: 10,
  },
});
