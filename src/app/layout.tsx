import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppShell from '@/components/app-shell';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'Diet Plan - Your Healthy Meal Companion',
  description: 'Discover healthy meals, create custom plans, and achieve your fitness goals with Diet Plan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <AppShell>{children}</AppShell>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
