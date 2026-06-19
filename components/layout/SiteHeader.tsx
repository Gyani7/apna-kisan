'use client';

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/layout/MainNav";
import { UserNav } from "@/components/layout/UserNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

export function SiteHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {user ? (
              <UserNav />
            ) : (
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                Login
              </Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
