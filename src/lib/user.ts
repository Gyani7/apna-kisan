import { User } from '@supabase/supabase-js'

export type UserProfile = {
  id: string;
  username: string;
  avatar_url: string;
  full_name: string;
}

export type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: any;
};
