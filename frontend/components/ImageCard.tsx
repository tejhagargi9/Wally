import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText'; // Assuming ThemedText exists

const ImageCard = ({ wallpaper, onPress, refreshLikedWallpapers }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Check if the wallpaper is liked on initial render or when `wallpaper` changes
  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const likedWallpapers = await AsyncStorage.getItem('likedWallpapers');
        const likedList = likedWallpapers ? JSON.parse(likedWallpapers) : [];
        const liked = likedList.some((w) => w.url === wallpaper.url);
        setIsLiked(liked);
      } catch (error) {
        console.error('Error checking liked wallpapers:', error);
      }
    };
    checkLikedStatus();
  }, [wallpaper]);

  // Toggle like status
  const toggleLike = async () => {
    try {
      const likedWallpapers = await AsyncStorage.getItem('likedWallpapers');
      const likedList = likedWallpapers ? JSON.parse(likedWallpapers) : [];

      if (isLiked) {
        // Remove wallpaper from the liked list
        const updatedList = likedList.filter((w) => w.url !== wallpaper.url);
        await AsyncStorage.setItem('likedWallpapers', JSON.stringify(updatedList));
        Alert.alert('Removed from Likes', `${wallpaper.name} was removed from your liked wallpapers.`);
      } else {
        // Add wallpaper to the liked list
        likedList.push(wallpaper);
        await AsyncStorage.setItem('likedWallpapers', JSON.stringify(likedList));
        Alert.alert('Added to Likes', `${wallpaper.name} is now in your liked wallpapers.`);
      }

      setIsLiked(!isLiked); // Toggle the like state
      if (refreshLikedWallpapers) refreshLikedWallpapers(); // Notify parent to refresh the liked tab
    } catch (error) {
      console.error('Error toggling like status:', error);
      Alert.alert('Error', 'There was an issue updating the like status.');
    }
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: wallpaper.url }} />
        <View style={styles.mainContainer}>
          <ThemedText style={styles.name}>{wallpaper.name}</ThemedText>
          <Pressable onPress={toggleLike}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={24}
              color={isLiked ? 'red' : 'white'}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    alignItems: 'center',
  },
  mainContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  image: {
    flex: 1,
    height: 220,
    borderRadius: 7,
    width: '100%',
    resizeMode: 'cover',
  },
  name: {
    color: 'white',
  },
});
