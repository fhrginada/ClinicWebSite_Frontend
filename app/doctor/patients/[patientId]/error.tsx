'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function PatientProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Patient profile error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-72 p-6">
        <Topbar />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Link
            href="/doctor/patients"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Patients
          </Link>
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong!
            </h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              {error.message || 'An error occurred while loading patient profile.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors"
              >
                Try again
              </button>
              <Link
                href="/doctor/patients"
                className="px-6 py-3 bg-white text-blue-600 border border-blue-300 rounded-xl shadow-md hover:bg-blue-50 transition-colors"
              >
                Back to Patients
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

