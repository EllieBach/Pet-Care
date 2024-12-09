import React, { useEffect, useState } from "react"; 
import { StyleSheet, FlatList, View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered"); // Debug log
    const fetchPets = async () => {
      try {
        console.log("Fetching pets..."); // Debug log
        const storedPets = await AsyncStorage.getItem("pets");
        if (storedPets) {
          const parsedPets = JSON.parse(storedPets);
          setPets(parsedPets);
          console.log("Pets fetched:", parsedPets); // Log parsed data
        } else {
          console.log("No pets found in storage.");
        }
      } catch (error) {
        console.error("Error fetching pets:", error); // Log any errors
      }
    };

    fetchPets();
  }, []); // Dependency array ensures it runs only once on mount

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id} // Ensure `id` is a string
        renderItem={({ item }) => (
          <Link href={`/PetDetails/${item.id}`} asChild>
            <Pressable>
              <View style={styles.petItem}>
                <Text style={styles.petText}>{item.name}</Text> {/* Display pet name */}
              </View>
            </Pressable>
          </Link>
        )}
        ListEmptyComponent={<Text style={styles.noPetsText}>No pets added yet.</Text>}
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
  },
  petText: {
    fontSize: 16,
    color: "#333",
  },
  noPetsText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
  },
});
