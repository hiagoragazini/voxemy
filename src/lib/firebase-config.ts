// src/lib/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Configuração do Firebase para ambiente de produção
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Inicializar Analytics apenas no lado do cliente
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Função para verificar o estado de autenticação do usuário
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

// Função para buscar os agentes de um usuário
export const getUserAgents = async (userId: string) => {
  try {
    const agentsRef = collection(db, 'agents');
    const q = query(agentsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const agents: any[] = [];
    querySnapshot.forEach((doc) => {
      agents.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return agents;
  } catch (error) {
    console.error('Erro ao buscar agentes:', error);
    throw error;
  }
};

export { auth, db, analytics };
