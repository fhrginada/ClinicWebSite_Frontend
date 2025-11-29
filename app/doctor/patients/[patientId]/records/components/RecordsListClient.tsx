'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Patient, MedicalRecord } from '../../../types';
import RecordCard from '../../../components/RecordCard';
import { ArrowLeft, Calendar, Filter } from 'lucide-react';

interface RecordsListClientProps {
  patient: Patient;
  initialRecords: MedicalRecord[];
}

export default function RecordsListClient({
  patient,
  initialRecords,
}: RecordsListClientProps) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [visitTypeFilter, setVisitTypeFilter] = useState<
    'All' | 'Checkup' | 'Follow-up' | 'Emergency'
  >('All');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const filteredRecords = useMemo(() => {
    let filtered = [...initialRecords];

    // Filter by date range
    if (dateFrom) {
      filtered = filtered.filter(
        (record) => new Date(record.visitDate) >= new Date(dateFrom)
      );
    }
    if (dateTo) {
      filtered = filtered.filter(
        (record) => new Date(record.visitDate) <= new Date(dateTo)
      );
    }

    // Filter by visit type
    if (visitTypeFilter !== 'All') {
      filtered = filtered.filter(
        (record) => record.visitType === visitTypeFilter
      );
    }

    // Sort by date (newest first)
    filtered.sort(
      (a, b) =>
        new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
    );

    return filtered;
  }, [initialRecords, dateFrom, dateTo, visitTypeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const handleViewFull = (recordId: string) => {
    // TODO: Navigate to full record view or open modal
    alert(`Viewing full record: ${recordId} (This is a demo)`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/doctor/patients/${patient.id}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Patient Profile
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Medical Records - {patient.name}
        </h1>
        <p className="text-gray-600">
          View and manage all medical records for this patient
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-700">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date From
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date To
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visit Type
            </label>
            <select
              value={visitTypeFilter}
              onChange={(e) => {
                setVisitTypeFilter(
                  e.target.value as 'All' | 'Checkup' | 'Follow-up' | 'Emergency'
                );
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Types</option>
              <option value="Checkup">Checkup</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
        </div>
        {(dateFrom || dateTo || visitTypeFilter !== 'All') && (
          <button
            onClick={() => {
              setDateFrom('');
              setDateTo('');
              setVisitTypeFilter('All');
              setCurrentPage(1);
            }}
            className="mt-4 text-sm text-blue-600 hover:text-blue-700"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Records Grid */}
      {paginatedRecords.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {paginatedRecords.map((record) => (
              <RecordCard
                key={record.id}
                record={record}
                onViewFull={handleViewFull}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredRecords.length)} of{' '}
                {filteredRecords.length} records
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {initialRecords.length === 0
              ? 'No medical records found for this patient.'
              : 'No records match the selected filters.'}
          </p>
        </div>
      )}
    </div>
  );
}

