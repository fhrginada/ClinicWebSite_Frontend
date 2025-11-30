// app/prescriptions/add/page.tsx

import AddPrescriptionForm from '@/components/AddPrescriptionForm';
import Link from 'next/link';

export default function AddPrescriptionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Add New Prescription</h1>
        <AddPrescriptionForm />
      </div>
    </div>
  );
}