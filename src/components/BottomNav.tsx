
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background/80 backdrop-blur-sm border-t border-border/40">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {siteConfig.mainNav.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons];
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium tracking-wide">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
