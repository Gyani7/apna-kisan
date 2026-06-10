import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Store, 
  Flag, 
  LogOut, 
  Menu,
  ShieldCheck
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Questions', href: '/admin/questions', icon: MessageSquare },
  { name: 'Marketplace', href: '/admin/marketplace', icon: Store },
  { name: 'Reports', href: '/admin/reports', icon: Flag },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-slate-900 text-slate-300">
        <div className="p-6 flex items-center gap-2 border-b border-slate-800">
          <ShieldCheck className="text-brand-500 w-8 h-8" />
          <span className="font-bold text-xl text-white tracking-tight">AK ADMIN</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-slate-800 hover:text-white group"
              >
                <Icon className="w-5 h-5 group-hover:text-brand-400" />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-danger-400 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-slate-600">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-slate-800 uppercase tracking-wider">
              APNA KISAN V2.5 ENTERPRISE
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-medium text-slate-900">System Admin</span>
              <span className="text-xs text-brand-600 font-bold uppercase">Root Access</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-brand-500 flex items-center justify-center text-slate-700 font-bold">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}