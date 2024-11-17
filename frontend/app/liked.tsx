import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useLikedWallpaper from '@/hooks/useLikedWallpaper';
import ImageCard from '@/components/ImageCard';
import BottomSheet, { BottomSheetMethods } from '@gorhom/bottom-sheet';
import DownloadPicture from '@/components/bottomsheet';
import { ThemedText } from '@/components/ThemedText';

const Liked = () => {
  const { likedWallpapers } = useLikedWallpaper(); // Access the liked wallpapers
  const [selectedWallpaper, setSelectedWallpaper] = React.useState(null);
  const bottomSheetRef = React.useRef<BottomSheetMethods | null>(null);

  // Open Bottom Sheet when a wallpaper is selected
  const handleOpenBottomSheet = (wallpaper) => {
    setSelectedWallpaper(wallpaper);
    bottomSheetRef.current?.expand();
  };

  // Close Bottom Sheet
  const handleCloseBottomSheet = () => {
    setSelectedWallpaper(null);
    bottomSheetRef.current?.close();
  };

  // Ensure Bottom Sheet closes when `selectedWallpaper` changes
  React.useEffect(() => {
    if (!selectedWallpaper) {
      bottomSheetRef.current?.close();
    }
  }, [selectedWallpaper]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {likedWallpapers.length > 0 ? (
          <FlatList
            data={likedWallpapers}
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
        ) : (
          <View style={styles.noLikedContainer}>
            <ThemedText style={styles.noLikedText}>No Liked Wallpapers</ThemedText>
          </View>
        )}
      </View>

      {/* Bottom Sheet for Actions */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["100%"]}
        enablePanDownToClose
        index={-1}
        backgroundStyle={styles.bottomSheetBackground}
        onClose={handleCloseBottomSheet}
        handleComponent={null} // Removes the notch
      >
        {selectedWallpaper && (
          <DownloadPicture wallpaper={selectedWallpaper} onClose={handleCloseBottomSheet} />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Liked;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  imageContainer: {
    flex: 1,
    margin: 4,
    maxWidth: '50%', // Adjusts for two-column layout
  },
  noLikedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLikedText: {
    fontSize: 16,
    color: 'gray',
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
