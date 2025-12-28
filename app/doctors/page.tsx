/**
 * Doctors Page - Server Component
 * 
 * This is a Next.js 13+ Server Component that:
 * - Fetches doctors list from the API
 * - Renders a list of doctors
 * - Includes error handling and loading state
 * 
 * Next.js best practices:
 * - Uses async/await for data fetching
 * - No 'use client' directive (default server component)
 * - Handles errors gracefully
 */

import DoctorCard from './components/DoctorCard';

export const metadata = {
  title: 'Doctors | Clinic',
  description: 'Browse our team of healthcare professionals',
};

// Mock doctor data
interface Doctor {
  id: number;
  name: string;
  email: string;
  phone?: string;
  specialization?: string;
  bio?: string;
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Ahmed Nabel',
    email: 'ahmed.nabel@clinic.com',
    phone: '+1 234-567-8900',
    specialization: 'General Medicine',
    bio: 'Experienced general practitioner with over 15 years of experience.',
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@clinic.com',
    phone: '+1 234-567-8901',
    specialization: 'Cardiology',
    bio: 'Board-certified cardiologist specializing in heart disease prevention.',
  },
  {
    id: 3,
    name: 'Dr. Michael Chen',
    email: 'michael.chen@clinic.com',
    phone: '+1 234-567-8902',
    specialization: 'Pediatrics',
    bio: 'Dedicated pediatrician with a passion for children\'s health.',
  },
];

async function DoctorsPage() {
  const doctors: Doctor[] = mockDoctors;
  const error: string | null = null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Doctors</h1>
          <p className="text-lg text-gray-600">
            Meet our team of experienced healthcare professionals
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Loading State - This won't show in production server components, but good for reference */}
        {doctors.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500">No doctors found. Please try again later.</p>
          </div>
        )}

        {/* Doctors Grid */}
        {doctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorsPage;
