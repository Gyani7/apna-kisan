import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { BellIcon, HomeIcon, MenuIcon, SearchIcon, UsersIcon, ShoppingCartIcon, Globe, CheckCircle2, LayoutDashboard, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UserNav } from "@/components/common/UserNav"
import Logo from "@/components/Logo"
import { ThemeToggle } from "@/components/ThemeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  // Mock verification status for premium UI demonstration
  const isVerified = true;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-kisan-dark-green/80 backdrop-blur-md glass-card">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/feed" className="flex items-center space-x-2 group">
            <div className="p-1 rounded-lg bg-gradient-to-br from-kisan-gold to-kisan-gold-dark shadow-gold">
              <Logo className="h-7 w-7 text-kisan-dark-green" />
            </div>
            <span className="hidden font-bold sm:inline-block text-xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-kisan-gold group-hover:to-white transition-all duration-300">
              Apna Kisan
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 md:gap-5">
          <nav className="hidden lg:flex items-center gap-6">
            {[
              { label: "Feed", href: "/feed", icon: HomeIcon },
              { label: "Market", href: "/market", icon: ShoppingCartIcon },
              { label: "Farming", href: "/farming", icon: UsersIcon },
              { label: "Messages", href: "/messages", icon: UsersIcon },
              { label: "AI Doctor", href: "/ai-assistant", icon: Sparkles, premium: true }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-semibold flex items-center gap-1.5 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-kisan-gold after:transition-all hover:after:w-full ${
                  item.premium ? "text-kisan-gold" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative group">
<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
<Input
  className="w-full rounded-md border-white/20 bg-kisan-dark-green/50 py-2 pl-9 pr-4 text-sm text-white placeholder:text-white/60 focus:border-kisan-gold focus:bg-kisan-dark-green/80 focus:ring-kisan-gold"
  placeholder="Search..."
  type="search"
/>
</div>
</div>
<ThemeToggle />
<Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
<BellIcon className="h-5 w-5" />
<span className="sr-only">Notifications</span>
</Button>
<DropdownMenu>
<DropdownMenuTrigger asChild>
  <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
    <Globe className="h-5 w-5" />
    <span className="sr-only">Language selection</span>
  </Button>
</DropdownMenuTrigger>
<DropdownMenuContent align="end" className="bg-kisan-dark-green border-white/20 text-white">
  <DropdownMenuItem className="hover:bg-white/10">English</DropdownMenuItem>
  <DropdownMenuItem className="hover:bg-white/10">हिन्दी</DropdownMenuItem>
  <DropdownMenuItem className="hover:bg-white/10">ਪੰਜਾਬੀ</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
<UserNav />
<Sheet>
<SheetTrigger asChild>
  <Button className="lg:hidden" size="icon" variant="ghost">
    <MenuIcon className="h-6 w-6" />
    <span className="sr-only">Toggle navigation menu</span>
  </Button>
</SheetTrigger>
<SheetContent className="w-full max-w-sm bg-kisan-dark-green/95 border-l-white/20 text-white" side="right">
  <div className="p-4">
    <Link href="/feed" className="flex items-center space-x-2 mb-8">
      <div className="p-1 rounded-lg bg-gradient-to-br from-kisan-gold to-kisan-gold-dark shadow-gold">
        <Logo className="h-7 w-7 text-kisan-dark-green" />
      </div>
      <span className="font-bold text-lg">Apna Kisan</span>
    </Link>
    <nav className="flex flex-col space-y-2">
      {[
        { label: "Feed", href: "/feed", icon: HomeIcon },
        { label: "Market", href: "/market", icon: ShoppingCartIcon },
        { label: "Farming", href: "/farming", icon: UsersIcon },
        { label: "Messages", href: "/messages", icon: UsersIcon },
        { label: "AI Doctor", href: "/ai-assistant", icon: Sparkles, premium: true },
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      ].map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center gap-3 rounded-md p-3 text-base font-medium transition-colors ${
            item.premium ? "text-kisan-gold" : "text-white/80 hover:bg-white/10 hover:text-white"
          }`}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  </div>
</SheetContent>
</Sheet>
</div>
</div>
</header>
);
}