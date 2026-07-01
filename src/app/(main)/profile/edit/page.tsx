
import { StickyHeader } from "@/components/home/StickyHeader";
import { EditProfileForm } from "@/components/EditProfileForm";

export default function EditProfilePage() {
  return (
    <div className="dark flex flex-col h-screen">
      <StickyHeader />
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <EditProfileForm />
        </main>
    </div>
  );
}
