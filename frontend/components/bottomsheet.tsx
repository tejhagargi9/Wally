import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DownloadPicture = ({ wallpaper, onClose }) => {
  return (
    <View style={styles.contentContainer}>
      {/* Close Button */}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <View style={styles.crossContainer}>  
        <Ionicons name="close" size={24} color="black" />


        </View>
      </TouchableOpacity>

      {/* Wallpaper Image */}
      <Image source={{ uri: wallpaper.url }} style={styles.wallpaperPreview} />

      {/* Wallpaper Name */}
      <Text style={styles.wallpaperName}>{wallpaper.name}</Text>

      {/* Get Wallpaper Button */}
      <TouchableOpacity style={styles.button} onPress={() => { /* Add download functionality */ }}>
        <Text style={styles.buttonText}>Get Wallpaper</Text>
      </TouchableOpacity>

      {/* Profile Photo */}
      {wallpaper.profilePhoto && (
        <View style={styles.profileContainer}>
          <Image source={{ uri: wallpaper.profilePhoto }} style={styles.profilePhoto} />
          <Text style={styles.profileText}>Posted by User</Text>
        </View>
      )}
    </View>
  );
};

export default DownloadPicture;

const styles = StyleSheet.create({
  contentContainer: {
    width:"100vw",
    flex: 1,
    padding: 0,
    alignItems: 'center',
    backgroundColor: '#252427',
  },
  buttonText: {
    fontSize : 20,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  crossContainer : {
    backgroundColor : "white",
    borderRadius : 50
,  },
  wallpaperPreview: {
    width: '100%', // Full width of bottom sheet
    height: 400, // Adjust this height as needed
    resizeMode: 'cover',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius : 5,
  },
  wallpaperName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 12,
    color : "white",

  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  profileContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10,
  },
  profileText: {
    fontSize: 16,
    marginTop: 8,
  },
});
