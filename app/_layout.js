import React, { useEffect } from "react";
import { router } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { UserProvider, useUser } from './(tabs)/context/user.context';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const { loading, user } = useUser();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {  // Certifique-se de que a navegação condicional também dependa de `loading`
      if (user) {
        router.push('/home');
      } else {
        router.push('/login'); // ou qualquer outra tela de login que você tenha
      }
    }
  }, [loading, user]);

  if (loading) {
    return null; // ou você pode exibir uma tela de carregamento
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <UserProvider>
      <RootLayoutInner />
    </UserProvider>
  );
}
