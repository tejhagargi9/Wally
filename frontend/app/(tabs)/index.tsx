import React, { useState, useCallback, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import useWallpaper from '@/hooks/useWallpaper';
import ImageCard from '@/components/ImageCard';
import { FlatList } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetMethods } from '@gorhom/bottom-sheet';
import DownloadPicture from '@/components/bottomsheet';


const Index = () => {
  const wallpapers = useWallpaper();
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);

  const handleOpenBottomSheet = (wallpaper) => {
    setSelectedWallpaper(wallpaper); 
    bottomSheetRef.current?.expand();
  };

  const handleCloseBottomSheet = () => {
    setSelectedWallpaper(null);
    bottomSheetRef.current?.close(); // Close the bottom sheet
  };

  useEffect(() => {
    if (!selectedWallpaper) {
      bottomSheetRef.current?.close();
    }
  }, [selectedWallpaper]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerImage={<Image style={{ flex: 1 }} source={{ uri: wallpapers[0]?.url ?? "" }} />}
        headerBackgroundColor={{ dark: 'black', light: 'white' }}
      >
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
      </ParallaxScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["100%"]}
        enablePanDownToClose
        index={-1}
        backgroundStyle={styles.bottomSheetBackground}
        onClose={handleCloseBottomSheet}
        handleComponent={null}  // Removes the notch
      >
        {selectedWallpaper && (
          <DownloadPicture wallpaper={selectedWallpaper} onClose={handleCloseBottomSheet} />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  imageContainer: {
    flex: 1,
    margin: 4,
    maxWidth: '100vw',
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
