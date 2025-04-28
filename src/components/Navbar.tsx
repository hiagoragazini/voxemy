'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-utils';

export default function Navbar() {
  const { userInfo, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo e nome */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#0F2D5A]">Voxemy</span>
              <span className="ml-1 text-xs bg-[#E6F0FF] text-[#0F2D5A] px-2 py-0.5 rounded-full">AI</span>
            </Link>
          </div>

          {/* Links de navegação - visíveis apenas em desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {userInfo && (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-[#0F2D5A]">
                  Dashboard
                </Link>
                <Link href="/create-agent" className="text-gray-600 hover:text-[#0F2D5A]">
                  Criar Agente
                </Link>
              </>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex items-center space-x-4">
            {!loading && (
              <>
                {userInfo ? (
                  <>
                    {/* Perfil do usuário - visível apenas em desktop */}
                    <div className="hidden md:flex items-center">
                      <div className="relative group">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-[#0F2D5A] focus-visible">
                          <span>{userInfo.displayName}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E6F0FF]">
                            Meu Perfil
                          </Link>
                          <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E6F0FF]">
                            Configurações
                          </Link>
                          <button 
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#E6F0FF]"
                          >
                            Sair
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Botão de menu mobile */}
                    <button 
                      onClick={toggleMobileMenu}
                      className="md:hidden text-gray-600 hover:text-[#0F2D5A] focus-visible"
                      aria-label="Menu"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="text-gray-600 hover:text-[#0F2D5A]">
                      Login
                    </Link>
                    <Link href="/auth/signup" className="btn-primary">
                      Cadastre-se
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'} md:hidden`}>
        <div className="mobile-menu-header">
          <div className="flex items-center">
            <span className="text-xl font-bold text-[#0F2D5A]">Voxemy</span>
            <span className="ml-1 text-xs bg-[#E6F0FF] text-[#0F2D5A] px-2 py-0.5 rounded-full">AI</span>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-[#0F2D5A] focus-visible"
            aria-label="Fechar menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mobile-menu-content">
          {userInfo && (
            <>
              <div className="flex items-center space-x-3 p-4 bg-[#E6F0FF] rounded-lg mb-4">
                <div>
                  <div className="font-medium text-[#0F2D5A]">{userInfo.displayName}</div>
                  <div className="text-xs text-gray-500">{userInfo.email}</div>
                </div>
              </div>
              
              <Link 
                href="/dashboard" 
                className="block py-2 px-4 text-gray-600 hover:bg-[#E6F0FF] rounded-md"
                onClick={toggleMobileMenu}
              >
                Dashboard
              </Link>
              <Link 
                href="/create-agent" 
                className="block py-2 px-4 text-gray-600 hover:bg-[#E6F0FF] rounded-md"
                onClick={toggleMobileMenu}
              >
                Criar Agente
              </Link>
              <Link 
                href="/profile" 
                className="block py-2 px-4 text-gray-600 hover:bg-[#E6F0FF] rounded-md"
                onClick={toggleMobileMenu}
              >
                Meu Perfil
              </Link>
              <Link 
                href="/settings" 
                className="block py-2 px-4 text-gray-600 hover:bg-[#E6F0FF] rounded-md"
                onClick={toggleMobileMenu}
              >
                Configurações
              </Link>
              <button 
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
                className="block w-full text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded-md mt-4"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
