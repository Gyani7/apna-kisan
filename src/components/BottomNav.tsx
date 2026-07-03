'use client';
import { Home, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", icon: Home },
    { href: "/new-workout", icon: Plus },
    { href: "/me", icon: User },
];

export function BottomNav() {
    const pathname = usePathname();
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1E293B]/60 backdrop-blur-md h-20 flex justify-around items-center">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link key={item.href} href={item.href} className={`p-3 rounded-full ${isActive ? 'bg-blue-500' : ''}`}>
                        <item.icon size={24} />
                    </Link>
                )
            })}
        </div>
    )
}