/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    // Desabilitar otimizações que podem causar problemas de hidratação
    optimizeCss: false,
    optimizePackageImports: false,
  },
  // Configurações para garantir que o CSS seja carregado corretamente
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig;
