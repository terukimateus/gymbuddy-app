import React from "react";
import { Slot, router } from 'expo-router'
import { Stack } from 'expo-router/stack';
import { UserProvider } from './(tabs)/context/user.context';

export default function RootLayout() {
  
  React.useEffect(() => {
    router.push('/home');
  }, []);

  return (
    <UserProvider>
      <Stack screenOptions={{headerShown: false}}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}