import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation for navigation

export default function TabOneScreen() {
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null); // Track selected pet ID
  const navigation = useNavigation(); // Get the navigation object

  // Load pets from AsyncStorage when the component mounts
  useEffect(() => {
    const loadPets = async () => {
      try {
        const storedPets = await AsyncStorage.getItem("pets");

        if (storedPets) {
          setPets(JSON.parse(storedPets)); // Parse and set the pets state
        }
      } catch (error) {
        console.error("Error loading pets data:", error);
      }
    };

    loadPets();
  }, []);

  const handlePetPress = (pet) => {
    setSelectedPetId(pet.id); // Update the selected pet
    navigation.navigate("PetDetails", { pet });
  };

  // Function to dynamically set button styles based on pet type
  const getButtonStyle = (petType, petId) => {
    const isSelected = petId === selectedPetId; // Check if this pet is selected
    const baseStyle = [styles.petItem, { backgroundColor: isSelected ? "#FFD700" : "#f0f0f0" }]; // Gold for selected pet
    switch (petType) {
      case "Dog":
        return [...baseStyle, { backgroundColor: isSelected ? "#4CAF50" : "#4CAF50" }];
      case "Cat":
        return [...baseStyle, { backgroundColor: isSelected ? "#2196F3" : "#2196F3" }];
      case "Bird":
        return [...baseStyle, { backgroundColor: isSelected ? "#FFC107" : "#FFC107" }];
      default:
        return baseStyle;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.petList}
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={getButtonStyle(item.type, item.id)} // Apply dynamic styles
            onPress={() => handlePetPress(item)}
          >
            <Text style={styles.petText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  petItem: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  petText: {
    fontSize: 16,
    color: "#fff", // Text color changed to white for better visibility
  },
  petList: {
    width: "50%",
  },
});
