import DownloadPicture from '@/components/bottomsheet';
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
  // State to control the DownloadPicture component
  const [pictureOpen, setPictureOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Account Page</Text>
        <Button
          title="Download Picture"
          onPress={() => {
            setPictureOpen(true);
          }}
        />

        {pictureOpen && <DownloadPicture setPictureOpen={setPictureOpen} />}
      </View>
    </SafeAreaView>
  );
};

export default Account;
