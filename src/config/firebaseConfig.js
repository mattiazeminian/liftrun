import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Config Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC7i1tM_FmGSXEfBYRdtCnnTdwGCF95xPw',
  authDomain: 'liftrun-5075b.firebaseapp.com',
  projectId: 'liftrun-5075b',
  storageBucket: 'liftrun-5075b.firebasestorage.app',
  messagingSenderId: '570359521942',
  appId: '1:570359521942:web:bd58558b58a13d8bad58b7',
  measurementId: 'G-3M5H2ZKNLK',
};

const app = initializeApp(firebaseConfig);

// Inizializza auth con persistenza React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inizializza Firestore
export const db = getFirestore(app);
