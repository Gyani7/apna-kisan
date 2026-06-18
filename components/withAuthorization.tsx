'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserRole } from '@/lib/user';
import { Role } from '@/lib/roles';

export const withAuthorization = (
  WrappedComponent: React.ComponentType,
  allowedRoles: Role[]
) => {
  const WithAuthorization = (props: any) => {
    const router = useRouter();
    const [userRole, setUserRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkUserRole = async () => {
        const role = await getUserRole();
        setUserRole(role);
        setLoading(false);
      };
      checkUserRole();
    }, []);

    useEffect(() => {
      if (!loading) {
        if (!userRole || !allowedRoles.includes(userRole)) {
          router.replace('/');
        }
      }
    }, [loading, userRole, router, allowedRoles]);

    if (loading || !userRole || !allowedRoles.includes(userRole)) {
      // Render a loading state or null while checking authorization
      // and before the redirect in useEffect happens.
      return <div>Loading...</div>;
    }

    // Render the wrapped component if authorized
    return <WrappedComponent {...props} />;
  };
  
  WithAuthorization.displayName = `withAuthorization(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return WithAuthorization;
};