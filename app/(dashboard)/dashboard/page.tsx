import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/shell"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader"

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
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your account and website.
        </PageHeaderDescription>
      </PageHeader>
    </DashboardShell>
  )
}
