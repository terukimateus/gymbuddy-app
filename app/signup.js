import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text,ActivityIndicator, ScrollView,TextInput, TouchableOpacity, Pressable, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Link, router } from 'expo-router';
import React from 'react';
import Icon from './components/logo';
import api from '../api';
import { Ionicons } from '@expo/vector-icons';
import 'tailwindcss/tailwind.css';

import { TextInputMask } from 'react-native-masked-text'

import {
  useFonts,
  Poppins_100Thin,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

export default () => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [primeiroN, setPrimeiroN] = React.useState('')
  const [segundoN, setSegundoN] = React.useState('')

  const [error, setError] = React.useState('')
  const [secondPage, setSecond] = React.useState(false)

  const [dataNascimento, setNascimento] = React.useState('')
  const [genero, setGenero] = React.useState(null)
  const [peso, setPeso] = React.useState(null)
  const [altura, setAltura] = React.useState(null)

  const [checked1, setChecked1] = React.useState(false)
  const [checked2, setChecked2] = React.useState(false)
  const [checked3, setChecked3] = React.useState(false)

  const [loadingCreate, setLoading] = React.useState(false)

  const [fontLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_600SemiBold,
    Poppins_400Regular
  });

  const handleSkip = () => {
    if (email != ''  & senha != '' & primeiroN != '' & segundoN != '' ) {
      const emailteste = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

      if (emailteste.test(email.toLowerCase())) {
        setSecond(true)
        setError('')
      } else {
        setError('E-mail inválido')
      }
    } else {
      setError('Verifique todos os campos.')
    }
  }

  const handleSignup = async () => {
    if (dataNascimento != '' & genero != null & peso != null & altura != null) {
      setLoading(true)
      const res = await api.post('/users', {
        nome: primeiroN,
        sobrenome: segundoN,
        email,
        senha,
        dataNascimento,
        genero,
        peso,
        altura
      })
      setLoading(false)
      router.push('/login')
    } else {
      setError('Verifique todos os campos')
    }
  }

  if (!fontLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>

        <SafeAreaView rowGap={50}className="flex-1 items-center justify-center bg-neutral-900">

            <SafeAreaView className='w-10/12 flex items-center justify-center'>
            <Icon className='mb-5'/>
            {secondPage == false ? (
            
            <SafeAreaView rowGap={10} className="flex w-full items-center">

              <SafeAreaView className='flex items-center'>
                <Text style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }} className='text-2xl text-white'>
                  Crie sua <Text style={{ fontFamily: Platform.select({ android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold' }), }}>conta</Text>!
                </Text>
              </SafeAreaView>
              <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }} className='text-md text-red-600'>{error}</Text>
              <View columnGap={10} className='w-full flex flex-row '>
                <TextInput
                  style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }}
                  value={primeiroN}
                  placeholder={'Primeiro nome'}
                  onChangeText={setPrimeiroN}
                  placeholderTextColor="#a1a1aa"
                  className='text-white text-base border-zinc-400 py-2 flex-1 border rounded-xl px-3'
                  keyboardAppearance='dark'
                />
                <TextInput
                  style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }}
                  value={segundoN}
                  placeholder={'Sobrenome'}
                  onChangeText={setSegundoN}
                  placeholderTextColor="#a1a1aa"
                  className='text-white text-base border-zinc-400 py-2 flex-1 border rounded-xl px-3'
                  keyboardAppearance='dark'
                />
              </View>

              <TextInput  keyboardAppearance='dark' inputMode='email' style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }} value={email} placeholder={'E-mail'} onChangeText={setEmail} placeholderTextColor="#a1a1aa" className='text-white text-base border-zinc-400 py-2 w-full border rounded-xl px-3' />
              
              <TextInput keyboardAppearance='dark' style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }} value={senha} placeholder={'Senha'} onChangeText={setSenha} placeholderTextColor="#a1a1aa" className='text-white text-base border-zinc-400 py-2 w-full border rounded-xl px-3' />
              
              <TouchableOpacity className='rounded-2xl w-full flex items-center py-4 bg-sky-500' onPress={handleSkip}>
                <Text className='text-neutral-900 text-base' style={{ fontFamily: Platform.select({ android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold' }), }}>Avançar</Text>
              </TouchableOpacity>
              
              <Link href='/login'>
                <Text className='text-zinc-400 text-base' style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }}>
                  Já tem uma conta? Entre aqui.
                </Text>
              </Link>
            
            </SafeAreaView>) : (
               <SafeAreaView className="flex w-full gap-4">
                <Text style={{ fontFamily: Platform.select({ android: 'Poppins_400Regular', ios: 'Poppins-Regular' }), }} className='text-md text-red-600'>{error}</Text>

                <View columnGap={10} className='w-full flex flex-row '>
                  <TextInputMask
                    type='datetime'
                    options={{
                      format: 'DD/MM/YYYY'
                    }}
                    style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }}
                    value={dataNascimento}
                    placeholder={'Sua data de nascimento'}
                    onChangeText={setNascimento}
                    placeholderTextColor="#a1a1aa"
                    inputMode='numeric'
                    className='text-white text-base border-zinc-400 py-2 flex-1 border rounded-xl px-3'
                    keyboardAppearance='dark'
                  />
                </View>
                <Text className='text-base text-white' style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }}>Selecione seu gênero</Text>
                <View className='flex flex-row w-full'>
                  <View className='flex flex-row items-center'>
                    <Pressable 
                      className={checked1 == false ? 'w-6 h-6 justify-center items-center rounded border border-zinc-400 mr-2' : 'w-6 h-6 bg-sky-500 justify-center items-center rounded border border-zinc-200 mr-2'}
                      onPress={() => {setChecked1(true); setChecked2(false); setChecked3(false); setGenero('M')}}>
                        {checked1 && <Ionicons name='checkmark' size={20} color='white' /> }
                    </Pressable>
                    <Text className='text-base text-white' style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }}>Masculino</Text>
                  </View>
                  <View className='flex flex-row items-center'>
                    <Pressable 
                        className={checked2 == false ? 'w-6 h-6 justify-center items-center rounded border border-zinc-400 mx-2' : 'w-6 h-6 bg-sky-500 justify-center items-center rounded border border-zinc-200 mx-2'}
                        onPress={() => {setChecked2(true); setChecked1(false); setChecked1(false); setGenero('F')}}>
                          {checked2 && <Ionicons name='checkmark' size={20} color='white' /> }
                      </Pressable>
                      <Text className='text-base text-white' style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }}>Feminino</Text>
                  </View>
                  <View className='flex flex-row items-center'>
                    <Pressable 
                        className={checked3 == false ? 'w-6 h-6 justify-center items-center rounded border border-zinc-400 mx-2' : 'w-6 h-6 bg-sky-500 justify-center items-center rounded border border-zinc-200 mx-2'}
                        onPress={() => {setChecked3(true); setChecked2(false); setChecked1(false); setGenero('O')}}>
                          {checked3 && <Ionicons name='checkmark' size={20} color='white' /> }
                      </Pressable>
                      <Text className='text-base text-white' style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }}>Outro</Text>
                  </View>
                </View>
                
                <View columnGap={10} className='w-full flex flex-row '>
                  <TextInput
                    value={peso}
                    placeholder='Seu peso(Kg)'
                    onChangeText={setPeso}
                    style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }}
                    inputMode='numeric'
                    placeholderTextColor="#a1a1aa"
                    className='text-white text-base border-zinc-400 py-2 flex-1 border rounded-xl px-3'
                    keyboardAppearance='dark'
                  />
                  <TextInput
                    value={altura}
                    placeholder='Sua altura(cm)'
                    onChangeText={setAltura}
                    style={{ fontFamily: Platform.select({ android: 'Poppins_100Thin', ios: 'Poppins-Thin' }), }}
                    inputMode='numeric'
                    placeholderTextColor="#a1a1aa"
                    className='text-white text-base border-zinc-400 py-2 flex-1 border rounded-xl px-3'
                    keyboardAppearance='dark'
                  />
                </View>
            
                <TouchableOpacity className='rounded-2xl w-full flex items-center py-4 bg-sky-500' onPress={handleSignup}>
                  {loadingCreate ? (<ActivityIndicator color={'white'}/>) : (
                    <Text className='text-neutral-900 text-base' style={{ fontFamily: Platform.select({ android: 'Poppins_600SemiBold', ios: 'Poppins-SemiBold' }), }}>Criar conta</Text>
                  )}
                </TouchableOpacity>
              </SafeAreaView>

            )
          }
          </SafeAreaView> 
        <StatusBar style="light" />
        </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
