import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const [pets, setPets] = useState([]);

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
  }, []); // This effect only runs once when the component mounts
  

{/**
  useFocusEffect(
    React.useCallback(() => {
      const loadPets = async () => {
        try {
          const storedPets = await AsyncStorage.getItem("pets");
          if (storedPets) {
            const parsedPets = JSON.parse(storedPets);
            setPets(parsedPets);
            console.log("Pets loaded:", parsedPets); // Debug log to verify loading
          }
        } catch (error) {
          console.error("Error loading pets:", error);
        }
      };

      loadPets();
    }, []) // Runs on every focus
  );
 */}
  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/PetDetails/${item.id}`} asChild>
            <Pressable>
              <View style={styles.petItem}>
                <Text style={styles.petText}>{item.name}</Text>
              </View>
            </Pressable>
          </Link>
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
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "80%",
  },
  petText: {
    fontSize: 16,
    color: "#333",
  },
});
