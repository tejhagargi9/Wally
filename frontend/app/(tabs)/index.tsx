import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View, Text } from 'react-native';
import library from '../library';
import suggested from '../suggested';
import liked from '../liked';
const Tab = createMaterialTopTabNavigator();


export default function ForYou() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Suggested" component={suggested} />
      <Tab.Screen name="Liked" component={liked} />
      <Tab.Screen name="Libray" component={library} />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
} 

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  )}