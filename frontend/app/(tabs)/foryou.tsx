import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View, Text } from 'react-native';
import downloads from '../downloads';
import suggested from '../suggested';
import liked from '../liked';
const Tab = createMaterialTopTabNavigator();


export default function ForYou() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Suggested" component={suggested} />
      <Tab.Screen name="Liked" component={liked} />
      <Tab.Screen name="Downloads" component={downloads} />
    </Tab.Navigator>
  );
}
