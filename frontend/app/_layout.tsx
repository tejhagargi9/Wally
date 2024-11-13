import { Slot, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const [loading, setLoading] = useState(true); // Add a loading state
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null); // Track if it's first-time
  const router = useRouter();

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const isFirstTime = await AsyncStorage.getItem('isFirstTimeUser');
      if (isFirstTime === 'true') {
        setIsFirstTime(true);
      } else {
        setIsFirstTime(false);
        await AsyncStorage.setItem('isFirstTimeUser', 'false'); // Mark user as not first-time
      }
      setLoading(false); // Set loading to false once AsyncStorage check is done
    };

    checkFirstTimeUser();
  }, []);

  // Don't trigger navigation before loading completes
  useEffect(() => {
    if (!loading) {
      if (isFirstTime) {
        router.push('(screens)/signup'); // Navigate to signup page if first time
      } else {
        router.push('(tabs)'); // Navigate to main tabs if user has already signed up
      }
    }
  }, [loading, isFirstTime, router]);

  if (loading) return null; // Wait until the AsyncStorage check is done

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Slot />
      </Stack>
    </GestureHandlerRootView>
  );
}
