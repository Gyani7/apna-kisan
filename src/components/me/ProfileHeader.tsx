'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileHeader() {
    return (
        <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-gray-400">@johndoe</p>
            </div>
        </div>
    )
}