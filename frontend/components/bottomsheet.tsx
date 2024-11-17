import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DownloadPicture = ({ wallpaper, onClose }) => {
  const saveDownloadedWallpaper = async (uri, name) => {
    try {
      const existingData = await AsyncStorage.getItem('downloadedWallpapers');
      const wallpapers = existingData ? JSON.parse(existingData) : [];
      wallpapers.push({ uri, name });
      await AsyncStorage.setItem('downloadedWallpapers', JSON.stringify(wallpapers));
    } catch (error) {
      console.error('Error saving wallpaper:', error);
    }
  };

  const handleDownload = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Denied', 'You need to grant media library permissions to save the wallpaper.');
        return;
      }

      const downloadPath = FileSystem.documentDirectory + `${wallpaper.name}.jpg`;
      const { uri } = await FileSystem.downloadAsync(wallpaper.url, downloadPath);

      const asset = await MediaLibrary.createAssetAsync(uri);

      let album = await MediaLibrary.getAlbumAsync('Download');
      if (!album) {
        album = await MediaLibrary.createAlbumAsync('Download', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
      }

      await saveDownloadedWallpaper(uri, wallpaper.name);  // Save wallpaper to AsyncStorage

      Alert.alert('Download Complete', 'The wallpaper has been saved to your gallery!');
    } catch (error) {
      console.error('Error downloading the wallpaper:', error);
      Alert.alert('Download Error', 'There was an issue downloading the wallpaper.');
    }
  };

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
      <TouchableOpacity style={styles.button} onPress={handleDownload}>
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

const styles = StyleSheet.create({
  contentContainer: {
    width: "100vw",
    flex: 1,
    padding: 0,
    alignItems: 'center',
    backgroundColor: '#252427',
  },
  buttonText: {
    fontSize: 20,
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
  crossContainer: {
    backgroundColor: "white",
    borderRadius: 50,
  },
  wallpaperPreview: {
    width: '100%', // Full width of bottom sheet
    height: 400, // Adjust this height as needed
    resizeMode: 'cover',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  wallpaperName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 12,
    color: "white",
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

export default DownloadPicture;
