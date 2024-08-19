import { Text, SafeAreaView, TouchableOpacity, Platform, View, ActivityIndicator, Pressable } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from '../../firebase'
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useUser } from "./context/user.context";
import { Image } from 'expo-image';
import * as Localization from 'expo-localization'
import { BarChart } from "react-native-gifted-charts";
import moment from "moment-timezone";


import {
  useFonts,
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import 'tailwindcss/tailwind.css';

export default function Home() {

    const { user, loading } = useUser(); // Chamar useUser diretamente
    
    const [diaTreino, setDia] = useState()
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [musculos, setMusculos] = useState({})

    const [treinoStatus, setStatus] = useState()

    const SignOut = () => {
        signOut(auth).then(() => {
          router.push('../home');
        }).catch((error) => {
          console.error("Failed to sign out:", error);
        });
    }

    const userInfo = user?.user;
    const treinoInfo = user?.treino?.dados?.treinos;
    
    useEffect(() => {
      if (userInfo && treinoInfo) {
        const today = moment().tz(Localization.timezone).format('dddd');
        switch (today) {
          case 'Monday':
            if (treinoInfo?.find(treino => treino.dia.name.toLowerCase() === 'Segunda-feira'.toLowerCase())) {
              setDia('Segunda-feira');
              setStatus(true)
            }             
            break;
          case 'Tuesday':
            if (treinoInfo?.find(treino => treino.dia.name.toLowerCase() === 'Terça-feira'.toLowerCase())) {
              setDia('Terça-feira');
              setStatus(true)
            }             
            break;
          case 'Wednesday':
            if (treinoInfo?.find(treino => treino.dia.name.toLowerCase() === 'Quarta-feira'.toLowerCase())) {
              setDia('Quarta-feira');
              setStatus(true)
            } 
            break;
          case 'Thursday':
            if (treinoInfo?.find(treino => treino.dia.name.toLowerCase() === 'Quinta-feira'.toLowerCase())) {
              setDia('Quinta-feira');
              setStatus(true)
            }             
            break;
          case 'Friday':
            if (treinoInfo?.find(treino => treino.dia.name.toLowerCase() === 'Sexta-feira'.toLowerCase())) {
              setDia('Sexta-feira');
              setStatus(true)
            } 
            break;
          case 'Saturday':
            if (treinoInfo?.find(treino => treino.dia.name.toLowerCase() === 'Sábado'.toLowerCase())) {
              setDia('Sábado');
              setStatus(true)
            } 
            break;
          case 'Sunday':
            if (treinoInfo?.find(treino => treino.dia.name.toLowerCase() === 'Domingo'.toLowerCase())) {
              setDia('Domingo');
              setStatus(true)
            } 
            break;
        }
        setIsDataLoaded(true);
      }
    }, [userInfo, treinoInfo]);

      let treinoItems = {}

      useEffect(() => {
        if (isDataLoaded) {
          if (treinoInfo) {
            setMusculos(treinoInfo?.[diaTreino]);
          }
        }
      }, [isDataLoaded, diaTreino, treinoInfo]);
            
      const [fontLoaded] = useFonts({
      Poppins_100Thin,
      Poppins_600SemiBold,
      Poppins_400Regular,
      Poppins_300Light
    });

    if (!fontLoaded) {
      return null;
    }

    const barData = [

      {value: 250, label: 'Seg', frontColor: '#0ea5e9'},

      {value: 500, label: 'Ter'},

      {value: 745, label: 'Qua', frontColor: '#0ea5e9'},

      {value: 320, label: 'Qui'},

      {value: 600, label: 'Sex', frontColor: '#0ea5e9'},

      {value: 256, label: 'Sab'},

      {value: 300, label: 'Dom', frontColor: '#0ea5e9'},

  ];

    return (
      <SafeAreaView className='flex-1 bg-neutral-900 items-center justify-start'>
          {loading ? (
            <SafeAreaView className='flex-1 bg-neutral-900 items-center justify-center'>
              <ActivityIndicator size={'large'} color={'#00B2FF'}></ActivityIndicator>
            </SafeAreaView>
          )
          : (
            <SafeAreaView rowGap={15} className='w-10/12'>
              <SafeAreaView className='w-full justify-between h-24 mt-6 flex-row items-center'>
                <Text style={{ fontFamily: Platform.select({android: 'Poppins_300Light', ios: 'Poppins-Light'}), color: 'white' }} className='text-white text-base'>
                  Bem vindo,
                  <Text style={{ fontFamily: Platform.select({android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold'}), color: 'white' }}> {userInfo?.person?.nome}</Text>!
                </Text> 
    
                <Pressable className='bg-neutral-800 items-center justify-center' onPress={() => {router.navigate('/user')}} style={{ width: 45, height: 45, borderRadius: 99 }}>
                  <Ionicons color={'white'} size={20} name='person'/>
                </Pressable>
    
              </SafeAreaView>
              <SafeAreaView rowGap={15} className='w-full'>
                <Text style={{ fontFamily: Platform.select({android: 'Poppins_300Light', ios: 'Poppins-Light'}), color: 'white' }} className='text-white text-xl'>
                  {treinoStatus == true ? 'Seu treino hoje' : 'Você não possui treino para hoje'}
                </Text>
                {treinoStatus == true ? (
                  <View className='px-6 py-4 rounded-3xl flex-row justify-between items-center' style={{backgroundColor: '#1E1E1E'}}>
                    <SafeAreaView>
                      <Text className='text-base' style={{ fontFamily: Platform.select({android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold'}), color: 'white' }}>{diaTreino[0].toUpperCase() + diaTreino.substring(1)}</Text>

                    </SafeAreaView>
                    <Pressable onPress={() => {router.navigate({pathname:'/workouts', params: { workoutDay: diaTreino }})}}className='w-9 h-9 bg-sky-500 rounded-full items-center justify-center'>
                      <Ionicons size={20} name='arrow-forward-outline' color='#1E1E1E'/>
                    </Pressable>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => {router.push('/workout')}}className='flex-row px-6 py-4 bg-neutral-800 rounded-3xl items-center justify-between'>
                    <Text style={{ fontFamily: Platform.select({android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold'}), color: 'white' }} className='text-base'>Ver meus treinos</Text>
                    <Ionicons name='chevron-forward-outline' size={20} color='white'/>
                  </TouchableOpacity>
                )}
              </SafeAreaView>

              <View rowGap={15} className='w-full'>
                <Text style={{ fontFamily: Platform.select({android: 'Poppins_300Light', ios: 'Poppins-Light'}), color: 'white' }} className='text-white text-xl'>
                  Acompanhe seu desempenho
                </Text>         
                <View style={{backgroundColor: '#1E1E1E', borderRadius: 37}} className='items-center justify-center px-4 py-6'>
                  <Text className='text-xl mb-6' style={{ fontFamily: Platform.select({android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold'}), color: 'white' }}>Ganho de força</Text>
                  <BarChart
                          barWidth={22}
                          height={180}
                          frontColor="lightgray"
                          data={barData}
                          barBorderRadius={10}
                          hideRules
                          yAxisThickness={0}
                          hideYAxisText
                          xAxisThickness={0}
                          xAxisLabelTextStyle={{fontFamily: Platform.select({android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold'}), color: 'white', fontSize: 13, textAlign: 'center'}}
                      />
                  <View className='w-11/12 border rounded-xl  border-neutral-600 mt-6'/>
                </View>     
              </View>
          </SafeAreaView>
          )}
        
      </SafeAreaView>
    );
}
