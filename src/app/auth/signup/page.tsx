'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password) {
      setError('Todos os campos são obrigatórios');
      setLoading(false);
      return;
    }

    try {
      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Atualizar o perfil com o nome do usuário
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Redirecionar para o dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Erro ao cadastrar:', err);
      
      // Tratamento de erros específicos do Firebase
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso');
      } else if (err.code === 'auth/invalid-email') {
        setError('E-mail inválido');
      } else if (err.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres');
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E6F0FF] py-12 px-4">
      <div className="container-auth">
        <h1 className="text-2xl font-bold text-center text-[#0F2D5A] mb-6">Criar Conta</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Seu nome completo"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Mínimo de 6 caracteres"
              required
              minLength={6}
            />
          </div>
          
          <button
            type="submit"
            className="btn-primary w-full py-2 text-center"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Já tem uma conta?{' '}
          <Link href="/auth/login" className="text-[#0F2D5A] font-medium hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
