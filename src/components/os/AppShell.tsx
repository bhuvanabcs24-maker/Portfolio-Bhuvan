'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useOS } from './OSContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommandPalette from './CommandPalette';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { mode } = useOS();

  const isHomepage = pathname === '/';
  const showOSDesktop = isHomepage && mode === 'os';

  if (showOSDesktop) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
