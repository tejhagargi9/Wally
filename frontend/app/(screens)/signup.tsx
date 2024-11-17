import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    // Simple validation for empty fields
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Password match check
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/signup', {  // Replace with your IP
        username,
        email,
        password,
      });

      console.log('Signup successful:', response.data);
      AsyncStorage.setItem('isFirstTimeUser', 'false');
      AsyncStorage.setItem('email', email);
      AsyncStorage.setItem('username', username)  
      Alert.alert('Success', 'Signup successful');
      router.push('(tabs)');  // Navigate to login screen after successful signup
    } catch (error) {
      console.error('Signup failed:', error);
      Alert.alert('Error', 'Signup failed. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/26756658/pexels-photo-26756658/free-photo-of-moon-in-blue-sky-over-desert.jpeg?auto=compress&cs=tinysrgb&w=600' }} // Replace with your image URL
      style={styles.background}
      imageStyle={{ opacity: 0.5 }} // Add black transparency overlay to the background
    >
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Wally</Text>

        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>

          <TextInput
            style={[styles.input, { borderColor: 'black', borderWidth: 2 }]}
            placeholder="Username"
            placeholderTextColor="#fff"  // Ensure it's visible on dark backgrounds
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={[styles.input, { borderColor: 'black', borderWidth: 2 }]}
            placeholder="Email"
            placeholderTextColor="#fff"  // Ensure it's visible on dark backgrounds
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, { borderColor: 'black', borderWidth: 2 }]}
            placeholder="Password"
            placeholderTextColor="#fff"  // Ensure it's visible on dark backgrounds
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={[styles.input, { borderColor: 'black', borderWidth: 2 }]}
            placeholder="Confirm Password"
            placeholderTextColor="#fff"  // Ensure it's visible on dark backgrounds
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginLink}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => router.push('(screens)/login')} // Navigate to the login page
              >
                Log In
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 40,  // Space between header and form
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black transparent overlay for the form area
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50, // Ensure this is tall enough for the placeholder
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,    // Ensure font size is appropriate for the placeholder
    borderColor: "black",
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 10,
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
  },
  link: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
});

export default Signup;
