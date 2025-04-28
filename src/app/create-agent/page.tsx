'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/lib/auth-utils';
import { db, auth } from '@/lib/firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';

export default function CreateAgentPage() {
  return (
    <AuthGuard>
      <CreateAgent />
    </AuthGuard>
  );
}

function CreateAgent() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  
  // Campos do formulário - Informações básicas
  const [name, setName] = useState('');
  const [mission, setMission] = useState('');
  const [personality, setPersonality] = useState('');
  const [voiceType, setVoiceType] = useState('masculina');

  // Campos do formulário - Base de Conhecimento
  const [companyInfo, setCompanyInfo] = useState('');
  const [productsInfo, setProductsInfo] = useState('');
  const [faqInfo, setFaqInfo] = useState('');

  // Função para alternar entre as abas
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    setSuccess(false);

    if (!name || !mission) {
      setError('Nome e missão são campos obrigatórios');
      setSubmitting(false);
      return;
    }

    try {
      // Estruturar a base de conhecimento em seções
      const knowledgeBase = {
        company: companyInfo,
        products: productsInfo,
        faq: faqInfo
      };

      // Criar documento do agente no Firestore
      await addDoc(collection(db, 'agents'), {
        name,
        mission,
        knowledgeBase,
        personality,
        voiceType,
        userId: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
        status: 'active'
      });

      // Mostrar mensagem de sucesso
      setSuccess(true);
      
      // Limpar formulário
      setName('');
      setMission('');
      setCompanyInfo('');
      setProductsInfo('');
      setFaqInfo('');
      setPersonality('');
      setVoiceType('masculina');
      
      // Redirecionar para o dashboard após 2 segundos
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      console.error('Erro ao criar agente:', err);
      setError('Erro ao criar agente. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E6F0FF] py-8 px-4">
      <div className="container-dashboard max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <Link href="/dashboard" className="text-[#0F2D5A] hover:text-opacity-80 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-[#0F2D5A]">Criar Novo Agente</h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            Configure seu agente de IA para realizar chamadas automatizadas. Defina sua personalidade, conhecimento e missão.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              Agente criado com sucesso! Redirecionando para o dashboard...
            </div>
          )}

          {/* Abas de navegação */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'info'
                  ? 'text-[#0F2D5A] border-b-2 border-[#0F2D5A]'
                  : 'text-gray-500 hover:text-[#0F2D5A]'
              }`}
              onClick={() => handleTabChange('info')}
            >
              Informações Básicas
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'knowledge'
                  ? 'text-[#0F2D5A] border-b-2 border-[#0F2D5A]'
                  : 'text-gray-500 hover:text-[#0F2D5A]'
              }`}
              onClick={() => handleTabChange('knowledge')}
            >
              Base de Conhecimento
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'personality'
                  ? 'text-[#0F2D5A] border-b-2 border-[#0F2D5A]'
                  : 'text-gray-500 hover:text-[#0F2D5A]'
              }`}
              onClick={() => handleTabChange('personality')}
            >
              Personalidade
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Aba de Informações Básicas */}
            {activeTab === 'info' && (
              <div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Agente *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F2D5A] focus:border-[#0F2D5A]"
                    placeholder="Ex: Assistente de Vendas"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-1">
                    Missão do Agente *
                  </label>
                  <textarea
                    id="mission"
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F2D5A] focus:border-[#0F2D5A] min-h-[100px]"
                    placeholder="Ex: Realizar chamadas para clientes potenciais e apresentar nossos produtos"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Descreva o objetivo principal deste agente e o que ele deve realizar nas chamadas.
                  </p>
                </div>

                <div className="mb-4">
                  <label htmlFor="voiceType" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Voz
                  </label>
                  <select
                    id="voiceType"
                    value={voiceType}
                    onChange={(e) => setVoiceType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F2D5A] focus:border-[#0F2D5A]"
                  >
                    <option value="masculina">Masculina</option>
                    <option value="feminina">Feminina</option>
                    <option value="neutra">Neutra</option>
                  </select>
                </div>
              </div>
            )}

            {/* Aba de Base de Conhecimento */}
            {activeTab === 'knowledge' && (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Forneça informações que seu agente deve conhecer para realizar chamadas eficientes. Divida o conhecimento em seções para melhor organização.
                </p>

                <div className="mb-4">
                  <label htmlFor="companyInfo" className="block text-sm font-medium text-gray-700 mb-1">
                    Sobre a Empresa
                  </label>
                  <textarea
                    id="companyInfo"
                    value={companyInfo}
                    onChange={(e) => setCompanyInfo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F2D5A] focus:border-[#0F2D5A] min-h-[100px]"
                    placeholder="Ex: História da empresa, missão, valores, diferenciais..."
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="productsInfo" className="block text-sm font-medium text-gray-700 mb-1">
                    Produtos e Serviços
                  </label>
                  <textarea
                    id="productsInfo"
                    value={productsInfo}
                    onChange={(e) => setProductsInfo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F2D5A] focus:border-[#0F2D5A] min-h-[100px]"
                    placeholder="Ex: Detalhes sobre produtos, preços, características, benefícios..."
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="faqInfo" className="block text-sm font-medium text-gray-700 mb-1">
                    Perguntas Frequentes (FAQ)
                  </label>
                  <textarea
                    id="faqInfo"
                    value={faqInfo}
                    onChange={(e) => setFaqInfo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F2D5A] focus:border-[#0F2D5A] min-h-[100px]"
                    placeholder="Ex: Perguntas comuns e suas respostas, objeções frequentes..."
                  />
                </div>
              </div>
            )}

            {/* Aba de Personalidade */}
            {activeTab === 'personality' && (
              <div>
                <div className="mb-4">
                  <label htmlFor="personality" className="block text-sm font-medium text-gray-700 mb-1">
                    Personalidade do Agente
                  </label>
                  <textarea
                    id="personality"
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F2D5A] focus:border-[#0F2D5A] min-h-[150px]"
                    placeholder="Ex: Amigável, profissional, paciente e prestativo. Deve ser cordial e respeitoso, mas também assertivo quando necessário."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Descreva como o agente deve se comportar durante as chamadas, seu tom de voz, estilo de comunicação e características de personalidade.
                  </p>
                </div>

                <div className="bg-[#E6F0FF] p-4 rounded-md mb-4">
                  <h3 className="text-sm font-medium text-[#0F2D5A] mb-2">Dicas para uma boa personalidade:</h3>
                  <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                    <li>Seja específico sobre o tom de voz (formal, casual, amigável)</li>
                    <li>Defina como o agente deve lidar com objeções</li>
                    <li>Estabeleça limites claros sobre o que o agente pode ou não pode dizer</li>
                    <li>Inclua exemplos de frases que o agente deve usar</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <div>
                {activeTab !== 'info' && (
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => handleTabChange(activeTab === 'knowledge' ? 'info' : 'knowledge')}
                  >
                    Anterior
                  </button>
                )}
              </div>
              
              <div className="flex space-x-4">
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancelar
                </Link>
                
                {activeTab !== 'personality' ? (
                  <button
                    type="button"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0F2D5A] hover:bg-opacity-90"
                    onClick={() => handleTabChange(activeTab === 'info' ? 'knowledge' : 'personality')}
                  >
                    Próximo
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0F2D5A] hover:bg-opacity-90"
                    disabled={submitting}
                  >
                    {submitting ? 'Criando...' : 'Criar Agente'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
