import React from 'react';
import EngineeringArchive from '@/components/projects/EngineeringArchive';

export const metadata = {
  title: 'Engineering Archive | Bhuvan A B',
  description: 'Verified engineering implementations presented as production artifacts: ForgeIQ (Manufacturing Intelligence System) and QWait Estimator (Queue Management System).',
};

export default function ProjectsPage() {
  return <EngineeringArchive />;
}
