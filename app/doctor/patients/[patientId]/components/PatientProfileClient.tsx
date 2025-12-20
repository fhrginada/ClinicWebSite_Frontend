'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Patient } from '../../types';
import {
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  Activity,
  AlertTriangle,
  UserCheck,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import AddRecordModal from './AddRecordModal';

interface PatientProfileClientProps {
  patient: Patient;
}

export default function PatientProfileClient({
  patient,
}: PatientProfileClientProps) {
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);

  return (
    <>
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 mb-6 -mx-6 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/doctor/patients"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
              <p className="text-sm text-gray-600">Patient Profile</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/doctor/patients/${patient.id}/records`}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View Records
            </Link>
            <button
              onClick={() => setIsAddRecordModalOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Record
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                {patient.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-base font-medium text-gray-900">
                    {patient.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="text-base font-medium text-gray-900">
                    {patient.age} years old
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-base font-medium text-gray-900">
                    {patient.gender}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-base font-medium text-gray-900">
                    {patient.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-base font-medium text-gray-900 break-all">
                    {patient.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Medical Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Medical ID Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Medical Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Medical ID</p>
                <p className="text-base font-medium text-gray-900">
                  {patient.medicalId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Assigned Doctor</p>
                <p className="text-base font-medium text-gray-900">
                  {patient.assignedDoctor}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                    patient.status === 'Active'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  {patient.status}
                </span>
              </div>
            </div>
          </div>

          {/* Conditions Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">
                Chronic Conditions
              </h2>
            </div>
            {patient.conditions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {patient.conditions.map((condition, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No chronic conditions recorded.</p>
            )}
          </div>

          {/* Allergies Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h2 className="text-lg font-semibold text-gray-900">Allergies</h2>
            </div>
            {patient.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No known allergies.</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Record Modal */}
      {isAddRecordModalOpen && (
        <AddRecordModal
          patientId={patient.id}
          patientName={patient.name}
          onClose={() => setIsAddRecordModalOpen(false)}
        />
      )}
    </>
  );
}

