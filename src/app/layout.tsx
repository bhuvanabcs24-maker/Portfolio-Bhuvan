import type { Metadata } from 'next';
import './globals.css';
import { OSProvider } from '@/components/os/OSContext';
import AppShell from '@/components/os/AppShell';

export const metadata: Metadata = {
  title: 'Bhuvan A B | Software Engineering Portfolio | BMSCE',
  description: 'Portfolio of Bhuvan A B, Computer Science & Engineering student at BMS College of Engineering (BMSCE, Expected June 2028, CGPA: 8.08). Focused on backend engineering, full-stack systems, applied AI, and problem solving.',
  keywords: ['Bhuvan A B', 'BMSCE', 'Software Engineering', 'ForgeIQ', 'FastAPI', 'Next.js', 'CAD Parsing', 'LeetCode', 'Computer Science'],
  authors: [{ name: 'Bhuvan A B' }],
  openGraph: {
    title: 'Bhuvan A B | Software Engineering Portfolio',
    description: 'Computer Science & Engineering student at BMSCE. Builder of ForgeIQ and QWait Estimator. Backend systems, applied AI, and deterministic architecture.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <OSProvider>
          <AppShell>
            {children}
          </AppShell>
        </OSProvider>
      </body>
    </html>
  );
}
