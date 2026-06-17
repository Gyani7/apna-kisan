import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserRole } from '@/lib/user';
import { Role } from '@/lib/roles';

export const withAuthorization = (
  WrappedComponent: React.ComponentType,
  allowedRoles: Role[]
) => {
  return (props: any) => {
    const router = useRouter();
    const [userRole, setUserRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkRole = async () => {
        const role = await getUserRole();
        setUserRole(role);
        setLoading(false);
      };

      checkRole();
    }, []);

    if (loading) {
      return <div>Loading...</div>; // Or a proper loader component
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
      router.replace('/'); // Redirect to a different page if not authorized
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
