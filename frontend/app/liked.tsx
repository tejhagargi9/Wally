import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCard from '@/components/ImageCard';
import { useFocusEffect } from 'expo-router';

const LikedTab = () => {
  const [likedWallpapers, setLikedWallpapers] = useState([]);

  // Fetch liked wallpapers from AsyncStorage
  const fetchLikedWallpapers = async () => {
    try {
      const likedWallpapers = await AsyncStorage.getItem('likedWallpapers');
      setLikedWallpapers(likedWallpapers ? JSON.parse(likedWallpapers) : []);
    } catch (error) {
      console.error('Error fetching liked wallpapers:', error);
    }
  };

  // Refresh liked wallpapers when the tab is opened or re-rendered
  useFocusEffect(
    useCallback(() => {
        fetchLikedWallpapers()
    }, [fetchLikedWallpapers])
  )

  return (
    <View style={styles.container}>
      {likedWallpapers.length === 0 ? (
        <Text style={styles.emptyText}>No liked wallpapers yet.</Text>
      ) : (
        <FlatList
          data={likedWallpapers}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <ImageCard wallpaper={item} refreshLikedWallpapers={fetchLikedWallpapers} />
          )}
        />
      )}
    </View>
  );
};

export default LikedTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});
