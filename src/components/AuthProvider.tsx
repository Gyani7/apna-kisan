
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChangedHelper, getRedirectResultAfterSignIn } from '../lib/auth';
import { UserInfo } from 'firebase/auth';

interface AuthContextType {
  user: UserInfo | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processRedirectResult = async () => {
      const { user: redirectedUser } = await getRedirectResultAfterSignIn();
      if (redirectedUser) {
        setUser(redirectedUser);
      }
      setLoading(false);
    };

    processRedirectResult();

    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
      if (loading) {
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [loading]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
