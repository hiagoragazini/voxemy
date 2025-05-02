import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { auth } from "@/lib/firebase-fixed";
import { signInWithEmailAndPassword } from "firebase/auth";

// Componente VoxemyLogo simplificado
const VoxemyLogo = () => {
  return (
    <div className="flex items-center justify-center">
      <span className="text-3xl font-bold text-purple-600">
        Voxemy
      </span>
    </div>
  );
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Autenticação real com Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      // Redirecionamento após login bem-sucedido
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Email ou senha incorretos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'linear-gradient(to bottom, white, #f5f5f5)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <VoxemyLogo />
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#333',
            marginTop: '1rem'
          }}>Entre na sua conta</h1>
          <p style={{
            marginTop: '0.5rem',
            color: '#666'
          }}>
            Acesse sua conta para utilizar a plataforma Voxemy
          </p>
        </div>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #eee'
        }}>
          {error && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              backgroundColor: '#fee2e2',
              borderLeft: '4px solid #ef4444',
              color: '#b91c1c',
              borderRadius: '0.25rem'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div>
              <label htmlFor="email" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                style={{
                  width: '100%',
                  height: '2.75rem',
                  padding: '0 0.75rem',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  outline: 'none'
                }}
                required
              />
            </div>
            
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <label htmlFor="password" style={{
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  Senha
                </label>
                <Link
                  href="/recuperar-senha"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#7c3aed',
                    textDecoration: 'none'
                  }}
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  height: '2.75rem',
                  padding: '0 0.75rem',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  outline: 'none'
                }}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                height: '2.75rem',
                backgroundColor: '#7c3aed',
                color: 'white',
                fontWeight: '500',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? '0.7' : '1'
              }}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
        
        <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
          <p style={{color: '#666'}}>
            Ainda não tem uma conta?{" "}
            <Link href="/cadastro" style={{fontWeight: '500', color: '#7c3aed', textDecoration: 'none'}}>
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
