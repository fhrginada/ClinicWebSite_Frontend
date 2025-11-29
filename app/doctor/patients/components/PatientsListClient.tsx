'use client';

import { useState, useMemo } from 'react';
import { Patient, SortOption } from '../types';
import PatientRow from './PatientRow';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';

interface PatientsListClientProps {
  initialPatients: Patient[];
}

export default function PatientsListClient({
  initialPatients,
}: PatientsListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  const filteredAndSortedPatients = useMemo(() => {
    let filtered = initialPatients.filter((patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort patients
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'lastVisit':
          return (
            new Date(b.lastVisitDate).getTime() -
            new Date(a.lastVisitDate).getTime()
          );
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [initialPatients, searchQuery, sortBy]);

  if (initialPatients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No patients found.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Visit Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedPatients.length > 0 ? (
              filteredAndSortedPatients.map((patient) => (
                <PatientRow key={patient.id} patient={patient} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No patients found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Results Count */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredAndSortedPatients.length} of {initialPatients.length}{' '}
        patients
      </div>
    </div>
  );
}

