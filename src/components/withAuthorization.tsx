'use client';

import { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserRole } from '@/lib/types';
import { useModal } from '@/components/Providers';
import { createSupabaseClient } from '@/lib/supabase/client';

const withAuthorization = <P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: UserRole[]
) => {
  const WithAuthorization = (props: P) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const { showPremiumModal } = useModal();
    const supabase = createSupabaseClient();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, [supabase]);

    useEffect(() => {
      if (!user) return;
      const checkAuth = async () => {

        if (!user) {
          showPremiumModal();
          // Optional: redirect to a login page if modal is not preferred
          // router.push('/login'); 
          return;
        }

        const userRole = user.user_metadata?.role as UserRole;

        if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
          toast({
            title: 'Access Denied',
            description: "You don't have permission to view this page.",
            variant: 'destructive',
          });
          router.push('/'); // Redirect to a safe page
        } else {
          setIsAuthorized(true);
        }
        setIsLoading(false);
      };

      checkAuth();
    }, [router, toast, showPremiumModal, allowedRoles, user]);

    if (isLoading) {
      return <div>Loading...</div>; // Or a loading spinner
    }

    if (!isAuthorized) {
      // This will be briefly visible before the modal or redirect happens
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  // To make debugging easier
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAuthorization.displayName = `WithAuthorization(${displayName})`;

  return WithAuthorization;
};

export default withAuthorization;
