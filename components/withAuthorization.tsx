'use client';

import { useSession } from 'next-auth/react';
import { useGuest } from '../app/guest-provider';
import PremiumLoginModal from './PremiumLoginModal';

const withAuthorization = (WrappedComponent: React.ComponentType<any>, isProtected: boolean) => {
  const WithAuthorization = (props: any) => {
    const { data: session, status } = useSession();
    const { isGuest } = useGuest();

    if (status === 'loading') {
      return <div>Loading...</div>; // Or a loading spinner
    }

    if (isProtected && (isGuest || !session)) {
      return <PremiumLoginModal />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthorization;
};

export default withAuthorization;
