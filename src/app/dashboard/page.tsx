'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/lib/auth-utils';
import { useUserAgents } from '@/lib/auth-utils';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}

function Dashboard() {
  const router = useRouter();
  const { agents, loading, error } = useUserAgents();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Função para filtrar agentes
  const filteredAgents = selectedFilter === 'all' 
    ? agents 
    : agents.filter((agent) => agent.status === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E6F0FF] py-8 px-4">
      <div className="container-dashboard max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#0F2D5A] mb-2">
            Bem-vindo ao Voxemy AI!
          </h1>
          <p className="text-gray-600">
            Este é o seu dashboard do Voxemy AI. Aqui você pode gerenciar seus agentes de IA para chamadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0F2D5A] mb-4">Resumo</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Total de agentes:</p>
                <p className="font-semibold text-[#0F2D5A]">{loading ? '...' : agents.length}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Chamadas realizadas:</p>
                <p className="font-semibold text-[#0F2D5A]">0</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Tempo de conversação:</p>
                <p className="font-semibold text-[#0F2D5A]">0 min</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0F2D5A] mb-4">Ações Rápidas</h2>
            <div className="space-y-4">
              <Link 
                href="/create-agent" 
                className="btn-primary w-full py-2 text-center block"
              >
                Criar Agente
              </Link>
              <Link 
                href="/tutorials" 
                className="btn-secondary w-full py-2 text-center block"
              >
                Ver Tutoriais
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0F2D5A] mb-4">Status</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Agentes ativos:</p>
                <p className="font-semibold text-green-600">
                  {loading ? '...' : agents.filter(a => a.status === 'active').length}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Em pausa:</p>
                <p className="font-semibold text-yellow-600">
                  {loading ? '...' : agents.filter(a => a.status === 'paused').length}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Desativados:</p>
                <p className="font-semibold text-red-600">
                  {loading ? '...' : agents.filter(a => a.status === 'inactive').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#0F2D5A] mb-2">Seus Agentes</h2>
              <p className="text-sm text-gray-500">Gerencie todos os seus agentes de IA</p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
              <div className="relative">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="appearance-none bg-[#E6F0FF] border border-[#0F2D5A] text-[#0F2D5A] py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F2D5A]"
                >
                  <option value="all">Todos os agentes</option>
                  <option value="active">Ativos</option>
                  <option value="paused">Em pausa</option>
                  <option value="inactive">Desativados</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#0F2D5A]">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              
              <Link 
                href="/create-agent" 
                className="btn-primary px-4 py-2"
              >
                Criar Agente
              </Link>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-[#0F2D5A] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-[#0F2D5A]">Carregando seus agentes...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          ) : filteredAgents.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAgents.map((agent) => (
                  <div key={agent.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-[#0F2D5A] text-lg">{agent.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        agent.status === 'active' ? 'bg-green-100 text-green-800' :
                        agent.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {agent.status === 'active' ? 'Ativo' :
                         agent.status === 'paused' ? 'Em pausa' :
                         'Desativado'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{agent.mission}</p>
                    
                    <div className="text-xs text-gray-500 mb-4">
                      <div className="flex items-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Criado em: {agent.createdAt ? new Date(agent.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Chamadas: 0
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => router.push(`/agent/${agent.id}`)} 
                        className="text-gray-600 hover:text-[#0F2D5A] text-sm flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver
                      </button>
                      
                      <button 
                        onClick={() => router.push(`/agent/${agent.id}/edit`)} 
                        className="text-[#0F2D5A] hover:text-opacity-80 text-sm font-medium"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {agents.length > 6 && (
                <div className="flex justify-center mt-8">
                  <button className="text-[#0F2D5A] hover:text-opacity-80 text-sm font-medium flex items-center">
                    Ver todos os agentes
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#E6F0FF] rounded-lg p-8 text-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-[#0F2D5A] mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
              <h3 className="text-lg font-medium text-[#0F2D5A] mb-2">Nenhum agente encontrado</h3>
              <p className="text-gray-600 mb-4">
                {selectedFilter === 'all' 
                  ? 'Você ainda não criou nenhum agente. Crie seu primeiro agente para começar a fazer chamadas automatizadas.'
                  : `Você não tem agentes com o status "${selectedFilter === 'active' ? 'ativo' : selectedFilter === 'paused' ? 'em pausa' : 'desativado'}".`}
              </p>
              <Link 
                href="/create-agent" 
                className="btn-primary inline-block"
              >
                Criar Novo Agente
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
