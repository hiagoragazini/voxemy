import React from 'react';

// Definindo o tipo esperado para as props da página dinâmica
type Props = {
  params: { agentId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Como esta é uma página dinâmica, precisamos receber os parâmetros da rota
const EditAgentPage = ({ params }: Props) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Agente: {params.agentId}</h1>
      <p>Página em construção...</p>
      {/* Aqui você pode adicionar o formulário e a lógica para editar o agente com base no agentId */}
    </div>
  );
};

export default EditAgentPage;

