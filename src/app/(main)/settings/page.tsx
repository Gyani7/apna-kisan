
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      <h1>Settings</h1>
      <p>This is the settings page.</p>
    </div>
  );
}
