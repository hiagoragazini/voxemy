
import React from "react";
import { Card } from "@/components/ui/card";

const DemoSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-purple-600">Veja em ação</span> como funciona
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Dashboard mockup */}
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-500">dashboard.voxemy.com</div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium text-lg mb-3">Agente em conversação</h3>
                  <div className="space-y-3">
                    <Card className="p-3 bg-purple-50 border-purple-200">
                      <p className="text-sm"><span className="font-semibold">Agente Maria:</span> Olá! Estou ligando da Voxemy para falar sobre nossa solução de automação...</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-xs text-gray-500">Ao vivo</span>
                      </div>
                    </Card>
                    
                    <Card className="p-3 bg-gray-100">
                      <p className="text-sm"><span className="font-semibold">Cliente:</span> Interessante, mas quanto custa?</p>
                    </Card>
                    
                    <Card className="p-3 bg-purple-50 border-purple-200">
                      <p className="text-sm"><span className="font-semibold">Agente Maria:</span> Temos planos a partir de R$197 por mês, com teste grátis de 7 dias...</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500">12:42</span>
                        <span className="text-xs text-purple-600">ElevenLabs Voice</span>
                      </div>
                    </Card>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="font-medium text-lg mb-2">Métricas em tempo real</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-3">
                        <div className="text-sm text-gray-500">Chamadas hoje</div>
                        <div className="text-2xl font-bold">124</div>
                      </Card>
                      <Card className="p-3">
                        <div className="text-sm text-gray-500">Taxa de conversão</div>
                        <div className="text-2xl font-bold text-green-600">32%</div>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Agentes ativos</h3>
                    <Card className="p-3">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Maria (Vendas)</div>
                        <div className="text-green-600 text-sm">8 conversões hoje</div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
