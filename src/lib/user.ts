
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/types";

export async function getUser() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (error) {
    console.error("Error getting user profile:", error);
    return session.user;
  }

  return {
    ...session.user,
    profile: profile as Profile,
  };
}
