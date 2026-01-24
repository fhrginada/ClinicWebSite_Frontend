'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMockAuth } from '@/src/auth/mockAuth';

export default function DoctorDashboardRedirect() {
  const router = useRouter();

  // Redirect to user-ID based dashboard
  useEffect(() => {
    const auth = getMockAuth();
    if (!auth.isAuthenticated || auth.role !== 'Doctor') {
      router.replace('/login');
      return;
    }
    
    if (auth.userId) {
      router.replace(`/doctor/${auth.userId}/dashboard`);
    } else {
      router.replace('/login');
    }
  }, [router]);
  
  return null;
}

