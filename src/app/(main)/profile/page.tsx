import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { UserPosts } from "@/components/profile/UserPosts";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader />
      <div className="mt-8">
        <UserPosts />
      </div>
    </div>
  );
}
