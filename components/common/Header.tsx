
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { BellIcon, HomeIcon, MenuIcon, SearchIcon, UsersIcon, ShoppingCartIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UserNav } from "@/components/common/UserNav"
import Logo from "@/components/Logo"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/feed" className="flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block text-lg">Apna Kisan</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/feed"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Feed
            </Link>
            <Link
              href="/market"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Marketplace
            </Link>
            <Link
              href="/community"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Community
            </Link>
            <Link
              href="/ai-assistant"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              AI Assistant
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
           <div className="relative w-full max-w-sm md:block hidden">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for anything..." className="pl-8" />
          </div>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full">
            <BellIcon className="h-6 w-6" />
            <span className="sr-only">Notifications</span>
          </Button>
          <UserNav />
        
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden"
                size="icon"
              >
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                 <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Logo className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Apna Kisan</span>
                </Link>
                <Link
                  href="/feed"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <HomeIcon className="h-5 w-5" />
                  Feed
                </Link>
                <Link
                  href="/market"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Marketplace
                </Link>
                <Link
                  href="/community"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <UsersIcon className="h-5 w-5" />
                  Community
                </Link>
                 <Link
                  href="/ai-assistant"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z"/></svg>
                  AI Assistant
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
