import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Modal,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { v4 as uuidv4 } from "uuid";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const petsFilePath = `${FileSystem.documentDirectory}pets.json`;

export default function AddPets() {
  const [petName, setPetName] = useState("");
  const [selectedGender, setSelectedGender] = useState("Select a gender");
  const [selectedType, setSelectedType] = useState("Select a pet type");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [allergies, setAllergies] = useState("");
  const [isGenderPickerOpen, setIsGenderPickerOpen] = useState(false);
  const [isTypePickerOpen, setIsTypePickerOpen] = useState(false);
  const [other, setOther] = useState(""); 

  const [pets, setPets] = useState([]);
  const router = useRouter();

  const gendersOptions = ["female", "male"];
  const animalType = [
    "Dog",
    "Cat",
    "Hamster",
    "Guinea pig",
    "Bird",
    "Reptile",
    "Lizard",
    "other",
  ];

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

  const handleAddPet = async () => {
    if (
      petName &&
      selectedGender !== "Select a gender" &&
      selectedType !== "Select a pet type"
    ) {
      const newPet = {
        id: uuidv4(),
        name: petName,
        gender: selectedGender,
        type: selectedType,
        birthDate: birthDate.toISOString().split("T")[0],
        allergies: allergies,
        other: other,
      };

      try {
        const fileInfo = await FileSystem.getInfoAsync(petsFilePath);
        let petsList = [];
        if (fileInfo.exists) {
          const fileContent = await FileSystem.readAsStringAsync(petsFilePath);
          petsList = JSON.parse(fileContent);
        }

        petsList.push(newPet);

        await FileSystem.writeAsStringAsync(
          petsFilePath,
          JSON.stringify(petsList, null, 2)
        );
        await AsyncStorage.setItem("petData", JSON.stringify(petsList));

        setPets(petsList);

        console.log("Pet saved successfully!");
        router.replace("/"); // Navigate to the main screen
      } catch (error) {
        console.error("Error saving pet:", error);
        alert("Failed to save pet.");
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  // Show the picker
  const showGenderPicker = () => setIsGenderPickerOpen(true);
  const hideGenderPicker = () => setIsGenderPickerOpen(false);
  const showTypePicker = () => setIsTypePickerOpen(true);
  const hideTypePicker = () => setIsTypePickerOpen(false);

  // Render items for FlatList (Gender and Type pickers)
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
      {/* Pet Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter pet name"
        value={petName}
        onChangeText={setPetName}
      />

      {/* Gender Picker */}
      <TouchableOpacity
        style={styles.input}
        onPress={showGenderPicker}
      >
        <Text>{selectedGender}</Text>
      </TouchableOpacity>
      {isGenderPickerOpen && (
        <Modal transparent={true} visible={isGenderPickerOpen} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              onPress={hideGenderPicker}
            />
            <View style={styles.modalContent}>
              {renderPickerItems(
                gendersOptions,
                setSelectedGender,
                hideGenderPicker
              )}
            </View>
          </View>
        </Modal>
      )}

      {/* Pet Type Picker */}
      <TouchableOpacity
        style={styles.input}
        onPress={showTypePicker}
      >
        <Text>{selectedType}</Text>
      </TouchableOpacity>
      {isTypePickerOpen && (
        <Modal transparent={true} visible={isTypePickerOpen} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              onPress={hideTypePicker}
            />
            <View style={styles.modalContent}>
              {renderPickerItems(
                animalType,
                setSelectedType,
                hideTypePicker
              )}
            </View>
          </View>
        </Modal>
      )}

      {/* Birth Date Picker */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerText}>
          {birthDate
            ? `Birth Date: ${birthDate.toISOString().split("T")[0]}`
            : "Select Birth Date"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setBirthDate(selectedDate);
            }
            setShowDatePicker(false);
          }}
        />
      )}

      {/* Allergies */}
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
      onChangeText={setOther}/>

      <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
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
  datePickerButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  datePickerText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  allergiesInput: {
    height: 100,
    textAlignVertical: "top",
  },
});
