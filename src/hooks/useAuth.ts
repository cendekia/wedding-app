import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback } from 'react';
import { useAppState } from './useAppState';

// Define the Session type to include user role
interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: 'ADMIN' | 'USER' | 'GUEST';
}

interface Session {
  user: User;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const { addNotification } = useAppState();
  
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
        
        if (result?.error) {
          addNotification(result.error, 'error');
        }
        
        return result;
      } catch (error) {
        console.error('Login error:', error);
        addNotification('An error occurred during login', 'error');
        return { error: 'An error occurred during login' };
      }
    },
    [addNotification]
  );

  const logout = useCallback(async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  }, []);

  // Type guard to check if session user has a role
  const hasRole = (user: any): user is User => {
    return user && typeof user.role === 'string';
  };

  const userWithRole = hasRole(session?.user) ? session.user : null;
  const isAdmin = userWithRole?.role === 'ADMIN';
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  return {
    session,
    status,
    isAdmin,
    isAuthenticated,
    isLoading,
    user: session?.user,
    login,
    logout,
  };
} 