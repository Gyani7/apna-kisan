
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BellIcon, HomeIcon, MenuIcon, SearchIcon, ShoppingCartIcon, UsersIcon } from "lucide-react"
import { UserNav } from "@/components/common/UserNav"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
      <Link href="/feed" className="flex items-center gap-2 font-semibold">
        <MountainIcon className="h-6 w-6" />
        <span className="">Apna Kisan</span>
      </Link>
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="relative hidden w-full max-w-sm md:block">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <BellIcon className="h-6 w-6" />
        </Button>
        <UserNav />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
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
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

