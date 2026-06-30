
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';

interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
}

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 shrink-0 sticky top-0 h-screen ">
      <div className="flex items-center h-20 px-6">
        <Icons.Leaf />
        <span className="ml-3 text-xl font-bold text-primary">{siteConfig.name}</span>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-3">
        {siteConfig.sidebarNav.map((item: NavItem) => {
          const Icon = Icons[item.icon];
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              )}
            >
              <Icon className={cn("w-6 h-6 mr-4", isActive ? "text-primary" : "text-muted-foreground/80")} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
       <div className="px-4 py-6">
            <Button size="lg" className="w-full premium-button rounded-full">
                <Icons.Plus className="w-5 h-5 mr-2" />
                Create Post
            </Button>
        </div>
    </div>
  );
}
