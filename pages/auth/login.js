import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { auth } from "@/lib/firebase-fixed";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader } from "lucide-react";

// Supondo que você tenha esses componentes na sua UI
// Se não tiver, você precisará implementá-los ou usar alternativas
const Button = ({ children, className, disabled, type }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} transition-colors rounded-md`}
    >
      {children}
    </button>
  );
};

const Input = ({ id, type, value, onChange, placeholder, className, required }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border rounded-md outline-none ${className}`}
      required={required}
    />
  );
};

const Label = ({ htmlFor, className, children }) => {
  return (
    <label htmlFor={htmlFor} className={`block ${className}`}>
      {children}
    </label>
  );
};

const Card = ({ children, className }) => {
  return (
    <div className={`${className} rounded-xl`}>
      {children}
    </div>
  );
};

// Componente VoxemyLogo simplificado
const VoxemyLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 
to-purple-500">
        Voxemy
      </span>
    </div>
  );
};

const Login = () => {
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
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Email ou senha incorretos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white 
to-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <VoxemyLogo className="w-full mb-6" />
          <h1 className="text-2xl font-semibold text-gray-900">Entre na sua conta</h1>
          <p className="mt-2 text-gray-600">
            Acesse sua conta para utilizar a plataforma Voxemy
          </p>
        </div>
        
        <Card className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="h-11 bg-gray-50 border-gray-200 focus:border-purple-600 focus:ring-purple-600"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <Link
                  href="/recuperar-senha"
                  className="text-sm font-medium text-purple-600 hover:text-purple-800"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 bg-gray-50 border-gray-200 focus:border-purple-600 focus:ring-purple-600"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium"
            >
              {isLoading ? (
                <>
                  {/* Você pode substituir o Loader por um componente de spinner simples */}
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" 
strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 
12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Card>
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Ainda não tem uma conta?{" "}
            <Link href="/cadastro" className="font-medium text-purple-600 hover:text-purple-800">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
