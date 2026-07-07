'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CreatePost() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <p className="text-muted-foreground">Login karein post karne ke liye</p>
          </div>
        </div>
        <Tabs defaultValue="charcha" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="charcha">Charcha</TabsTrigger>
            <TabsTrigger value="sawaal">Sawaal</TabsTrigger>
            <TabsTrigger value="kahani">Kahani</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
}
