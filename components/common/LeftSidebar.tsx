
import Link from "next/link"
import { HomeIcon, ShoppingCartIcon, UsersIcon, BotIcon, SettingsIcon } from "lucide-react"

export function LeftSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background p-6 md:flex">
      <nav className="flex flex-col gap-4">
        <Link
          href="/feed"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <HomeIcon className="h-4 w-4" />
          Feed
        </Link>
        <Link
          href="/market"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <ShoppingCartIcon className="h-4 w-4" />
          Marketplace
        </Link>
        <Link
          href="/community"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <UsersIcon className="h-4 w-4" />
          Community
        </Link>
        <Link
          href="/ai-assistant"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <BotIcon className="h-4 w-4" />
          AI Assistant
        </Link>
      </nav>
      <div className="mt-auto">
        <Link
            href="/profile/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <SettingsIcon className="h-4 w-4" />
            Settings
        </Link>
      </div>
    </aside>
  )
}
