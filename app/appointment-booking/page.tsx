'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Appointment Booking Route
 * PUBLIC - No authentication required
 * Redirects to /appointment for consistency
 */
export default function AppointmentBookingPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /appointment which is the main booking page
    router.replace('/appointment');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Redirecting to appointment booking...</p>
    </div>
  );
}

