import { Slot, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Custom header options for accountinfo */}
        <Stack.Screen
          name="(nobottombars)/accountinfo"
          options={{
            headerShown: true,
            headerTitle: 'Account Info',
            headerBackTitle: 'Go back'
          }}
        />
        {/* Include Slot to render other screens in the stack */}
        <Slot />
      </Stack>
    </GestureHandlerRootView>
  );
}
