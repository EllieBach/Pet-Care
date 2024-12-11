import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Fontisto>['name'];
  color: string;
}) {
  return <Fontisto name="paw" size={24} color="black" />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      headerShown: useClientOnlyValue(false, true),
      tabBarStyle: {
        backgroundColor: "#A3DFF2",
        height: 60,
        width: 250,
        paddingBottom: 10,
        borderRadius: 35,
        bottom: 10, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, 
        alignSelf: "center",
    
      },
      tabBarLabelStyle: {
        fontSize: 14, 
        fontWeight: "bold",
      },
    }}>
      
      <Tabs.Screen
  name="index"
  options={{
    title: 'Your Pets',
    tabBarIcon: ({ color }) => <TabBarIcon name="paw" color={color} />,
    headerRight: () => (
      <Link href="/AddPets" asChild>
        <Pressable>
          {({ pressed }) => (
            <FontAwesome
              name="plus-circle"
              size={25}
              color={Colors[colorScheme ?? 'light'].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    ),
  }}
/>

      <Tabs.Screen
        name="ToDo"
        options={{
          title: 'To Do',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
  
