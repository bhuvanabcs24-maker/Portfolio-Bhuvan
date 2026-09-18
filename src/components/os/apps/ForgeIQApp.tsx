'use client';

import React from 'react';
import ForgeIQSystemWorld from '@/components/forgeiq/ForgeIQSystemWorld';

export default function ForgeIQApp() {
  return (
    <div className="os-app-container" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="os-app-scroll-content" style={{ padding: 0 }}>
        <ForgeIQSystemWorld />
      </div>
    </div>
  );
}
