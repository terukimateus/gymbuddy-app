import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router'
import { Image } from 'expo-image';
import Icon from './components/logo';
import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase';

import {
  useFonts,
  Poppins_100Thin,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

export default function App() {

  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);
  
  
  
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setUser(_user);
      if (initializing) {
        setInitializing(false);
      }
    });
    return () => unsubscribe();
  }, [initializing]);
  
  const [fontLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_600SemiBold,
    Poppins_400Regular
  });
  
  React.useEffect(() => {
    if (!initializing && user) {
      router.navigate('/(tabs)/home');
    }
  }, [initializing, user]);
  
  if (!fontLoaded) {
    return null;
  }
  
  if (initializing) {
    return (
      <SafeAreaView className='flex-1 justify-center items-center bg-neutral-900'>
        <ActivityIndicator size={'large'} color={'#00B2FF'}/>
      </SafeAreaView>
    );
  }

  return (
        <SafeAreaView className="flex-1 items-center justify-evenly bg-neutral-900">
        <Icon/>
        <SafeAreaView className='w-10/12 flex items-center justify-center'>
            <SafeAreaView className="flex gap-5 py-20">
              <Text className='text-3xl text-center' style={{fontFamily: Platform.select({android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold',}),color: 'white',}}>
                Uma nova forma de treinar!
              </Text>
              <Text style={{fontFamily: Platform.select({android: 'Poppins_400Regular',ios: 'Poppins-Regular',}),}} className='text-lg text-wrap text-center text-gray-500'>Conheça o novo aplicativo para gerenciar seus treinos semanais, gerar novos treinos através de Inteligência Artificial e muito mais.</Text>
                <Link href='/login' asChild>
                  <TouchableOpacity className='rounded-2xl flex items-center py-4 bg-sky-500'>
                      <Text className='text-neutral-900 text-base' style={{fontFamily: Platform.select({android: 'Poppins_600SemiBold',ios: 'Poppins-SemiBold',}),}}>Acesse agora</Text>
                  </TouchableOpacity>
                </Link>
            </SafeAreaView>
          <StatusBar style="light" />
          </SafeAreaView>
        </SafeAreaView>
  );
}