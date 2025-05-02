
import React from "react";

const benefitsData = [
  {
    icon: "🤖",
    title: "Crie Agentes Inteligentes",
    description: "Configure scripts, tom de voz e personalidade. Seu vendedor ideal, 100% automático."
  },
  {
    icon: "🔊",
    title: "Vozes Humanas em Tempo Real",
    description: "Tecnologia ElevenLabs integrada: vozes naturais, regionalizadas e com sotaques ajustáveis."
  },
  {
    icon: "📊",
    title: "Resultados Visíveis",
    description: "Visualize quem atendeu, quanto tempo ouviu e o que converteu. Tudo com métricas em tempo real."
  }
];

const Benefits = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefitsData.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
