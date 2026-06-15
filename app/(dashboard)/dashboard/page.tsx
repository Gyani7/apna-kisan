import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { PageHeader } from "@/components/PageHeader"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <PageHeader
        heading="Dashboard"
        text="Manage your account and website."
      />
    </DashboardShell>
  )
}
