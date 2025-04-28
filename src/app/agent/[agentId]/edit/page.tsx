import React from 'react';

// Definição correta de tipos para Next.js 15 com params como Promise
export default async function EditAgentPage({ 
  params 
}: { 
  params: Promise<{ agentId: string }> 
}) {
  // Aguardar a resolução dos parâmetros antes de acessá-los
  const { agentId } = await params;
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Agente: {agentId}</h1>
      <p>Página em construção...</p>
      {/* Aqui você pode adicionar o formulário e a lógica para editar o agente com base no agentId */}
    </div>
  );
}
