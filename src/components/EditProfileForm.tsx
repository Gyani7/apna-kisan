
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EditProfileForm() {
  return (
    <form className="space-y-4">
        <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Vijay Kumar" />
        </div>
        <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" defaultValue="+91-9876543210" />
        </div>
        <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" defaultValue="Jaipur, Rajasthan" />
        </div>
        <Button type="submit" className="w-full">Save Changes</Button>
    </form>
  );
}