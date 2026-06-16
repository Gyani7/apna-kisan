import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader";
import { DashboardShell } from "@/components/shell";
import { UserNameForm } from "@/components/UserNameForm";
import { env } from "@/lib/env";

export const metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <DashboardShell>
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage account and website settings.
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-10">
        {user && (
          <UserNameForm
            user={{ id: user.id, name: user.user_metadata.name || null }}
          />
        )}
      </div>
    </DashboardShell>
  );
}
