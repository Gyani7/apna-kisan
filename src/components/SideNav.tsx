'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, Newspaper, Wheat, Tractor, Users, Settings, Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
// import { getUnreadNotificationsCount } from '@/lib/user';
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/marketplace', label: 'Marketplace', icon: Tractor },
  { href: '/farming', label: 'Farming', icon: Wheat },
]

export function SideNav() {
  const pathname = usePathname()
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // const fetchNotifications = async () => {
    //   const count = await getUnreadNotificationsCount();
    //   setNotificationCount(count);
    // };
    // fetchNotifications();
  }, []);

  return (
    <nav className="flex flex-col h-full bg-card border-r text-card-foreground">
      <div className="p-4 mb-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Tractor className="h-8 w-8 text-primary" />
          <span>Apna Kisan</span>
        </Link>
      </div>
      <div className="flex-1 space-y-2 px-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              { 'bg-primary/10 text-primary': pathname === link.href }
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
      <div className="p-4 mt-auto border-t">
        <div className="space-y-2">
        <Link
            href="/notifications"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              { 'bg-primary/10 text-primary': pathname === '/notifications' }
            )}
          >
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            {notificationCount > 0 && <Badge className="ml-auto">{notificationCount}</Badge>}
          </Link>
          <Link
            href="/settings"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              { 'bg-primary/10 text-primary': pathname === '/settings' }
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
