'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, getCurrentUser, getUserAgents } from '@/lib/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

// Componente de proteção de rota com redirecionamento aprimorado
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        // Armazenar a URL atual para redirecionamento após login
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          if (currentPath !== '/auth/login' && currentPath !== '/auth/signup') {
            sessionStorage.setItem('redirectAfterLogin', currentPath);
          }
        }
        router.push('/auth/login');
      }
      setLoading(false);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [router]);

  // Verificação adicional para garantir que o usuário está autenticado
  useEffect(() => {
    if (authChecked && !authenticated && !loading) {
      router.push('/auth/login');
    }
  }, [authChecked, authenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#E6F0FF]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0F2D5A] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#0F2D5A]">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return authenticated ? <>{children}</> : null;
}

// Hook personalizado para obter o usuário atual com informações adicionais
export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // Aqui poderíamos buscar informações adicionais do usuário no Firestore
          // Por exemplo: const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          // setUserInfo(userDoc.data());
          
          // Por enquanto, vamos apenas usar as informações básicas do Auth
          setUserInfo({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Usuário',
            photoURL: currentUser.photoURL,
            emailVerified: currentUser.emailVerified,
            createdAt: currentUser.metadata.creationTime
          });
        } catch (error) {
          console.error('Erro ao buscar informações do usuário:', error);
        }
      } else {
        setUserInfo(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Função para logout com redirecionamento
  const logout = async () => {
    try {
      await auth.signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return { user, userInfo, loading, logout };
}

// Hook personalizado para obter os agentes do usuário com atualização em tempo real
export function useUserAgents() {
  const { user } = useAuth();
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: any = null;

    async function fetchAgents() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Implementar busca inicial
        const userAgents = await getUserAgents(user.uid);
        setAgents(userAgents);
        setError(null);
        
        // Aqui poderíamos configurar um listener em tempo real para atualizações
        // Por exemplo:
        // const q = query(collection(db, 'agents'), where('userId', '==', user.uid));
        // unsubscribe = onSnapshot(q, (snapshot) => {
        //   const updatedAgents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //   setAgents(updatedAgents);
        // });
      } catch (err) {
        console.error('Erro ao buscar agentes:', err);
        setError('Falha ao carregar seus agentes. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();

    // Limpar listener quando o componente for desmontado
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  // Função para atualizar o status de um agente
  const updateAgentStatus = async (agentId: string, status: string) => {
    try {
      // Aqui implementaríamos a atualização do status no Firestore
      // Por exemplo: await updateDoc(doc(db, 'agents', agentId), { status });
      
      // Por enquanto, vamos apenas atualizar o estado local
      setAgents(agents.map(agent => 
        agent.id === agentId ? { ...agent, status } : agent
      ));
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar status do agente:', error);
      return false;
    }
  };

  return { agents, loading, error, updateAgentStatus };
}

// Componente para verificar se o usuário está logado e redirecionar se necessário
export function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Verificar se há um redirecionamento pendente
        const redirectPath = sessionStorage.getItem('redirectAfterLogin');
        if (redirectPath) {
          sessionStorage.removeItem('redirectAfterLogin');
          router.push(redirectPath);
        } else {
          router.push('/dashboard');
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#E6F0FF]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0F2D5A] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#0F2D5A]">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
