"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/MainNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { signOut } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogIn } from "lucide-react";

export function SiteHeader() {
  const { user, loading } = useAuth();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.photoURL!} alt={user.displayName!} />
                      <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                    </Avatar>
                    <button onClick={signOut}>Sign out</button>
                  </div>
                ) : (
                  <Link href="/login" className={cn(buttonVariants({ size: "sm" }), "gap-1")}>
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
