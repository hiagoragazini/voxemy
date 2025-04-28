// Arquivo para garantir que o documento HTML tenha a estrutura correta
// Este arquivo será usado pelo Next.js para renderizar a estrutura básica do HTML

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Forçar carregamento do CSS */}
        <link rel="stylesheet" href="/_next/static/css/app/globals.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
