/**
 * Doctor Card Component - Client Component (Optional)
 * Shows individual doctor information in a card format
 */

'use client';

import { Doctor } from '@/src/services/doctor.service';
import Link from 'next/link';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* Doctor Image Placeholder */}
      <div className="mb-4">
        {doctor.profilePicture ? (
          <img
            src={doctor.profilePicture}
            alt={doctor.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-center">
              <div className="text-4xl mb-2">👨‍⚕️</div>
              No image
            </span>
          </div>
        )}
      </div>

      {/* Doctor Info */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>

        {doctor.specialization && (
          <p className="text-sm text-blue-600 font-semibold mb-3">
            {doctor.specialization}
          </p>
        )}

        <div className="space-y-2 text-sm text-gray-600">
          {doctor.yearsOfExperience && (
            <p>
              <span className="font-semibold">Experience:</span>{' '}
              {doctor.yearsOfExperience} years
            </p>
          )}

          {doctor.email && (
            <p>
              <span className="font-semibold">Email:</span>{' '}
              <a
                href={`mailto:${doctor.email}`}
                className="text-blue-500 hover:underline"
              >
                {doctor.email}
              </a>
            </p>
          )}

          {doctor.phone && (
            <p>
              <span className="font-semibold">Phone:</span>{' '}
              <a
                href={`tel:${doctor.phone}`}
                className="text-blue-500 hover:underline"
              >
                {doctor.phone}
              </a>
            </p>
          )}

          {doctor.licenseNumber && (
            <p>
              <span className="font-semibold">License:</span>{' '}
              {doctor.licenseNumber}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <Link
            href={`/doctors/${doctor.id}`}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition text-center text-sm font-semibold"
          >
            View Details
          </Link>
          <Link
            href={`/appointment-booking?doctorId=${doctor.id}`}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition text-center text-sm font-semibold"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
