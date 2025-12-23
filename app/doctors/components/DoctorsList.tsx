/**
 * Doctors List Component
 * Simple list view of doctors (alternative to grid)
 */

'use client';

import { Doctor } from '@/src/services/doctor.service';
import Link from 'next/link';

interface DoctorsListProps {
  doctors: Doctor[];
}

export default function DoctorsList({ doctors }: DoctorsListProps) {
  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialization}</p>
            {doctor.email && (
              <p className="text-xs text-gray-500">{doctor.email}</p>
            )}
          </div>
          <Link
            href={`/appointment-booking?doctorId=${doctor.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition whitespace-nowrap ml-4"
          >
            Book Now
          </Link>
        </div>
      ))}
    </div>
  );
}
