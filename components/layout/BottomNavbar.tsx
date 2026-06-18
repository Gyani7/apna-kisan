'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Users, MessageCircle } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/market", label: "Market", icon: ShoppingCart },
  { href: "/community", label: "Community", icon: Users },
  { href: "/ai-assistant", label: "Assistant", icon: MessageCircle },
];

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t">
      <div className="container grid h-16 max-w-lg grid-cols-4 mx-auto font-medium">
        {navLinks.map((link) => {
            const isActive = !!pathname && ((pathname === "/" && link.href === "/") || (link.href !== "/" && pathname.startsWith(link.href)));
            return (
                <Link
                key={link.href}
                href={link.href}
                className={`inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 transition-colors group ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    <link.icon className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">
                        {link.label}
                    </span>
                </Link>
            )
        })}
      </div>
    </nav>
  );
}
