import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';

const Account = () => {
  const router = useRouter();  // Corrected router initialization, only one instance is needed.
  const [userData, setUserData] = useState({
    signupDate: '',
    profilePhotoUrl: '',
    email: '',
  });
  const [email, setEmail] = useState('');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null); // State to hold the selected image
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get email from AsyncStorage
        const email = await AsyncStorage.getItem('email');
        if (!email) {
          console.error('No email found in AsyncStorage');
          return;
        }

        // API call to fetch user data
        const response = await axios.get('http://localhost:5000/getUserData', {
          params: { email }, // Pass email as a query parameter
        });

        // Update profile photo URL if available
        if (response.data && response.data.profileImage) {
          console.log("photo url :", response.data.profileImage);

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

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) setEmail(storedEmail);
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    if (email) {
      axios
        .get('http://localhost:5000/getUserData', { params: { email } })
        .then((response) => {
          const data = response.data;
          setUserData({
            signupDate: data.createdDate,
            profilePhotoUrl: data.profilePhotoUrl || 'defaultProfilePhotoUrl',
            email: data.email,
          });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [email]);

  // Handle the file upload process (similar to the <input type="file" /> logic)
  const handleFileUpload = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access the media library is required!');
        return;
      }
    }

    // Open the image picker to allow user to select an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // If an image is selected
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri); // Save the image URI

      const imageUri = result.assets[0].uri;
      console.log("Selected Image URI: ", imageUri);

      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'wallpaper.jpg', // You can dynamically change the name if needed
        type: 'image/jpeg',
      });

      formData.append('email', email); // Include email in form data to associate the image with the user

      console.log('Form Data:', formData);

      setUploading(true); // Set uploading state to true to show loading state

      try {
        // Using fetch to send data to the server
        const response = await fetch('http://localhost:5000/uploadWallpaper', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data', // Set appropriate content type
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Response from server:', data);
          alert('Wallpaper uploaded successfully!');
        } else {
          console.error('Server Error:', data);
          alert(`Upload failed: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Unexpected Error:', error);
        alert('An unexpected error occurred. Please try again.');
      } finally {
        setUploading(false); // Reset uploading state after the upload process
      }
    } else {
      alert('No image selected!');
    }
  };


  const handleLogout = async () => {
    await AsyncStorage.removeItem('email');
    alert('Logged out successfully!');
    router.push('(screens)/signup');
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.post('http://localhost:5000/deleteAccount', { email });
      alert('Account deleted successfully!');
      await AsyncStorage.removeItem('email');
      router.push('(screens)/signup');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.websiteName}>Wally</Text>
      <Text style={styles.memberSince}>
        Member Since: {userData.signupDate || 'Loading...'}
      </Text>

      <View style={styles.profileBox}>
        <Image
          source={{ uri: profilePhotoUrl }}
          style={styles.profilePhoto}
        />
        <Text style={[styles.email, { color: 'gray', fontSize: 15 }]}>
          {email || 'Loading...'}
        </Text>
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.uploadText}>Upload Your Wallpapers</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleFileUpload} // This now triggers the image upload
          disabled={uploading}
        >
          <Text style={styles.buttonText}>
            {uploading ? 'Uploading...' : 'Upload Wallpaper'}
          </Text>
        </TouchableOpacity>

        {/* Show preview of selected image */}
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        )}
      </View>

      {/* App Version Display */}
      <View style={styles.versionSection}>
        <Text style={styles.versionText}>App Version: {Constants.manifest.version}</Text>
      </View>

      {/* Logout and Delete Account Buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#151718',
  },
  websiteName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  memberSince: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#282828',
    borderRadius: 10,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 15,
    backgroundColor: 'gray',
  },
  email: {
    fontSize: 16,
  },
  uploadSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#151718',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  logoutButton: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  versionSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Account;
