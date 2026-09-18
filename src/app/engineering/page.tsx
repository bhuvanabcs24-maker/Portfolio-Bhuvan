import React from 'react';
import InteractiveEngineeringLab from '@/components/engineering/InteractiveEngineeringLab';

export const metadata = {
  title: 'Engineering Lab — Technical Systems & Architecture | Bhuvan A B',
  description: 'Interactive technical laboratory inspecting system architecture, ADRs (ADR-001 to ADR-014), AI evaluation consoles, reusable engineering patterns, retrospectives, and technical writing notes.',
};

export default function EngineeringPage() {
  return <InteractiveEngineeringLab />;
}
