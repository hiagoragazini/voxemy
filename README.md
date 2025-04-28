# Voxemy AI - MVP

Este é o MVP (Minimum Viable Product) do Voxemy AI, uma plataforma de IA Caller para automatizar chamadas telefônicas com agentes inteligentes.

## Funcionalidades

- Cadastro de usuário (Nome, Email, Senha)
- Login de usuário
- Dashboard inicial com boas-vindas e visualização de agentes
- Criação de agentes com personalidade, conhecimento e missão personalizados
- Autenticação e armazenamento de dados com Firebase

## Tecnologias Utilizadas

- Next.js
- TailwindCSS
- Firebase (Autenticação e Firestore)
- Design responsivo para desktop e mobile

## Configuração do Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (recomendado) ou npm

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/voxemy-mvp.git
cd voxemy-mvp
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione suas configurações do Firebase:
```
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

5. Acesse a aplicação em `http://localhost:3000`

## Implantação

### Vercel (Recomendado para Next.js)

1. Faça o upload do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em "New Project" e importe o repositório
4. Configure as variáveis de ambiente do Firebase
5. Clique em "Deploy"

### Netlify (Alternativa)

1. Faça o upload do código para um repositório GitHub
2. Acesse [netlify.com](https://netlify.com) e faça login
3. Clique em "New site from Git" e selecione o repositório
4. Configure o comando de build: `pnpm build`
5. Configure o diretório de publicação: `.next`
6. Configure as variáveis de ambiente do Firebase
7. Clique em "Deploy site"

## Estrutura do Projeto

- `/src/app/auth/signup` - Página de cadastro
- `/src/app/auth/login` - Página de login
- `/src/app/dashboard` - Dashboard do usuário
- `/src/app/create-agent` - Página de criação de agente
- `/src/components` - Componentes reutilizáveis
- `/src/lib` - Utilitários e configurações

## Paleta de Cores

- Azul escuro: #0F2D5A
- Azul claro: #E6F0FF
- Branco: #FFFFFF
- Texto: #333333
