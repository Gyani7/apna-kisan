import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4">
        <Input
          type="search"
          placeholder="Search posts..."
          className="flex-1 rounded-full bg-card py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Button variant="secondary" className="rounded-full">Sab</Button>
        <Button variant="ghost" className="rounded-full">Charcha</Button>
        <Button variant="ghost" className="rounded-full">Sawaal</Button>
        <Button variant="ghost" className="rounded-full">Kahani</Button>
        <Button variant="ghost" className="rounded-full">Popular</Button>
      </div>
      <div className="mt-8 text-center">
        <img src="/empty-state.svg" alt="No posts yet" className="mx-auto w-64" />
        <h2 className="mt-8 text-2xl font-bold">No posts yet</h2>
        <p className="mt-2 text-muted-foreground">Be the first to share something with the community!</p>
        <Button className="mt-6">Create Post</Button>
      </div>
    </div>
  );
}
