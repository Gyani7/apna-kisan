'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, MessageCircle } from 'lucide-react';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-lg mx-auto px-4">
        {!searchOpen ? (
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              <span className="text-lg font-bold text-green-700 tracking-tight">
                Apna Kisan
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                className="p-2 rounded-full text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button
                className="p-2 rounded-full text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors"
                aria-label="Messages"
              >
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 h-14">
            <div className="flex-1 relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kisan, fasal ya jagah dhundhen..."
                className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors"
                autoFocus
              />
            </div>
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
              }}
              className="text-green-600 font-medium text-sm shrink-0"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
