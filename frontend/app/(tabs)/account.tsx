import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import DownloadPicture from '@/components/bottomsheet';

const Account = () => {
  const [pictureOpen, setPictureOpen] = useState(false);
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Close the bottom sheet if returning to the tab after manually closing it
      if (!isManuallyOpened) {
        setPictureOpen(false);
      }
    }, [isManuallyOpened])
  );

  const handleOpenSheet = () => {
    setPictureOpen(true);
    setIsManuallyOpened(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Account Page</Text>
        <Button title="Download Picture" onPress={handleOpenSheet} />

        {/* Render the bottom sheet if pictureOpen is true */}
        {pictureOpen && <DownloadPicture setPictureOpen={setPictureOpen} />}
      </View>
    </SafeAreaView>
  );
};

export default Account;
