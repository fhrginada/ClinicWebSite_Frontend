'use client';

import { useEffect } from 'react';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import { AlertCircle } from 'lucide-react';

export default function PatientsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Patients page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-72 p-6">
        <Topbar />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong!
            </h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              {error.message || 'An error occurred while loading patients.'}
            </p>
            <button
              onClick={reset}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

