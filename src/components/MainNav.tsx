
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "./Icons";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.Leaf className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <div className="relative w-full max-w-sm items-center">
            <Input
                type="text"
                placeholder="Search for farmers, villages, or posts..."
                className="w-full pl-10 rounded-full bg-muted/50 border-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icons.Search className="h-5 w-5 text-muted-foreground" />
            </div>
        </div>
      </nav>
    </div>
  );
}
