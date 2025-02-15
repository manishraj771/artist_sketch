import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export function useAdmin() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  return { isAdmin: user?.isAdmin || false, loading };
}