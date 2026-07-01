
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, User, Sun, Moon } from "lucide-react";

export function StickyHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 py-3 bg-background/80 backdrop-blur-lg border-b">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Apna Kisan</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Input type="search" placeholder="Search..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Sun className="w-6 h-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute w-6 h-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}
