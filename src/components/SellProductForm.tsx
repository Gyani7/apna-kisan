
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SellProductForm() {
  return (
    <form className="space-y-4">
        <div>
            <Label htmlFor="product-name">Product Name</Label>
            <Input id="product-name" placeholder="e.g., Organic Wheat" />
        </div>
        <div>
            <Label htmlFor="price">Price (per Quintal)</Label>
            <Input id="price" type="number" placeholder="e.g., 2200" />
        </div>
        <div>
            <Label htmlFor="quantity">Quantity (in Quintals)</Label>
            <Input id="quantity" type="number" placeholder="e.g., 100" />
        </div>
        <div>
            <Label htmlFor="category">Category</Label>
            <Select>
                <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe your product in detail..." />
        </div>
        <div>
            <Label htmlFor="images">Upload Images</Label>
            <Input id="images" type="file" multiple />
        </div>
        <Button type="submit" className="w-full">List Product</Button>
    </form>
  );
}