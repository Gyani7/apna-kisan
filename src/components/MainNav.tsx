'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Logo } from "./icons";
import { NavItem } from "@/types/nav";
import { UserAccountNav } from "./UserAccountNav";
import { useModal } from "@/components/Providers";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const { data: session } = useSession();
  const { showPremiumModal } = useModal();

  const protectedRoutes = ['/dashboard/farmer'];

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Logo className="h-6 w-6" />
        <span className="inline-block font-bold">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) => {
              const isProtected = protectedRoutes.includes(item.href || '');
              if (isProtected && !session) {
                return (
                  <button
                    key={index}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground cursor-pointer",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                    onClick={showPremiumModal}
                  >
                    {item.title}
                  </button>
                );
              }
              return (
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
              )
            }
          )}
        </nav>
      ) : null}
      <div className="flex flex-1 items-center justify-end space-x-4">
        <nav className="flex items-center space-x-1">
          {session ? (
            <UserAccountNav />
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
