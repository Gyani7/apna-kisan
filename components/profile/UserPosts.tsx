import { PostList } from "@/components/community/PostList";

export function UserPosts() {
    return (
        <div>
            <h2 className="text-xl font-bold my-4">My Posts</h2>
            <PostList />
        </div>
    )
}