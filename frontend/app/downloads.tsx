import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Library = () => {
  const [downloadedWallpapers, setDownloadedWallpapers] = useState([]);

  useEffect(() => {
    const fetchDownloadedWallpapers = async () => {
      try {
        const existingData = await AsyncStorage.getItem('downloadedWallpapers');
        console.log('existingData : ', existingData);

        if (existingData) {
          setDownloadedWallpapers(JSON.parse(existingData));
        }
      } catch (error) {
        console.error('Error fetching downloaded wallpapers:', error);
      }
    };

    fetchDownloadedWallpapers();
  }, [downloadedWallpapers]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Downloads</Text>

      {downloadedWallpapers.length > 0 ? (
        <FlatList
          data={downloadedWallpapers}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.uri }} style={styles.wallpaperImage} />
              <Text style={styles.wallpaperName}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noWallpapersText}>No downloaded wallpapers found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 16,
    alignItems: 'center',
  },
  wallpaperImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  wallpaperName: {
    fontSize: 16,
    fontWeight: '600',
  },
  noWallpapersText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Library;
