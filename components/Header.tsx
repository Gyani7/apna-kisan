'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Bell, Moon, Sun, LogIn, X } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useAuth } from '@/components/AuthProvider';
import { supabase, getNotifications, markNotificationsRead, getUnreadCount } from '@/lib/supabase';
import type { NotificationRow } from '@/lib/database.types';
import { timeAgo } from '@/lib/types';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<(NotificationRow & { actor?: { username: string; full_name: string | null; avatar_url: string | null } })[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    getUnreadCount(user.id).then(setUnreadCount);

    const channel = supabase
      .channel('notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, () => {
        setUnreadCount((c) => c + 1);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function openNotifications() {
    if (!user) return;
    setNotifOpen(!notifOpen);
    if (!notifOpen) {
      const notifs = await getNotifications(user.id);
      setNotifications(notifs ?? []);
      await markNotificationsRead(user.id);
      setUnreadCount(0);
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-5xl mx-auto px-4">
        {!searchOpen ? (
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm">
                <span className="text-white text-lg">&#127806;</span>
              </div>
              <div className="leading-tight">
                <h1 className="text-lg font-bold text-brand-700 dark:text-brand-400">Apna Kisan</h1>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Kisan Se Kisan Tak</p>
              </div>
            </Link>

            <div className="flex items-center gap-1">
              <button onClick={() => setSearchOpen(true)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors" aria-label="Search">
                <Search size={20} />
              </button>

              <div ref={notifRef} className="relative">
                <button onClick={openNotifications} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors relative" aria-label="Notifications">
                  <Bell size={20} />
                  {unreadCount > 0 && <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">{unreadCount > 9 ? '9+' : unreadCount}</span>}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-12 w-80 card shadow-float animate-slide-down overflow-hidden">
                    <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                      <span className="font-semibold text-sm">Notifications</span>
                      <button onClick={() => setNotifOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><X size={14} /></button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-center text-sm text-gray-400 py-6">Koi notification nahi</p>
                      ) : (
                        notifications.map((n) => (
                          <div key={n.id} className="px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-50 dark:border-gray-700/50">
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                              <span className="font-semibold">{n.actor?.full_name ?? n.actor?.username ?? 'Koi'}</span>
                              {' '}{n.type === 'like' ? 'ne like kiya' : n.type === 'comment' ? 'ne comment kiya' : n.type === 'follow' ? 'ne follow kiya' : 'ne mention kiya'}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{timeAgo(n.created_at)}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors" aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {!user && (
                <Link href="/auth" className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors" aria-label="Login">
                  <LogIn size={20} />
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 h-14">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Fasal, rog, tractor ya kisan dhundhen..." className="input-field pl-9" autoFocus />
            </div>
            <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="text-brand-600 font-medium text-sm shrink-0">Cancel</button>
          </div>
        )}
      </div>
    </header>
  );
}
