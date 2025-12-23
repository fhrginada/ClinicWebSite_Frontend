/**
 * Appointment Booking Page
 * Shows the appointment creation form
 */

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import CreateAppointmentForm from '../components/CreateAppointmentForm';
import { useState, useEffect } from 'react';
import RequireAuth from '../components/RequireAuth';

export default function AppointmentBookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [doctorId, setDoctorId] = useState<number | undefined>();

  useEffect(() => {
    const doctorIdParam = searchParams?.get('doctorId');
    
    if (doctorIdParam) {
      setDoctorId(parseInt(doctorIdParam));
    }
  }, [searchParams]);

  return (
    <RequireAuth allowedRoles={['Patient']}>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="text-blue-500 hover:text-blue-600 font-semibold mb-4"
            >
              ← Go Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Schedule Your Appointment</h1>
            <p className="text-gray-600 mt-2">
              Fill out the form below to book an appointment with our healthcare professionals.
            </p>
          </div>

          <CreateAppointmentForm
            doctorId={doctorId}
            onSuccess={() => {
              setTimeout(() => {
                router.push('/appointment-confirmation');
              }, 2000);
            }}
          />
        </div>
      </div>
    </RequireAuth>
  );
}
