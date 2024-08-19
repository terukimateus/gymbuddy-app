import { Text, SafeAreaView, Platform, View, Pressable, TouchableOpacity } from "react-native"
import { useUser } from "./context/user.context";
import { useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

import {
    useFonts,
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
  } from '@expo-google-fonts/poppins';

export default function Treinos() {

    const { user, loading } = useUser(); // Chamar useUser diretamente
    const [editable, setEditable] = useState(false)

    const [fontLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_300Light
      });
  
      if (!fontLoaded) {
        return null;
      }


    const userInfo = user?.user;
    const treinoInfo = user?.treino.dados.treinos;

    let Treinos = []
    
    if (userInfo && treinoInfo) {
        Treinos = treinoInfo.map(function(item, key) {
            const name = item.dia.name;
            return (
                <View key={key} style={{backgroundColor: '#1E1E1E'}} className='w-full py-5 rounded-3xl px-5 flex-row justify-between items-center'>
                    <View>
                        <Text className='text-base' style={{ fontFamily: Platform.select({android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold'}), color: 'white' }}>
                            {name[0].toUpperCase() + name.substring(1)}
                        </Text>
                        <Text style={{ fontFamily: Platform.select({android: 'Poppins_300Light', ios: 'Poppins-Light'})}} className='text-neutral-400 text-md'>
                            {item.dia.musculo.map((musculo, index) => {
                                if (index >= 1) {
                                    return ` e ${musculo.name}`
                                }
                                return musculo.name
                            })}
                        </Text>
                    </View>
                    {editable == true ? (
                                        <Pressable onPress={() => router.push({
                                            pathname: '/workouts',
                                            params: { workoutDay: name }
                                        })}
                        
                                        className='w-9 h-9 bg-red-500 rounded-full items-center justify-center'>
                                            <Ionicons size={20} name='remove-outline' color='#1E1E1E'/>
                                        </Pressable>
                    ) : (
                        <Pressable onPress={() => router.push({
                            pathname: '/workouts',
                            params: { workoutDay: name }
                        })}
        
                        className='w-9 h-9 bg-sky-500 rounded-full items-center justify-center'>
                            <Ionicons size={20} name='arrow-forward-outline' color='#1E1E1E'/>
                        </Pressable>
                    )}
                </View>
            );
        });
    }
      
    return (
        <SafeAreaView className='flex-1 bg-neutral-900 items-center justify-start'>
            <SafeAreaView className='w-10/12'>
                <SafeAreaView className='w-full justify-between h-24 mt-6 flex-row items-center'>
                    <Text style={{ fontFamily: Platform.select({android: 'Poppins_300Light', ios: 'Poppins-Light'}), color: 'white' }} className='text-white text-base'>
                    Bem vindo,
                    <Text style={{ fontFamily: Platform.select({android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold'}), color: 'white' }}> {userInfo?.person?.nome}</Text>!
                    </Text> 
        
                    <Pressable className='bg-neutral-800 items-center justify-center' onPress={() => {router.navigate('/user')}} style={{ width: 45, height: 45, borderRadius: 99 }}>
                        <Ionicons color={'white'} size={20} name='person'/>
                    </Pressable>
                </SafeAreaView>
                <View rowGap={30}>
                    <View columnGap={15} className='w-full justify-between flex-row items-center '>
                        <View columnGap={10}className='flex-row items-center'>
                            <Text style={{ fontFamily: Platform.select({android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold'}), color: 'white' }} className='text-white text-xl'>Seus treinos</Text>
                        </View>
                        <TouchableOpacity onPress={() => {editable == true ? setEditable(false) : setEditable(true)}} className='h-9 px-4 bg-neutral-800 flex-row rounded-full items-center justify-center'>
                            <View columnGap={5} className='flex-row items-center'>
                                <Text className='text-base' style={{ fontFamily: Platform.select({android: 'Poppins_300Light', ios: 'Poppins-Light'}), color: 'white' }}>Editar treinos</Text>
                                <Ionicons name='build-outline' color='white' size={17}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {Treinos}
                    <TouchableOpacity onPress={() => {router.navigate('/createTreino')}} className='px-3 py-3 bg-sky-500 flex-row justify-center rounded-2xl items-center'>
                        <View columnGap={5} className='flex-row'>
                            <Text style={{ fontFamily: Platform.select({android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold'})}} className='text-base'>Gerar novo treino</Text>
                            <Ionicons name='sparkles-outline' size={22}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    )
}   