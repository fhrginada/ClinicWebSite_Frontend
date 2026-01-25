'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMockAuth } from '@/src/auth/mockAuth';

export default function PatientDashboard() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Redirect to user-ID based dashboard
  useEffect(() => {
    // Check localStorage directly
    const checkAuth = () => {
      console.log('=== Patient Page Auth Check ===');
      console.log('localStorage values:');
      if (typeof window !== 'undefined') {
        console.log('clinic.mockAuth:', window.localStorage.getItem('clinic.mockAuth'));
        console.log('clinic.mockRole:', window.localStorage.getItem('clinic.mockRole'));
        console.log('clinic.mockUserId:', window.localStorage.getItem('clinic.mockUserId'));
        console.log('clinic.mockUserName:', window.localStorage.getItem('clinic.mockUserName'));
      }
      
      const auth = getMockAuth();
      console.log('getMockAuth() result:', auth);
      
      if (!auth.isAuthenticated || auth.role !== 'Patient') {
        console.log('Not authenticated or not patient, redirecting to login');
        router.replace('/login');
        return;
      }
      
      if (auth.userId) {
        console.log('Authenticated as Patient, redirecting to:', `/patient/${auth.userId}/dashboard`);
        router.replace(`/patient/${auth.userId}/dashboard`);
      } else {
        console.log('No userId, redirecting to login');
        router.replace('/login');
      }
      setIsChecking(false);
    };

    // Check immediately and also after a small delay
    checkAuth();
  }, [router]);
  
  return null;
}

