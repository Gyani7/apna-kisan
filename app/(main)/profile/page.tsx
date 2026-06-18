'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCard } from "@/components/community/PostCard";
import { ProductCard } from "@/components/market/ProductCard";

const user = {
  full_name: 'Amit Patel',
  username: 'amitp',
  avatar_url: 'https://i.pravatar.cc/150?u=amitp',
};

const enrolledSchemes = [
  {
    id: 1,
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'A crop insurance scheme to protect against crop failure.',
  },
  {
    id: 2,
    name: 'Kisan Credit Card',
    description: 'A credit scheme for farmers to meet their cultivation needs.',
  },
];

const userPosts = [
  {
    id: 1,
    content: 'Just harvested my first batch of organic tomatoes! So proud of the result. 🍅',
    author: user,
    created_at: '2024-07-20T10:00:00.000Z',
  },
];

const userProducts = [
  {
    id: 1,
    name: 'Fresh Tomatoes',
    price: 50,
    image: 'https://images.unsplash.com/photo-1588695039912-a85ec34a727c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user.full_name}</h1>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">My Posts</h2>
          <div>
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">My Schemes</h2>
          <div className="space-y-4">
            {enrolledSchemes.map((scheme) => (
              <Card key={scheme.id}>
                <CardHeader>
                  <CardTitle>{scheme.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{scheme.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">My Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {userProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
