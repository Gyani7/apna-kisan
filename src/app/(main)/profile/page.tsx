import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PostCard from "@/components/community/PostCard";

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 border-4 border-primary">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="text-center">
                <h1 className="text-2xl font-bold">Username</h1>
                <p className="text-muted-foreground">@username</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-center">
                    <div className="font-bold">1.2k</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">450</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                </div>
            </div>
            <Button>Edit Profile</Button>
        </div>
        <Tabs defaultValue="posts" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts">My Posts</TabsTrigger>
                <TabsTrigger value="saved">Saved Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
                <div className="mt-8 space-y-6">
                    <PostCard />
                    <PostCard />
                </div>
            </TabsContent>
            <TabsContent value="saved">
                <div className="mt-8 space-y-6">
                    <PostCard />
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
