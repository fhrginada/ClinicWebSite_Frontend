'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function PrescriptionCard() {
  return (
    <div className="bg-[#2563eb] rounded-xl shadow-lg p-8 text-white">
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        {/* Rx Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-5xl font-bold">Rx</span>
          </div>
        </div>
        
        {/* Write Prescription Text */}
        <h2 className="text-2xl font-bold mb-6">WRITE PRESCRIPTION</h2>
        
        {/* New Prescription Button */}
        <Link
          href="/doctor/prescriptions/new"
          className="bg-white text-[#2563eb] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-md"
        >
          <Plus size={20} />
          NEW PRESCRIPTION
        </Link>
        
        {/* Description */}
        <p className="text-white/80 text-sm mt-6 text-center">
          Quickly create and manage patient prescriptions
        </p>
      </div>
    </div>
  );
}

