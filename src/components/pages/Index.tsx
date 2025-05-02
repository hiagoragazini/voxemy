// Conteúdo CORRETO para src/components/pages/Index.tsx
'use client'; 

import { Button } from "@/components/ui/button"; 
import { Card } from "@/components/ui/card"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { ArrowRight, Check } from "lucide-react"; 
import Header from "@/components/Header"; 
import Hero from "@/components/Hero"; 
import Benefits from "@/components/Benefits"; 
import DemoSection from "@/components/DemoSection"; 
import PricingSection from "@/components/PricingSection"; 
import Footer from "@/components/Footer"; 

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Benefits />
        <DemoSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

