"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import Link from 'next/link';

const Header = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-purple-700 cursor-pointer">Voxemy</h1>
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <Menu />
            </Button>
            
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col gap-2">
                <Link href="/auth/login" className="w-full">
                  <Button variant="outline" className="w-full">Entrar</Button>
                </Link>
                {/* Link mobile Comece Grátis - ALTERADO */}
                <Link href="/#pricing" className="w-full"> 
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Comece Grátis
                  </Button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            {/* Link desktop Comece Grátis - ALTERADO */}
            <Link href="/#pricing"> 
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Comece Grátis
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
