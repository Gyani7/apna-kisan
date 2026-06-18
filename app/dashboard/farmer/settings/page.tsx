
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { UserNameForm } from "@/components/UserNameForm";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: session.user.id, name: session.user.name || "" }} />
      </div>
    </DashboardShell>
  );
}
