'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { navLinks, userProfileData } from '@/models/data';
import { Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Mock authentication state
const useMockAuth = () => {
  return {
    user: {
      displayName: userProfileData.name,
      email: userProfileData.email,
    },
    isUserLoading: false,
  };
};


export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = navLinks.find((link) => link.href === pathname);
  const { user } = useMockAuth();

  const handleLogout = async () => {
    // In a real app, this would clear the session/token
    router.push('/login');
  };

  return (
    <header className="flex h-16 items-center border-b bg-card px-4 md:px-6 z-10 shrink-0">
      <div className="md:hidden">
        <h1 className="text-lg font-semibold">{currentPage?.label || 'DietPlan'}</h1>
      </div>
      <div className="hidden md:flex w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search meals, restaurants..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-[280px] lg:w-[400px]"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
