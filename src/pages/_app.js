// Arquivo para garantir que o CSS seja carregado corretamente
// Este arquivo será importado no _app.js para forçar o carregamento do CSS

import '../app/globals.css';

export default function CustomApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
