import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Wallpaper } from '@/hooks/useWallpaper';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import useLikedWallpaper from '@/hooks/useLikedWallpaper';

const ImageCard = ({ wallpaper, onPress }: { wallpaper: Wallpaper; onPress: any }) => {
  const { toggleLike, isLiked } = useLikedWallpaper();

  const handleLikePress = () => {
    toggleLike(wallpaper);
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: wallpaper.url }} />
        <View style={styles.mainContainer}>
          <ThemedText style={styles.name}>{wallpaper.name}</ThemedText>
          <Pressable onPress={handleLikePress}>
            <Ionicons
              name="heart"
              size={18}
              color={isLiked(wallpaper) ? 'red' : 'white'}
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
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
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
