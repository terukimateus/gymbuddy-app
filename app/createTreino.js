import { Text, SafeAreaView, Platform, View, Pressable, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import { useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import * as Progress from 'react-native-progress';
import { useState } from 'react'

import api from "../api";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Checkbox from 'expo-checkbox';
import { useUser } from "./(tabs)/context/user.context";


import {
    useFonts,
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
  } from '@expo-google-fonts/poppins';

export default () => {
    const { user } = useUser(); // Chamar useUser diretamente
    const userInfo = user?.user;

    const [dom, setDom] = useState(false)
    const [seg, setSegunda] = useState(false)
    const [ter, setTerca] = useState(false)
    const [qua, setQua] = useState(false)
    const [qui, setQuim] = useState(false)
    const [sex, setSex] = useState(false)
    const [sab, setSab] = useState(false)

    const [peito, setPeito] = useState(false)
    const [costas, setCostas] = useState(false)
    const [biceps, setBiceps] = useState(false)
    const [triceps, setTriceps] = useState(false)
    const [pernas, setPernas] = useState(false)
    const [gluteo, setGluteo] = useState(false)
    const [ombros, setOmbros] = useState(false)

    const [series, setSeries] = useState('')

    const [loading, setLoading] = useState(false)
    const [dots, setDots] = useState('');
    const [error, setError] = useState()

    const [status, setStatus] = useState(null)
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length < 3) {
                    return prevDots + '.';
                } else {
                    return '';
                }
            });
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    const [fontLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_300Light
      });
  
    
      if (!fontLoaded) {
        return null;
      }

    const handleSeries = (value) => {
        const quant = Number.parseInt(value)
        console.log(quant)
        if (Number.isNaN(quant)) {
            setSeries()
        } else if (quant > 30) {
            console.log('a')
            setSeries('30')
        } else {
            setSeries(`${quant}`)
        }
    }

    const handleGenerate = async () => {
        dias_sem = []
        musculos = []

        if (dom) dias_sem.push('domingo');
        if (seg) dias_sem.push('segunda-feira');
        if (ter) dias_sem.push('terça-feira');
        if (qua) dias_sem.push('quarta-feira');
        if (qui) dias_sem.push('quinta-feira');
        if (sex) dias_sem.push('sexta-feira');
        if (sab) dias_sem.push('sábado');

        if (dias_sem.length < 2) {
            setError('Selecione pelo menos dois dias da semana')
            return
        }

        if (peito) musculos.push('Peito');
        if (costas) musculos.push('Costas');
        if (biceps) musculos.push('Bíceps');
        if (triceps) musculos.push('Tríceps');
        if (pernas) musculos.push('Pernas');
        if (gluteo) musculos.push('Glúteo');
        if (ombros) musculos.push('Ombros');

        if (musculos.length > 2) {
            setError('Selecione no máximo 2 músculos')
            return
        }

        if (series == '') {
            setError('Escolha uma quantidade de séries')
            return
        }

        setLoading(true)
        setError('')        

        try {
            const requestData = {
                dias: dias_sem,
                musculos: musculos,
                series: series
            }

            const response = await api.post(`/treinos/${user.user.email}`, requestData)

            console.log(response.data)
            setStatus(true)
        } catch (err) {
            console.error(err)
            setStatus(false)
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-neutral-900 items-center justify-start'>
            {loading == false ? (
            <SafeAreaView rowGap={20}className='w-10/12'>
                <SafeAreaView className='w-full justify-between h-20 mt-6 flex-row items-center'>
                    <Text style={{ fontFamily: Platform.select({android: 'Poppins_300Light', ios: 'Poppins-Light'}), color: 'white' }} className='text-white text-xl'>
                        Gerar novo treino
                    </Text>
                </SafeAreaView>
                <View rowGap={10} className='w-full'>
                    <Text style={{ fontFamily: Platform.select({android: 'Poppins_300Light', ios: 'Poppins-Light'}), color: 'white' }} className='text-white text-lg'>
                        Quais dias da semana você irá treinar?
                    </Text>
                    <View  columnGap={10} rowGap={10}style={{ display: 'flex',flexDirection: 'row',flexWrap: 'wrap'}} className='w-full justify-start'>
                            <Pressable 
                                className={dom == false ? 'w-16 py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : 'w-16 py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {dom == true ? setDom(false) : setDom(true)}}>
                                <Text className={dom == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Thin' }), }}>Dom</Text>
                            </Pressable>
                            <Pressable 
                                className={seg == false ? 'w-16 py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : 'w-16 py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {seg == true ? setSegunda(false) : setSegunda(true)}}>
                                <Text className={seg == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Thin' }), }}>Seg</Text>
                            </Pressable>
                            <Pressable 
                                className={ter == false ? 'w-16 py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : 'w-16 py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {ter == true ? setTerca(false) : setTerca(true)}}>
                                <Text className={ter == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Thin' }), }}>Ter</Text>
                            </Pressable>
                            <Pressable 
                                className={qua == false ? 'w-16 py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : 'w-16 py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {qua == true ? setQua(false) : setQua(true)}}>
                                <Text className={qua == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Thin' }), }}>Qua</Text>
                            </Pressable>
                            <Pressable 
                                className={qui == false ? 'w-16 py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : 'w-16 py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {qui == true ? setQuim(false) : setQuim(true)}}>
                                <Text className={qui == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Thin' }), }}>Qui</Text>
                            </Pressable>
                            <Pressable 
                                className={sex == false ? 'w-16 py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : 'w-16 py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {sex == true ? setSex(false) : setSex(true)}}>
                                <Text className={sex == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }}>Sex</Text>
                            </Pressable>
                            <Pressable 
                                className={sab == false ? 'w-16 py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : 'w-16 py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {sab == true ? setSab(false) : setSab(true)}}>
                                <Text className={sab == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }}>Sáb</Text>
                            </Pressable>
                    </View>
                </View>
                <View rowGap={10} className='w-full'>
                    <Text style={{ fontFamily: Platform.select({android: 'Poppins_300Light', ios: 'Poppins-Light'}), color: 'white' }} className='text-white text-lg'>
                        Selecione dois músculos para dar foco
                    </Text>
                    <View  columnGap={10} rowGap={10}style={{ display: 'flex',flexDirection: 'row',flexWrap: 'wrap'}} className='w-full justify-start'>
                            <Pressable 
                                className={peito == false ? ' py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : ' py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {peito == true ? setPeito(false) : setPeito(true)}}>
                                <Text className={peito == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Thin' }), }}>Peito</Text>
                            </Pressable>
                            <Pressable 
                                className={ombros == false ? ' py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : ' py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {ombros == true ? setOmbros(false) : setOmbros(true)}}>
                                <Text className={ombros == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Thin' }), }}>Ombros</Text>
                            </Pressable>
                            <Pressable 
                                className={triceps == false ? ' py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : ' py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {triceps == true ? setTriceps(false) : setTriceps(true)}}>
                                <Text className={triceps == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Thin' }), }}>Tríceps</Text>
                            </Pressable>
                            <Pressable 
                                className={costas == false ? ' py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : ' py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {costas == true ? setCostas(false) : setCostas(true)}}>
                                <Text className={costas == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Thin' }), }}>Costas</Text>
                            </Pressable>
                            <Pressable 
                                className={biceps == false ? ' py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : ' py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {biceps == true ? setBiceps(false) : setBiceps(true)}}>
                                <Text className={biceps == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Thin' }), }}>Bíceps</Text>
                            </Pressable>
                            <Pressable 
                                className={pernas == false ? ' py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : ' py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {pernas == true ? setPernas(false) : setPernas(true)}}>
                                <Text className={pernas == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }}>Pernas</Text>
                            </Pressable>
                            <Pressable 
                                className={gluteo == false ? ' py-2 px-3 justify-center items-center rounded-full bg-neutral-800 ' : ' py-2 px-3 justify-center items-center rounded-full bg-sky-500 '}
                                onPress={() => {gluteo == true ? setGluteo(false) : setGluteo(true)}}>
                                <Text className={gluteo == true ? 'text-white text-md' : 'text-md text-neutral-400'} style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }}>Gluteo</Text>
                            </Pressable>
                    </View>
                </View>
                <View rowGap={10} className='w-full'>
                    <Text style={{ fontFamily: Platform.select({android: 'Poppins_300Light', ios: 'Poppins-Light'}), color: 'white' }} className='text-white text-lg'>
                        Quantidade de séries máximas
                    </Text>
                    <TextInput className='border border-neutral-400 py-3 w-full px-3 rounded-2xl text-base text-white' placeholder='1 a 30' placeholderTextColor="#a1a1a1"style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }} value={series} onChangeText={handleSeries}keyboardType='numeric'/>
                </View>
                <TouchableOpacity onPress={handleGenerate} className='flex-row py-4 px-3 bg-sky-500 items-center justify-center rounded-2xl'>
                    <Text style={{ fontFamily: Platform.select({ android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold' }), }} className='text-base text-neutral-800'>Gerar agora</Text>
                </TouchableOpacity>

                <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }} className='text-base text-red-500'>{error}</Text>
                {loading && (
                    <View className='w-full py-2 px-3 justify-center items-center rounded-xl bg-neutral-800'>
                        <ActivityIndicator size={30} />
                    </View>
                )}

            </SafeAreaView>
            ) : (
                <View rowGap={20}className='h-full w-10/12 items-center justify-center'>
                    {status == null ? (
                        <>
                            <ActivityIndicator size={100} color='#0ea5e9'/>
                            <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }} className='text-white text-xl'>Estamos gerando seu treino{dots}</Text>
                        </>
                    ) : (status == true ? (
                        <>
                            <Ionicons name='checkmark-outline' size={100} color='#0ea5e9'/>
                            <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }} className='text-white text-xl'>Seu treino foi gerado com sucesso!</Text>
                            <TouchableOpacity onPress={() => {router.navigate('/workout'), setLoading(null), setStatus(null)}}className='py-3 w-6/12 items-center justify-center bg-sky-500 rounded-2xl flex'>
                                <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }} className='text-neutral-800 text-base'>
                                    Voltar
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Ionicons name='checkmark-outline' size={100} color='#ef4444'/>
                            <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }} className='text-white text-xl'>Ocorreu um erro ao gerar seu treino.</Text>
                            <TouchableOpacity onPress={() => {router.navigate('/workout'), setLoading(null), setStatus(null)}}className='py-3 w-6/12 items-center justify-center bg-neutral-800 rounded-2xl flex'>
                                <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }} className='text-neutral-300 text-base'>
                                    Voltar
                                </Text>
                            </TouchableOpacity>
                        </>
                    )) }
                </View>
            )}
        </SafeAreaView>
    )
}