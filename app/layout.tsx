import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      {/* Removida a tag <head /> explícita */}
      <body>{children}</body>
    </html>
  );
}

