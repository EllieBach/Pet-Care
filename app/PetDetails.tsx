import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PetDetails({ route }) {
  const { pet } = route.params; // Access the pet details passed from the AddPets screen

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
