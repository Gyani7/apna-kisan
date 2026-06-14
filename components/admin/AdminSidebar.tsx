'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tractor, Wheat, HelpCircle, BarChart2 } from 'lucide-react';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/schemes', label: 'Schemes', icon: Tractor },
  { href: '/admin/crops', label: 'Crops', icon: Wheat },
  { href: '/admin/qna', label: 'Q&A', icon: HelpCircle },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <div className="text-2xl font-bold mb-10">Apna Kisan</div>
      <nav>
        <ul>
          {menuItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={label}>
                <Link href={href}>
                  <div
                    className={`flex items-center p-3 my-2 rounded-lg cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-green-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}>
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{label}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
