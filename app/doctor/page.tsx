'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMockAuth } from '@/src/auth/mockAuth';

export default function DoctorDashboardRedirect() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Redirect to user-ID based dashboard
  useEffect(() => {
    // Add a small delay to ensure localStorage is ready
    const timer = setTimeout(() => {
      const auth = getMockAuth();
      console.log('Doctor page auth check:', auth);
      
      if (!auth.isAuthenticated || auth.role !== 'Doctor') {
        router.replace('/login');
        return;
      }
      
      if (auth.userId) {
        router.replace(`/doctor/${auth.userId}/dashboard`);
      } else {
        router.replace('/login');
      }
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);
  
  return null;
}

