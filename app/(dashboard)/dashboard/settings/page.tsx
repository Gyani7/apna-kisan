import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader"
import { DashboardShell } from "@/components/shell"
import { UserNameForm } from "@/components/UserNameForm"

export const metadata = {
  title: "Settings",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage account and website settings.
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>
    </DashboardShell>
  )
}
