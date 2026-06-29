
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>This is the profile page.</p>
    </div>
  );
}
