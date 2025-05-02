// src/lib/firebase-fixed.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Inicializar Firebase corretamente em ambiente Next.js
let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// Verificar se já existe uma instância do Firebase para evitar múltiplas inicializações
if (typeof window !== 'undefined' && getApps().length === 0) {
  // Estamos no client-side e não há apps inicializados
  console.log('Inicializando Firebase no client-side...');
  try {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
    console.log('Firebase inicializado com sucesso no client-side');
  } catch (error) {
    console.error('Erro ao inicializar Firebase no client-side:', error);
  }
} else if (getApps().length > 0) {
  // Já existe uma instância, vamos reutilizá-la
  console.log('Reutilizando instância do Firebase existente');
  firebaseApp = getApps()[0];
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
} else {
  // Estamos no server-side, precisamos ter cuidado
  console.log('Ambiente server-side detectado, inicialização condicional');
  try {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
    console.log('Firebase inicializado no server-side');
  } catch (error) {
    console.error('Erro ao inicializar Firebase no server-side:', error);
  }
}

export { firebaseApp, auth, firestore };