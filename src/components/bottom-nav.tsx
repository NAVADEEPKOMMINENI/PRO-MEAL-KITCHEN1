'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/models/data';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t z-20">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-primary/5 group',
              {
                'text-primary': pathname === link.href,
                'text-muted-foreground': pathname !== link.href,
              }
            )}
          >
            <link.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
