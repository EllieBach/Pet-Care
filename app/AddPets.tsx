import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Modal, FlatList } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // Import useRouter

export default function AddPets() {
  const [petName, setPetName] = useState("");
  const [pets, setPets] = useState([]);
  const [isGenderPickerOpen, setIsGenderPickerOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Select a gender");
  const [isTypePickerOpen, setIsTypePickerOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Select a pet type");
  const [allergies, setAllergies] = useState("");
  const [other, setOther] = useState("");

  const gendersOptions = ["Female", "Male"];
  const animalType = ["Dog", "Cat", "Hamster", "Guinea Pig", "Bird", "Reptile", "Lizard", "Other"];

  const router = useRouter(); // Initialize the router

  // Fetch saved pets from AsyncStorage on component mount
  useEffect(() => {
    const loadPets = async () => {
      try {
        const savedPets = await AsyncStorage.getItem("pets");
        if (savedPets) {
          setPets(JSON.parse(savedPets));
      
        }
      } catch (error) {
        
      }
    };
    loadPets();
  }, []);

  const handleAddPet = async () => {
    try {
      
      if (petName && selectedGender !== "Select a gender" && selectedType !== "Select a pet type") {
        const newPet = {
          id: uuidv4(),
          name: petName,
          gender: selectedGender,
          type: selectedType,
          allergies,
          other,
        };
        const existingPets = await AsyncStorage.getItem("pets");
        const updatedPets = existingPets ? JSON.parse(existingPets) : [];
        updatedPets.push(newPet);
        await AsyncStorage.setItem("pets", JSON.stringify(updatedPets));
        setPets(updatedPets);

        console.log("New pet added:", newPet); // Debug log
        alert("Pet added successfully!");

        // Reset fields after adding a pet
        setPetName("");
        setSelectedGender("Select a gender");
        setSelectedType("Select a pet type");
        setAllergies("");
        setOther("");

        // Navigate back to the index page
        router.push("/");
      } else {
        alert("Please fill in all fields!");
      }
    } catch (error) {
      console.error("Error in handleAddPet:", error); // Debug log
      alert("Failed to add pet. Please try again.");
    }
  };

  // Render Picker Items (Gender, Type)
  const renderPickerItems = (data, setSelectedValue, hidePicker) => {
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pickerItem}
            onPress={() => {
              setSelectedValue(item);
              hidePicker();
            }}
          >
            <Text style={styles.pickerItemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter pet name"
        value={petName}
        onChangeText={setPetName}
      />

      {/* Gender Picker */}
      <TouchableOpacity style={styles.input} onPress={() => setIsGenderPickerOpen(true)}>
        <Text>{selectedGender}</Text>
      </TouchableOpacity>

      {isGenderPickerOpen && (
        <Modal transparent={true} visible={isGenderPickerOpen} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalBackdrop} onPress={() => setIsGenderPickerOpen(false)} />
            <View style={styles.modalContent}>
              {renderPickerItems(gendersOptions, setSelectedGender, () => setIsGenderPickerOpen(false))}
            </View>
          </View>
        </Modal>
      )}

      {/* Type Picker */}
      <TouchableOpacity style={styles.input} onPress={() => setIsTypePickerOpen(true)}>
        <Text>{selectedType}</Text>
      </TouchableOpacity>

      {isTypePickerOpen && (
        <Modal transparent={true} visible={isTypePickerOpen} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalBackdrop} onPress={() => setIsTypePickerOpen(false)} />
            <View style={styles.modalContent}>
              {renderPickerItems(animalType, setSelectedType, () => setIsTypePickerOpen(false))}
            </View>
          </View>
        </Modal>
      )}

      {/* Allergies and Other Information */}
      <TextInput
        style={[styles.input, styles.allergiesInput]}
        placeholder="Enter allergies"
        value={allergies}
        onChangeText={setAllergies}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />
      <TextInput
        style={styles.input}
        placeholder="Other"
        multiline={true}
        numberOfLines={4}
        value={other}
        onChangeText={setOther}
      />

      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.push("/")}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            console.log("Add Pet Button Pressed"); 
            handleAddPet();
          }}
        >
          <Text style={styles.addButtonText}>Add Pet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  pickerItem: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 5,
  },
  pickerItemText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  allergiesInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 35,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 35,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
