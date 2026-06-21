'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, ShoppingCartIcon, UsersIcon, Bot, SettingsIcon, BarChart3Icon, NewspaperIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/feed", label: "Feed", icon: HomeIcon },
  { href: "/market", label: "Marketplace", icon: ShoppingCartIcon },
  { href: "/community", label: "Community", icon: UsersIcon },
  { href: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { href: "/schemes", label: "Govt. Schemes", icon: NewspaperIcon, badge: "3" },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
      <div className="flex flex-col gap-2">
        <p className="px-3 py-2 text-xs font-semibold text-muted-foreground">Main Menu</p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
              pathname === item.href && "text-primary bg-muted"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
            {item.badge && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-4">
         <div className="p-4 rounded-lg bg-muted/70 border">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3Icon className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold">My Stats</h3>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="flex justify-between"><span>Profile Views:</span> <strong>2,435</strong></p>
              <p className="flex justify-between"><span>Post Likes:</span> <strong>1,876</strong></p>
              <p className="flex justify-between"><span>Market Sales:</span> <strong>$1,200</strong></p>
            </div>
          </div>
        <div className="flex flex-col gap-2">
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground">User</p>
           <Link
              href="/profile/settings"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                pathname === "/profile/settings" && "text-primary bg-muted"
              )}
            >
              <SettingsIcon className="h-5 w-5" />
              Settings
          </Link>
        </div>
      </div>
    </aside>
  )
}
