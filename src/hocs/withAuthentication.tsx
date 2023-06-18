"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/**
 * Higher-order component (HOC) for authentication.
 *
 * @param {React.ComponentType} WrappedComponent - The component to be wrapped.
 * @returns {React.ComponentType} The wrapped component.
 * @author Aravinda Meewalaarachchi
 */
const withAuthentication = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const WithAuthentication: React.FC<P> = (props) => {
    const router = useRouter();
    const { status } = useSession();

    if (status && status === 'loading') {
      return null; 
    }

    if (status && status !== 'authenticated') {
      router.push('/api/auth/signin');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthentication.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthentication;
};

export default withAuthentication;
