import { Text, SafeAreaView, Platform } from "react-native"
import {
    useFonts,
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
  } from '@expo-google-fonts/poppins';

export default function Treinos() {
    const [fontLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_300Light
      });
  
      if (!fontLoaded) {
        return null;
      }


    return (
        <SafeAreaView className='flex-1 bg-neutral-900 items-center justify-start'>
            <SafeAreaView className='w-10/12'>
                <SafeAreaView className='w-full justify-between h-24 mt-6 flex-row items-center'>
                    <Text style={{ fontFamily: Platform.select({android: 'Poppins_300Light', ios: 'Poppins-Light'}), color: 'white' }} className='text-white text-xl'>
                        Sua conta
                    </Text>
                </SafeAreaView>
            </SafeAreaView>
        </SafeAreaView>
    )
}