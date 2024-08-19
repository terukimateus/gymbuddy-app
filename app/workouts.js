import { Text, SafeAreaView, Platform, TouchableWithoutFeedback, Modal, View, Pressable, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { router, useLocalSearchParams } from "expo-router";
import { useUser } from "./(tabs)/context/user.context";
import { BlurView } from 'expo-blur';

import api from "../api";

import {
    useFonts,
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

export default () => {
  const { user, updateUser } = useUser();
  const userInfo = user?.user;
  const [alteracoes, setAlteracoes] = useState([]);
  const [modal, setModal] = useState(false)
  const [statusModal, setModalStatus] = useState()

  const treinoInfo = user?.treino?.dados?.treinos;
    const params = useLocalSearchParams();
    const { workoutDay } = params;
    const [fontLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_300Light,
    });

    if (!fontLoaded) {
        return null;
    }

    // Find the workout data
    const selectedTreino = treinoInfo?.find(treino => treino.dia.name.toLowerCase() === workoutDay.toLowerCase());



    const handleChange = (muscle, exercicio, type, value) => {
      setAlteracoes(prev => {
        const existingIndex = prev.findIndex(change => 
          change.muscle === muscle && 
          change.exercicio === exercicio && 
          change.type === type
        );
  
        const parsedValue = type === 'series' || type === 'carga' || type === 'repeticoes' ? parseInt(value, 10) : value;
  
        if (existingIndex > -1) {
          const updatedChanges = [...prev];
          updatedChanges[existingIndex].value = parsedValue;
          return updatedChanges;
        }
  
        return [
          ...prev,
          { muscle, exercicio, type, value: parsedValue }
        ];
      });
    }
  
    const submitChanges = async () => {
      const alteredMuscles = {};
  
      alteracoes.forEach(change => {
        if (!alteredMuscles[change.muscle]) {
          alteredMuscles[change.muscle] = {};
        }
        if (!alteredMuscles[change.muscle][change.exercicio]) {
          alteredMuscles[change.muscle][change.exercicio] = {};
        }
        alteredMuscles[change.muscle][change.exercicio][change.type] = change.value;
      });
  
      const updatedMuscles = Object.keys(alteredMuscles).map(muscleName => {
        const exercicios = Object.keys(alteredMuscles[muscleName]).map(exercicioName => ({
          exercicio: {
            name: exercicioName,
            ...alteredMuscles[muscleName][exercicioName]
          }
        }));
        return { name: muscleName, exercicios };
      });
  
      const requestBody = {
        dados: {
          treinos: [{
            dia: {
              name: workoutDay[0].toUpperCase() + workoutDay.substring(1),
              musculo: updatedMuscles
            }
          }]
        }
      };
  
      const apiUrl = `/treinos/${userInfo.email}`;

      try {
        const response = await api.put(apiUrl, requestBody);
        
        setModal(true)
        setModalStatus(true)
      
        // Atualizar o contexto do usuário
        updateUser({
          treino: {
            dados: {
              treinos: treinoInfo.map(treino => 
                treino.dia.name.toLowerCase() === workoutDay.toLowerCase()
                  ? { dia: { ...treino.dia, musculo: updatedMuscles } }
                  : treino
              )
            }
          }
        });
      } catch (error) {
        setModal(true)
        setModalStatus(false)
        console.error('Error submitting changes:', error);
      }
    }
    
    const treinos = selectedTreino?.dia.musculo.map((value, index) => (
        <View key={index} rowGap={15} className="mb-5">
            <Text style={{ fontFamily: Platform.select({ android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold' }), color: 'white' }} className='text-white text-xl'>
                {value.name}
            </Text>
            {value.exercicios.map((exercicio, exercicioIndex) => (
                <View key={exercicioIndex} className='py-3 px-3 bg-neutral-800 rounded-2xl'>
                    <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }) }} className='text-white text-base'>{exercicio.exercicio.name}</Text>
                    <View columnGap={5} className='flex-row items-center flex-wrap'>
                        <Text style={{ fontFamily: Platform.select({ android: 'Poppins_300Light', ios: 'Poppins-Light' }) }} className='text-neutral-400 text-md'>Séries: </Text>
                        <TextInput
                            keyboardType="numeric"
                            defaultValue={exercicio.exercicio.series.toString()}
                            style={{ fontFamily: Platform.select({ android: 'Poppins_300Light', ios: 'Poppins-Light' }), color: 'white' }}
                            onChangeText={(text) => handleChange(value.name, exercicio.exercicio.name,'series', text)}
                        />
                        <Text style={{ fontFamily: Platform.select({ android: 'Poppins_300Light', ios: 'Poppins-Light' }) }} className='text-neutral-400 text-md'>Carga (KG): </Text>
                        <TextInput
                            keyboardType="numeric"
                            defaultValue={exercicio.exercicio.carga.toString()}
                            style={{ fontFamily: Platform.select({ android: 'Poppins_300Light', ios: 'Poppins-Light' }), color: 'white' }}
                            onChangeText={(text) => handleChange(value.name, exercicio.exercicio.name, 'carga', text)}
                        />
                        <Text style={{ fontFamily: Platform.select({ android: 'Poppins_300Light', ios: 'Poppins-Light' }) }} className='text-neutral-400 text-md'>Repetições: </Text>
                        <TextInput
                            keyboardType="numeric"
                            defaultValue={exercicio.exercicio.repeticoes?.toString()}
                            style={{ fontFamily: Platform.select({ android: 'Poppins_300Light', ios: 'Poppins-Light' }), color: 'white' }}
                            onChangeText={(text) => handleChange(value.name, exercicio.exercicio.name,'repeticoes', text)}
                        />
                    </View>
                </View>
            ))}
        </View>
    ));

    return (
        <SafeAreaView className='bg-neutral-900' style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <View className='w-10/12'>
                    <View className='w-full h-24 mt-4 flex-row items-center justify-between'>
                        <Pressable onPress={() => { router.navigate('/workout'); }} columnGap={5} className='h-9 w-9 bg-neutral-800 flex-row rounded-full items-center justify-center'>
                            <Ionicons color='#0ea5e9' size={15} name="chevron-back-outline" />
                        </Pressable>
                        <View columnGap={10} className='flex-row'>
                            <Text style={{ fontFamily: Platform.select({ android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold' }), color: 'white' }} className='text-white text-xl'>
                                {workoutDay[0].toUpperCase() + workoutDay.substring(1)}
                            </Text>
                            <MaterialIcons name="calendar-today" size={28} color="#0ea5e9" />
                        </View>
                    </View>
                    <View className='mb-6 flex-row items-center justify-between'>
                      <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), color: 'white' }} className='text-white text-2xl'>Seus exercícios</Text>
                    </View>
                    {treinos}
                    <TouchableOpacity onPress={() => submitChanges()}className='w-full px-4 py-2 bg-sky-500 flex-row rounded-full items-center justify-center'>
                      <View>
                        <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' })}}>Salvar alterações</Text>
                      </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
                    {modal == true ? (
                      <TouchableWithoutFeedback onPress={() => {
                        router.push('/workout')
                        setModal(false)
                      }}>
                        <View className='absolute w-full h-screen bg-black/50 justify-center items-center'>
                          <BlurView  tint="dark" rowGap={10} intensity={Platform.select({android: 0, ios: 70})} className='overflow-hidden w-8/12 p-5 bg-neutral-900  rounded-2xl'>
                            <View columnGap={5}className='flex-row items-center'>
                              <Ionicons size={25} color={statusModal == true ? '#4ade80' : '#ef4444'} name={statusModal == true ? 'checkmark-outline' : 'alert-outline'}/>
                              <Text style={{ fontFamily: Platform.select({ android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold' }), color: 'white' }} className='text-white text-xl'>{statusModal == true ? 'Sucesso' : 'Erro'}</Text>
                            </View>
                
                            <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular', })}} className='text-neutral-400'>{statusModal == true ? 'Suas alterações foram feitas com sucesso.' : 'Houve um erro ao tentar atualizar as informações'}</Text>
                          
                            <TouchableOpacity onPress={() => {
                              router.push('/workout')
                            }} className='items-center py-2 px-3 bg-neutral-700 rounded-2xl'>
                              <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular', })}} className='text-neutral-200' >Voltar</Text>
                            </TouchableOpacity>
                          </BlurView>
                        </View>
                      </TouchableWithoutFeedback>
                    ) : null}
        </SafeAreaView>
    );
};
