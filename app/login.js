import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, ActivityIndicator, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Pressable, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import React from 'react';
import Icon from './components/logo';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import 'tailwindcss/tailwind.css';

import {
  useFonts,
  Poppins_100Thin,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

export default () => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const [senhaView, setView] = React.useState(true)

  const [loginError, setErrorLogin] = React.useState('')
  const [iconView, setIcon] = React.useState('eye-outline')

  const [loadingLogin, setLoading] = React.useState(false)

  const [fontLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_600SemiBold,
    Poppins_400Regular
  });

  if (!fontLoaded) {
    return null;
  }

  const handlePasswordVisibility = () => {
    setView(!senhaView);
    setIcon(senhaView ? 'eye-off-outline' : 'eye-outline');
  };

  const formatFirebaseErrorMessage = (message) => {
    if (message.includes('auth/invalid-credential')) {
      return 'Senha incorreta. Tente novamente.';
    } else if (message.includes('auth/invalid-email')) {
      return 'E-mail não encontrado. Tente novamente';
    } else if (message.includes('auth/missing-password')) {
      return 'Preencha a senha';
    }
    return 'Ocorreu um erro. Tente novamente.';
  };

  const handleLogin = async () => {
    if (email !== '' && senha !== '') {
      const emailTeste = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      if (emailTeste.test(email.toLowerCase())) {
        setLoading(true);
        try {
          await signInWithEmailAndPassword(auth, email, senha);
          router.push('/home');
        } catch (error) {
          setErrorLogin(formatFirebaseErrorMessage(error.message));
        }
        setLoading(false);
      } else {
        setErrorLogin('E-mail inválido');
      }
    } else {
      setErrorLogin('Preencha os campos corretamente.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
          <SafeAreaView className='flex-1 items-center justify-center bg-neutral-900'>
            <SafeAreaView className='w-10/12 items-center justify-center'>
            <Icon className='mb-5'></Icon>
              <SafeAreaView className='w-full items-center'>
                <Text style={{ fontFamily: 'Poppins_100Thin', fontSize: 24, color: '#fff' }}>
                  Seja <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>bem-vindo</Text>!
                </Text>
                <Text style={{ fontFamily: 'Poppins_100Thin', fontSize: 24, color: '#fff' }}>
                  Acesse sua <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>conta</Text>!
                </Text>
              </SafeAreaView>
              <SafeAreaView rowGap={10} style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#e57373' }}>{loginError}</Text>

                <TextInput keyboardAppearance='dark' style={{ fontFamily: 'Poppins_100Thin', fontSize: 16, color: '#fff', borderColor: '#6b7280', borderWidth: 1, borderRadius: 10, padding: 10, width: '100%' }} value={email} placeholder={'E-mail'} onChangeText={setEmail} placeholderTextColor="#a1a1aa" />

                <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#6b7280', borderWidth: 1, borderRadius: 10, padding: 10, width: '100%' }}>
                  <TextInput keyboardAppearance='dark' style={{ fontFamily: 'Poppins_100Thin', fontSize: 16, color: '#fff', width: '90%' }} value={senha} placeholder={'Senha'} onChangeText={setSenha} placeholderTextColor="#a1a1aa" secureTextEntry={senhaView} />
                  <Pressable onPress={handlePasswordVisibility}>
                    <Ionicons name={iconView} size={20} color='white' />
                  </Pressable>
                </View>
                <TouchableOpacity className='rounded-2xl w-full items-center py-4 bg-sky-500' onPress={handleLogin}>
                  {loadingLogin ? (
                    <ActivityIndicator color={'white'} />
                  ) : (
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#1c1c1c' }}>Entrar</Text>
                  )}
                </TouchableOpacity>

                <Link href='/signup'>
                  <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#a1a1aa', marginTop: 20 }}>
                    Ainda não tem uma conta? Crie aqui!
                  </Text>
                </Link>
              </SafeAreaView>
            </SafeAreaView>
            <StatusBar style="light" />
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
