'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { navLinks } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = navLinks.find((link) => link.href === pathname);
  const avatarImage = PlaceHolderImages.find((img) => img.id === 'avatar');
  const { user } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className="flex h-16 items-center border-b bg-card px-4 md:px-6 z-10 shrink-0">
      <div className="md:hidden">
        <h1 className="text-lg font-semibold">{currentPage?.label || 'Diet Plan'}</h1>
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
                  {user.photoURL ? (
                    <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                  ) : (
                    avatarImage && (
                      <AvatarImage
                        src={avatarImage.imageUrl}
                        alt="User avatar"
                        data-ai-hint={avatarImage.imageHint}
                      />
                    )
                  )}
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
