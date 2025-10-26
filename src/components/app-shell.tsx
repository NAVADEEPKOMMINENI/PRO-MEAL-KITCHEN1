'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import BottomNav from '@/components/bottom-nav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const authPages = ['/login', '/signup'];
  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage) {
    return (
      <main
        className="flex min-h-screen flex-col items-center justify-center p-4"
        suppressHydrationWarning={true}
      >
        {children}
      </main>
    );
  }

  return (
    <div className="flex h-screen w-full" suppressHydrationWarning={true}>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
