import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { auth } from '@/lib/firebase-fixed';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Adicione estilos inline para garantir que funcionem
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom, #ffffff, #f0f0ff)',
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  cardHeader: {
    padding: '32px 24px 24px',
    textAlign: 'center'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#6c27ab',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#666666',
    marginBottom: '24px'
  },
  form: {
    padding: '0 24px 24px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333333'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #dddddd',
    borderRadius: '4px',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#6c27ab',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  buttonDisabled: {
    opacity: '0.7',
    cursor: 'not-allowed'
  },
  footer: {
    padding: '16px 24px',
    textAlign: 'center',
    borderTop: '1px solid #eeeeee',
    backgroundColor: '#f9f9f9'
  },
  link: {
    color: '#6c27ab',
    fontWeight: '500',
    textDecoration: 'none'
  },
  error: {
    backgroundColor: '#fff0f0',
    borderLeft: '4px solid #dc2626',
    color: '#dc2626',
    padding: '12px',
    marginBottom: '20px',
    fontSize: '14px',
    borderRadius: '4px'
  }
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Todos os campos são obrigatórios');
      setLoading(false);
      return;
    }

    try {
      console.log("Tentando fazer login com Firebase...");
      await signInWithEmailAndPassword(auth, email, password);
      
      console.log("Login bem-sucedido, redirecionando...");
      router.push('/dashboard');
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      
      if (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('E-mail ou senha incorretos');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h1 style={styles.title}>Voxemy</h1>
          <p style={styles.subtitle}>Entre para acessar sua conta</p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}
          
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <button
              type="submit"
              disabled={loading}
              style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
        
        <div style={styles.footer}>
          <p>
            Não tem uma conta?{' '}
            <Link href="/auth/signup" style={styles.link}>
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}