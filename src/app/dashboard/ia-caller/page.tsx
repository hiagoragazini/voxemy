// src/components/ui/IACaller.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebase-fixed'; // Usando a configuração corrigida

const IACaller = () => {
  // Estados
  const [agents, setAgents] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTestLoaded, setIsTestLoaded] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  
  // Ref para o player de áudio
  const audioRef = useRef(null);

  // Carregar dados do Firebase
  useEffect(() => {
    const loadData = async () => {
      console.log("Iniciando carregamento de dados...");
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Tentando carregar dados do Firestore");
        
        // Carregar agentes
        const agentsCollection = collection(firestore, "agents");
        const agentsSnapshot = await getDocs(agentsCollection);
        const agentsData = agentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Agentes carregados:", agentsData.length);
        setAgents(agentsData);
        
        // Carregar leads
        const leadsCollection = collection(firestore, "leads");
        const leadsSnapshot = await getDocs(leadsCollection);
        const leadsData = leadsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Leads carregados:", leadsData.length);
        setLeads(leadsData);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setError(`Erro ao carregar dados do Firebase: ${error.message}`);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Função para carregar o teste de áudio
  const handleLoadTest = () => {
    console.log("Carregando teste de áudio");
    // Simulando carregamento de teste
    setTimeout(() => {
      setIsTestLoaded(true);
      setAudioSrc('/path/to/test-audio.mp3'); // Substitua pelo caminho real
    }, 1000);
  };
  
  // Função para reproduzir o áudio de teste
  const handlePlayTest = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error("Erro ao reproduzir áudio:", err);
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Voxemy AI Caller</h1>
      
      {/* Mostrar erro se existir */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          <p className="text-sm">Verifique o console para mais detalhes.</p>
        </div>
      )}
      
      {/* Status de carregamento */}
      {isLoading ? (
        <div className="text-center py-4">
          <p>Carregando dados...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seleção de agente */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-3">Selecione um agente</h2>
            {agents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {agents.map(agent => (
                  <div 
                    key={agent.id}
                    className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${
                      selectedAgent?.id === agent.id ? 'bg-blue-100 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-gray-600">{agent.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nenhum agente disponível.</p>
            )}
          </div>
          
          {/* Seleção de lead */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-3">Selecione um lead</h2>
            {leads.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {leads.map(lead => (
                  <div 
                    key={lead.id}
                    className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${
                      selectedLead?.id === lead.id ? 'bg-blue-100 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-gray-600">{lead.phone || 'Sem telefone'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nenhum lead disponível.</p>
            )}
          </div>
        </div>
      )}
      
      {/* Seção de teste - IMPORTANTE: Sem condicionais para garantir que os botões apareçam */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Teste de voz</h2>
        <div className="debug-info bg-gray-100 p-2 mb-4 text-xs">
          <p>Debug: isTestLoaded = {String(isTestLoaded)}</p>
          <p>Debug: audioSrc = {audioSrc}</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleLoadTest}
          >
            Carregar Teste
          </button>
          
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handlePlayTest}
          >
            Ouvir Teste
          </button>
        </div>
        
        {/* Player de áudio */}
        <div className="mt-4">
          <audio ref={audioRef} src={audioSrc} controls className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default IACaller;