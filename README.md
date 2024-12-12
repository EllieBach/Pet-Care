# Pet Care App

## Overview

The Pet Care App is a mobile application designed to help pet owners manage and care for their pets effectively. It provides features such as adding pets, viewing pet details, and maintaining a simple to-do list for pet-related tasks.

## Features

Add Pets: Add and save pet information, including name, gender, type, allergies, and other details.

View Pet Details: Display a list of saved pets and access their details.

To-Do List: Maintain a simple to-do list to manage tasks efficiently.

## Installation

### Prerequisites

Expo CLI for running and managing the React Native app.

Steps

1. Clone the repository:

 git clone <repository-url>
cd pet-care

 2. Install dependencies:

npm install

3. Start the development server:

npx expo start

4. Run the app:

Scan the QR code displayed in the terminal with the Expo Go app on your mobile device.

Alternatively, use an emulator for Android or iOS to run the app locally.

## Usage

### Adding a Pet

1. Navigate to the Add Pets screen.

2. Enter the pet's name, gender, type, allergies, and any additional notes.

3. Press the Add Pet button to save the pet's information.

### Viewing Pets

1. Access the Home screen (Your pets) to view a list of saved pets.

2. Tap on a pet's name to view its details.

### Managing Tasks

1. Open the To-Do List screen.

2. Add tasks by entering the task name and pressing the Add Task button.

3. Delete tasks by pressing the Delete button next to the task.

### Dependencies

- React Native: Framework for building mobile applications.

- xpo Router: Navigation and routing for Expo apps.

- @react-native-async-storage/async-storage: Storage solution for saving pet and task data.

- UUID: For generating unique IDs for pets and tasks.
