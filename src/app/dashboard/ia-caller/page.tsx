'use client';

import dynamic from 'next/dynamic';

// Carrega o componente que está em components/ui/IACaller.tsx
const IACaller = dynamic(() => import('@/components/ui/IACaller'), { ssr: false });

export default function IACallerPage() {
  return <IACaller />;
}
