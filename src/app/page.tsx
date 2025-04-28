import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E6F0FF]">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#0F2D5A] mb-4">Voxemy AI</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Plataforma de IA Caller para automatizar suas chamadas telefônicas com agentes inteligentes
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
          <Link 
            href="/auth/signup" 
            className="btn-primary text-center text-lg py-3 px-8"
          >
            Começar Agora
          </Link>
          <Link 
            href="/auth/login" 
            className="btn-secondary text-center text-lg py-3 px-8"
          >
            Fazer Login
          </Link>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-3">Crie Agentes Personalizados</h3>
            <p className="text-gray-600">
              Desenvolva agentes de IA com personalidade e conhecimento específicos para suas necessidades.
            </p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold mb-3">Automatize Chamadas</h3>
            <p className="text-gray-600">
              Deixe seus agentes realizarem chamadas automatizadas com interações naturais.
            </p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold mb-3">Analise Resultados</h3>
            <p className="text-gray-600">
              Acompanhe o desempenho dos seus agentes com métricas detalhadas e insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
