import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import downloads from '../downloads';
import suggested from '../suggested';
import liked from '../liked';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';   

const Tab = createMaterialTopTabNavigator();

export default function ForYou() {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (!email) {
          console.error('No email found in AsyncStorage');
          return;
        }

        const response = await axios.get('http://localhost:5000/getUserData', {
          params: { email },
        });

        if (response.data && response.data.profileImage) {
          setProfilePhotoUrl(response.data.profileImage);
        } else {
          console.warn('No profilePhotoUrl in API response');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleEditPhoto = async () => {
    const email = await AsyncStorage.getItem('email');
    if (!email) {
      Alert.alert('Error', 'Email not found in AsyncStorage');
      return;
    }
  
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
  
      if (response.errorCode) {
        console.error('Image picker error:', response.errorMessage);
        Alert.alert('Error', 'Failed to pick image. Please try again.');
        return;
      }
  
      if (response.assets && response.assets.length > 0) {
        const photo = response.assets[0];
  
        // Ensure the URI is in the correct format
        const photoUri = Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '');
  
        const formData = new FormData();
        formData.append('email', email); // Attach the email
        formData.append('profileImage', {
          uri: photoUri, // Ensure correct URI format
          type: photo.type,
          name: photo.fileName || 'profile.jpg', // Fallback name
        });
  
        try {
          const uploadResponse = await axios.post(
            'http://localhost:5000/updateProfilePhoto',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
  
          if (uploadResponse.data && uploadResponse.data.profileImage) {
            setProfilePhotoUrl(uploadResponse.data.profileImage);
            Alert.alert('Success', 'Profile photo updated successfully!');
          } else {
            Alert.alert('Error', 'Failed to update profile photo.');
          }
        } catch (error) {
          console.error('Error uploading image:', error.message);
          Alert.alert('Error', 'Failed to upload image. Please try again.');
        }
      }
    });
  };
  
  

  return (
    <>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: profilePhotoUrl || 'https://cdn-icons-png.flaticon.com/128/10398/10398223.png',
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIconContainer} onPress={handleEditPhoto}>
          <Icon name="edit" style={styles.editIcon} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIndicatorStyle: { backgroundColor: '#4CAF50' },
          tabBarStyle: { height: 60 },
        }}
      >
        <Tab.Screen name="New" component={suggested} />
        <Tab.Screen name="Liked" component={liked} />
        <Tab.Screen name="Downloads" component={downloads} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    justifyContent: 'center',
    backgroundColor: '#252427',
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
    backgroundColor: 'black',
    borderRadius: 50,
  },
});
