'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useOS } from './OSContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommandPalette from './CommandPalette';
import { Cursor, GridBackground, NoiseOverlay } from './visual';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { mode } = useOS();

  const isHomepage = pathname === '/';
  const showOSDesktop = isHomepage && mode === 'os';

  return (
    <>
      {/* Visual Foundation Layer: Noise Texture and Engineering Grid */}
      <NoiseOverlay />
      <GridBackground showScan={true} />

      {showOSDesktop ? (
        <>
          {children}
        </>
      ) : (
        <>
          <Navbar />
          <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            {children}
          </main>
          <Footer />
          <CommandPalette />
        </>
      )}
    </>
  );
}

