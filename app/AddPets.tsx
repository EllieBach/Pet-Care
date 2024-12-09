import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  View,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddPets() {
  const [petName, setPetName] = useState("");
  const [selectedGender, setSelectedGender] = useState("Select a gender");
  const [selectedType, setSelectedType] = useState("Select a pet type");
  const [birthDate, setBirthDate] = useState(new Date()); // Default date
  const [showDatePicker, setShowDatePicker] = useState(false); // Declare this
  const [isGenderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [isTypeDropdownVisible, setTypeDropdownVisible] = useState(false);
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
  ];

  const toggleGenderDropdown = () =>
    setGenderDropdownVisible(!isGenderDropdownVisible);
  const toggleTypeDropdown = () =>
    setTypeDropdownVisible(!isTypeDropdownVisible);

  const selectGender = (gender) => {
    setSelectedGender(gender);
    setGenderDropdownVisible(false);
  };

  const selectAnimal = (animal) => {
    setSelectedType(animal);
    setTypeDropdownVisible(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false); // Close the date picker
    setBirthDate(currentDate); // Set the selected date
  };

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
        birthDate: birthDate.toISOString().split("T")[0], // Save as "YYYY-MM-DD"
      };

      const storedPets = await AsyncStorage.getItem("pets");
      const pets = storedPets ? JSON.parse(storedPets) : [];
      pets.push(newPet);
      await AsyncStorage.setItem("pets", JSON.stringify(pets));

      router.push("/"); // Navigate to the main screen
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.smallTitle}>Pet name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pet name"
        value={petName}
        onChangeText={setPetName}
      />

      <Text style={styles.smallTitle}>Pet gender</Text>
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={toggleGenderDropdown}
      >
        <Text style={styles.dropdownText}>{selectedGender}</Text>
      </TouchableOpacity>

      {isGenderDropdownVisible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={gendersOptions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => selectGender(item)}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <Text style={styles.smallTitle}>Pet type</Text>
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={toggleTypeDropdown}
      >
        <Text style={styles.dropdownText}>{selectedType}</Text>
      </TouchableOpacity>

      {isTypeDropdownVisible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={animalType}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => selectAnimal(item)}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <Text style={styles.smallTitle}>Birth Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{birthDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
        <Text style={styles.addButtonText}>Add Pet</Text>
      </TouchableOpacity>
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
  smallTitle: {
    color: "#333",
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  dropdownHeader: {
    width: "80%",
    padding: 15,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownList: {
    width: "80%",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 150,
    zIndex: 9999,
    position: "absolute",
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  dateButton: {
    width: "80%",
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
});
