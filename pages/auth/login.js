import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { auth } from "@/lib/firebase-fixed";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader } from "lucide-react";
import VoxemyLogo from "@/components/VoxemyLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Autenticação real com Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Voxemy.",
      });
      
      router.push("/dashboard"); // Redirecionamento após login
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Email ou senha incorretos. Tente novamente.",
        variant: "destructive",
      });
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
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
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
