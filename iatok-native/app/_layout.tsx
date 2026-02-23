import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**
 * Root layout for the Expo Router navigation stack. This component wraps the
 * navigation stack in a GestureHandlerRootView to ensure gesture handling
 * works correctly throughout the application. All screens defined in the
 * Stack will inherit the header and content styles specified here.
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="chat/[iaName]" />
        <Stack.Screen name="create-ia" />
        <Stack.Screen name="premium" />
      </Stack>
    </GestureHandlerRootView>
  );
}