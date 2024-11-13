import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import downloads from '../downloads';
import suggested from '../suggested';
import liked from '../liked'; 
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const Tab = createMaterialTopTabNavigator();

export default function ForYou() {
  return (
    <>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://ideogram.ai/assets/progressive-image/balanced/response/9g3PYHoQSMeAoL3YawES7g' }}  // Replace with the dynamic profile image URL
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIconContainer}>
          <Icon name="edit" style={styles.editIcon} size={20} color="#fff" />  {/* Material Icon for Edit */}
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIndicatorStyle: { backgroundColor: '#4CAF50' },
          tabBarStyle: { height: 60 },
        }}
      >
        <Tab.Screen name="Suggested" component={suggested} />
        <Tab.Screen name="Liked" component={liked} />
        <Tab.Screen name="Downloads" component={downloads} />
      </Tab.Navigator>
    </>


  );
}

// Styling the profile image and tabs
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',  // Set your background color
  },
  profileContainer: {
    justifyContent: 'center',
    backgroundColor: "#252427",
    alignItems: 'center',
    padding: 13,
  },
  profileImage: {
    width: 75, 
    height: 75,
    borderRadius: 50,
    borderWidth: 3,  
    borderColor: '#fff',  
  },
  editIconContainer: {
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor : "black",
    borderRadius: 50,
  }
});
