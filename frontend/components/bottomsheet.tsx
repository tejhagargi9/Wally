import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

interface DownloadPictureProps {
  setPictureOpen: (open: boolean) => void;
}

const DownloadPicture: React.FC<DownloadPictureProps> = ({ setPictureOpen }) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      // Bottom sheet is closed, update state to close
      setPictureOpen(false);
    }
  }, [setPictureOpen]);

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['90%']}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

export default DownloadPicture;
