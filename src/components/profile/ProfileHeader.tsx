'use client';
import { Settings } from 'lucide-react';

export function ProfileHeader() {
    return (
        <header className="p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Hi, John</h1>
            <Settings className="cursor-pointer" />
        </header>
    )
}