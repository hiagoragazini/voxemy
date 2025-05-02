"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from 'next/link';

const pricingPlans = [
  {
    name: "Starter",
    idealFor: "Pequenos negócios e testes iniciais",
    price: "R$197",
    features: [
      "Acesso completo à plataforma",
      "Criação ilimitada de agentes",
      "Vozes premium com IA",
      "Relatórios de desempenho"
    ],
    signupLink: "/auth/signup?plan=starter" // Ou deixe vazio/remova se não for usar
  },
  {
    name: "Profissional",
    idealFor: "Equipes de vendas com alto volume",
    price: "R$497",
    features: [
      "Acesso completo à plataforma",
      "Criação ilimitada de agentes",
      "Vozes premium com IA",
      "Relatórios de desempenho",
      "Prioridade no suporte",
      "Integrações avançadas"
    ],
    highlight: true,
    signupLink: "/auth/signup?plan=professional" // Ou deixe vazio/remova se não for usar
  },
  {
    name: "Enterprise",
    idealFor: "Agências, infoprodutores e escalar",
    price: "R$997",
    features: [
      "Acesso completo à plataforma",
      "Criação ilimitada de agentes",
      "Vozes premium com IA",
      "Relatórios de desempenho",
      "Suporte dedicado 24/7",
      "API personalizada",
      "Onboarding VIP"
    ],
    signupLink: "/auth/signup?plan=enterprise" // Ou deixe vazio/remova se não for usar
  }
];

const PricingSection = () => {
  return (
    <section className="py-16 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Planos & Preços</h2>
          <p className="text-xl text-gray-600">
            Teste grátis de 7 dias incluso em qualquer plano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden border flex flex-col ${
                plan.highlight 
                ? "border-purple-500 shadow-lg shadow-purple-100" 
                : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <div className="bg-purple-600 text-white text-center py-2 text-sm font-medium">
                  Mais Popular
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.idealFor}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/mês</span>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Botões individuais dos planos */}
                <Link href={plan.signupLink || "/auth/signup"} className="mt-auto">
                  <Button 
                    className={`w-full text-white ${
                      plan.highlight 
                      ? "bg-purple-600 hover:bg-purple-700" 
                      : "bg-gray-800 hover:bg-gray-900"
                    }`}
                  >
                    Começar grátis
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
           {/* Botão final apontando para a seção de preços */}
          <Link href="/#pricing"> 
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8">
              🎉 Começar agora e testar grátis por 7 dias
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
