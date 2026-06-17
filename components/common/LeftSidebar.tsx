
import Link from "next/link"
import { HomeIcon, ShoppingCartIcon, UsersIcon, BotIcon, SettingsIcon, BarChart3Icon, NewspaperIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function LeftSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
       <nav className="flex flex-col gap-2">
          <Link
            href="/feed"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
          >
            <HomeIcon className="h-5 w-5" />
            Feed
          </Link>
          <Link
            href="/market"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Marketplace
          </Link>
          <Link
            href="/community"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
          >
            <UsersIcon className="h-5 w-5" />
            Community
          </Link>
          <Link
            href="/ai-assistant"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
          >
            <BotIcon className="h-5 w-5" />
            AI Assistant
          </Link>
          <Link
            href="/schemes"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
          >
            <NewspaperIcon className="h-5 w-5" />
            Govt. Schemes
             <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">3</Badge>
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <div className="p-4 rounded-lg bg-muted/70">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3Icon className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold">My Stats</h3>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>Profile Views: <strong>2,435</strong></p>
              <p>Post Likes: <strong>1,876</strong></p>
              <p>Marketplace Sales: <strong>$1,200</strong></p>
            </div>
            
          </div>
           <Link
              href="/profile/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <SettingsIcon className="h-5 w-5" />
              Settings
          </Link>
        </div>
    </aside>
  )
}
