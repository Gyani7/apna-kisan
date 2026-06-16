'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

// Define a type for the profile data
interface Profile {
  username: string;
  full_name: string;
  avatar_url: string;
  reputation: number;
  is_verified: boolean;
  location: string;
  bio: string;
  posts_count: number;
  followers_count: number;
  following_count: number;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null; // Add profile to the context value
  loading: boolean;
  refreshProfile: () => void; // Add a refresh function
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  refreshProfile: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (user: User | null) => {
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } else {
      setProfile(null);
    }
  }, []);


  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session: s } } = await supabase.auth.getSession();
      setSession(s);
      const currentUser = s?.user ?? null;
      setUser(currentUser);
      await fetchProfile(currentUser);
      setLoading(false);
    };

    getSessionAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, s) => {
      setSession(s);
      const currentUser = s?.user ?? null;
      setUser(currentUser);
      await fetchProfile(currentUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const refreshProfile = useCallback(() => {
    if (user) {
      fetchProfile(user);
    }
  }, [user, fetchProfile]);


  return (
    <AuthContext.Provider value={{ user, session, profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
