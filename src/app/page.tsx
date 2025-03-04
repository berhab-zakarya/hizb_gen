// app/components/ClientComponent.tsx
"use client";

import FlipBook from '@/components/FlipBookTest';
import { ThumnSelector } from '@/components/ThumnSelector';
import { useSearchParams } from 'next/navigation';


export default function ClientComponent() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  const renderPage = () => {
    switch (page) {
      case 'flipBook':
        return <FlipBook />;
      case 'thumnSelector':
        return <ThumnSelector />;
      default:
        return <FlipBook />;
    }
  };

  return (
    <main className=''>
      {renderPage()}
    </main>
  );
}