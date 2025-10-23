'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/icons';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-card">
      <div className="flex items-center h-16 px-6 border-b">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo className="h-6 w-6 text-primary" />
          <span className="text-lg">Diet Plan</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <TooltipProvider>
          {navLinks.map((link) => (
            <Tooltip key={link.href}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
                    {
                      'bg-primary/10 text-primary font-semibold': pathname === link.href,
                    }
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
