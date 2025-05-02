"use client"; // Adicionar se houver interatividade ou hooks no futuro

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link'; // <-- IMPORTAR LINK

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-white to-purple-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Agentes de Voz com IA para Automatizar Suas Chamadas
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 md:px-12">
            Transforme leads em clientes com chamadas automáticas realistas, 
            em voz natural, disponíveis 24h por dia.
          </p>
          
          <div className="flex flex-col items-center">
            {/* Envolver o botão com Link */}
            <Link href="/auth/signup"> 
              {/* Adicionado text-white para consistência */}
              <Button size="lg" className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                <span>Começar Grátis por 7 Dias</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            
            <p className="text-gray-500 mt-3">
              Teste Grátis. Cancele quando quiser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
