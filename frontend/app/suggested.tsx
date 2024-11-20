import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useRef, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import useWallpaper from '@/hooks/useWallpaper';
import ImageCard from '@/components/ImageCard';
import { FlatList } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetMethods } from '@gorhom/bottom-sheet';
import DownloadPicture from '@/components/bottomsheet';

const Suggested = () => {
  const { wallpapers, refetch } = useWallpaper();
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);

  // Re-fetch wallpapers whenever the tab is focused
  useFocusEffect(
    useCallback(() => {
      refetch(); // Re-fetch wallpapers
    }, [refetch])
  );

  const handleOpenBottomSheet = (wallpaper) => {
    setSelectedWallpaper(wallpaper);
    bottomSheetRef.current?.expand();
  };

  const handleCloseBottomSheet = () => {
    setSelectedWallpaper(null);
    bottomSheetRef.current?.close();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#252427' }}>
      <View style={styles.container}>
        <FlatList
          data={wallpapers}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <ImageCard
                onPress={() => handleOpenBottomSheet(item)}
                wallpaper={item}
              />
            </View>
          )}
          keyExtractor={(item) => item.name}
          numColumns={2}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["100%"]}
        enablePanDownToClose
        index={-1}
        backgroundStyle={styles.bottomSheetBackground}
        onClose={handleCloseBottomSheet}
        handleComponent={null}
      >
        {selectedWallpaper && (
          <DownloadPicture wallpaper={selectedWallpaper} onClose={handleCloseBottomSheet} />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Suggested;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  imageContainer: {
    flex: 1,
    padding: 2,
    margin: 4,
    maxWidth: '48%',
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
