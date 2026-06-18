
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";

export const metadata = {
  title: "Farmer Dashboard",
  description: "Welcome to your dashboard, farmer!",
};

export default async function FarmerDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Welcome, ${user.name}!`}
        text="This is your dashboard. You can manage your farm, get insights, and connect with the community."
      />
    </DashboardShell>
  );
}
