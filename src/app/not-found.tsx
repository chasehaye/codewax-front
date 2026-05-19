'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useUser } from '@/src/providers/UserContext';

export default function NotFound() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.replace('/c');
    } else {
      router.replace('/');
    }
  }, [user, loading, router]);

  return null;
}
