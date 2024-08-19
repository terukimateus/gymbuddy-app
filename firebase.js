
import { initializeApp, getApps, getApp} from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_jg51V2zebMfBmYHbz9wRE6fN9-a2atU",
  authDomain: "gymbuddy-5fe24.firebaseapp.com",
  projectId: "gymbuddy-5fe24",
  storageBucket: "gymbuddy-5fe24.appspot.com",
  messagingSenderId: "1083258592868",
  appId: "1:1083258592868:web:f1eba2ae8859f1ffba8971"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
