'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/market", label: "Market" },
  { href: "/community", label: "Community" },
  { href: "/schemes", label: "Schemes" },
  { href: "/ai-assistant", label: "AI Assistant" },
];

const user = {
  full_name: 'Amit Patel',
  avatar_url: 'https://i.pravatar.cc/150?u=amitp',
};

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = user; // Replace with actual auth check

  const NavLinks = () => (
    <nav className="hidden md:flex items-center space-x-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm font-medium transition-colors hover:text-primary ${pathname.startsWith(link.href) ? "text-primary" : "text-muted-foreground"}`}>
          {link.label}
        </Link>
      ))}
    </nav>
  );

  const AuthButtons = () => (
    <div className="hidden md:flex items-center space-x-2">
      <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
          <Link href="/register">Sign Up</Link>
      </Button>
    </div>
  );

  const UserMenu = () => (
    <div className="hidden md:flex">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.full_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            @{user.full_name.toLowerCase().replace(' ', '')}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );

  const MobileMenu = () => (
      <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle Menu</span>
          </Button>
          {isMenuOpen && (
              <div className="absolute top-16 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm shadow-lg md:hidden" onClick={() => setIsMenuOpen(false)}>
                  <div className="grid gap-4 p-6">
                      {navLinks.map((link) => (
                          <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground transition-colors hover:text-primary">{link.label}</Link>
                      ))}
                      <DropdownMenuSeparator />
                      {isLoggedIn ? (
                           <div className="flex items-center gap-4">
                               <Avatar className="h-10 w-10">
                                   <AvatarImage src={user.avatar_url} />
                                   <AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
                               </Avatar>
                               <div>
                                   <p className="font-medium">{user.full_name}</p>
                                   <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">View Dashboard</Link>
                               </div>
                           </div>
                      ) : (
                          <div className="grid gap-2">
                              <Button asChild><Link href="/login">Login</Link></Button>
                              <Button variant="outline" asChild><Link href="/register">Sign Up</Link></Button>
                          </div>
                      )}
                  </div>
              </div>
          )}
      </div>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Logo />
        </div>
        <div className="hidden md:flex flex-1 items-center justify-start space-x-6">
          <NavLinks />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
            {isLoggedIn ? <UserMenu /> : <AuthButtons />}
            <MobileMenu />
        </div>
      </div>
    </header>
  );
}
