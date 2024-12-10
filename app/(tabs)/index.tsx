import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text, Pressable } from "react-native";
import * as FileSystem from "expo-file-system";
import { Link } from "expo-router";

const petsFilePath = `${FileSystem.documentDirectory}pets.json`;

export default function HomeScreen() {
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(petsFilePath);
      if (fileInfo.exists) {
        const fileContent = await FileSystem.readAsStringAsync(petsFilePath);
        const petsData = JSON.parse(fileContent);
        setPets(petsData);
      }
    } catch (error) {
      console.error("Error loading pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

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
