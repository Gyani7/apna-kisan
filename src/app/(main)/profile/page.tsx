
'use client';

import { StickyHeader } from "@/components/home/StickyHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPosts } from "@/components/profile/UserPosts";
import { Camera, LogOut, Settings, Shield, User, Bell } from "lucide-react";


export default function ProfilePage() {

  const user = {
    name: 'Vijay Kumar',
    phone: '+91-9876543210',
    location: 'Jaipur, Rajasthan',
    image: '/placeholder-user.jpg'
  }

  const menuItems = [
    { icon: User, text: 'Edit Profile' },
    { icon: Bell, text: 'Notifications' },
    { icon: Settings, text: 'Settings' },
    { icon: Shield, text: 'Privacy Policy' },
  ];

  return (
    <div className="dark flex flex-col h-screen">
      <StickyHeader />
      <div className="p-4 flex-grow overflow-y-auto">
        <div className="relative w-fit mx-auto">
          <Avatar className="w-32 h-32 border-4 border-primary">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="icon" className="absolute bottom-1 right-1 rounded-full">
            <Camera className="w-5 h-5" />
          </Button>
        </div>

        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.phone}</p>
          <p className="text-muted-foreground text-sm">{user.location}</p>
        </div>

        <div className="mt-8 space-y-2">
          {menuItems.map((item, index) => (
            <Button key={index} variant="ghost" className="w-full justify-start text-lg p-6 flex gap-4 items-center">
              <item.icon className="w-6 h-6 text-primary" />
              <span>{item.text}</span>
            </Button>
          ))}
        </div>

        <UserPosts />

        <div className="mt-8">
           <Button variant="destructive" className="w-full text-lg p-6 flex gap-4 items-center">
             <LogOut className="w-6 h-6" />
             <span>Logout</span>
           </Button>
        </div>

      </div>
    </div>
  );
}
