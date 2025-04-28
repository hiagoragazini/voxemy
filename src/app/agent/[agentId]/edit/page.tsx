import React from 'react';

// Definindo o tipo esperado para as props da página dinâmica seguindo o padrão Next.js 13
type PageProps = {
  params: { agentId: string };
  searchParams?: { [key: string]: string | string[] | undefined }; // searchParams é opcional
};

// Usando React.FC para tipar o componente funcional
const EditAgentPage: React.FC<PageProps> = ({ params }) => {
  // Note que searchParams não está sendo usado aqui, mas está no tipo por conformidade
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Agente: {params.agentId}</h1>
      <p>Página em construção...</p>
      {/* Aqui você pode adicionar o formulário e a lógica para editar o agente com base no agentId */}
    </div>
  );
};

export default EditAgentPage;
