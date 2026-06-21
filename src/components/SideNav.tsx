'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Newspaper, Wheat, Tractor, Users, Settings, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getUnreadNotificationsCount } from '@/lib/user';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/feed', icon: Home, label: 'Feed' },
  { href: '/news', icon: Newspaper, label: 'News' },
  { href: '/market', icon: Wheat, label: 'Market' },
  { href: '/schemes', icon: Tractor, label: 'Schemes' },
  { href: '/community', icon: Users, label: 'Community' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function SideNav() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const count = await getUnreadNotificationsCount();
      setUnreadCount(count);
    };

    fetchUnreadCount();
    // Refresh count every minute
    const interval = setInterval(fetchUnreadCount, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="flex flex-col h-full bg-background border-r">
      <div className="p-4">
        <Link href="/" className="flex items-center space-x-2">
          <Tractor className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">Apna Kisan</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname && pathname.startsWith(link.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t">
        <Link
          href="/notifications"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
        >
          <Bell className="h-5 w-5" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="default" className="ml-auto">
              {unreadCount}
            </Badge>
          )}
        </Link>
      </div>
    </nav>
  );
}
