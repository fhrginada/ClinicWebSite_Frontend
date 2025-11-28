import Link from 'next/link';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import { UserX, ArrowLeft } from 'lucide-react';

export default function PatientNotFound() {
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
            <UserX className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Patient Not Found
            </h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              The patient you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/doctor/patients"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Patients
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

