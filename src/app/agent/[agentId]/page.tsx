import React from 'react';

// Como esta é uma página dinâmica, precisamos receber os parâmetros da rota
const ViewAgentPage = ({ params }: { params: { agentId: string } }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Visualizar Agente: {params.agentId}</h1>
      <p>Página em construção...</p>
      {/* Aqui você pode adicionar a lógica para buscar e exibir os detalhes do agente com base no agentId */}
    </div>
  );
};

export default ViewAgentPage;

