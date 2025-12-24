'use client';

import { useEffect, useMemo, useState } from 'react';
import Sidebar from '@/components/patient/Sidebar';
import Topbar from '@/components/patient/Topbar';
import { Calendar, User, FileText, Filter, Search } from 'lucide-react';
import { getMyMedicalHistory, type MedicalHistory } from '@/src/services/medical-history.service';

interface MedicalRecord {
  id: number;
  visitDate: string;
  visitType: 'Checkup' | 'Follow-up' | 'Emergency';
  diagnosis: string;
  notes: string;
  doctorName: string;
  doctorSpecialization: string;
  prescription: {
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
    }>;
  };
}

const toMedicalRecord = (m: MedicalHistory): MedicalRecord => {
  const visitType: MedicalRecord['visitType'] = m.followUpDate ? 'Follow-up' : 'Checkup';
  const doctorName = m.doctorId ? `Doctor #${m.doctorId}` : '—';
  return {
    id: m.id,
    visitDate: m.dateRecorded,
    visitType,
    diagnosis: m.diagnosis ?? '—',
    notes: m.treatment ?? '—',
    doctorName,
    doctorSpecialization: '',
    prescription: { medications: [] },
  };
};

const getVisitTypeBadgeClass = (type: string) => {
  switch (type) {
    case 'Emergency':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Follow-up':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Checkup':
      return 'bg-green-50 text-green-700 border-green-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export default function MedicalHistoryPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [visitTypeFilter, setVisitTypeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const response = await getMyMedicalHistory(1, 500);
        if (cancelled) return;
        setRecords(response.items.map(toMedicalRecord));
      } catch (e: any) {
        if (cancelled) return;
        setLoadError(e?.response?.data?.message ?? 'Failed to load medical history.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredRecords = useMemo(() => {
    let filtered = [...records];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (record) =>
          record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.notes.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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
      filtered = filtered.filter((record) => record.visitType === visitTypeFilter);
    }

    // Sort by date (newest first)
    filtered.sort(
      (a, b) =>
        new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
    );

    return filtered;
  }, [records, dateFrom, dateTo, visitTypeFilter, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical History</h1>
            <p className="text-gray-600">View your complete medical records and history</p>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-700">Filters</h2>
            </div>
            
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by diagnosis, doctor, or notes..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
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
                    setVisitTypeFilter(e.target.value);
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
            
            {(dateFrom || dateTo || visitTypeFilter !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setDateFrom('');
                  setDateTo('');
                  setVisitTypeFilter('All');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Records Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading medical records...</p>
            </div>
          ) : loadError ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{loadError}</p>
            </div>
          ) : paginatedRecords.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {paginatedRecords.map((record) => {
                  const prescriptionSummary =
                    record.prescription.medications.length > 0
                      ? `${record.prescription.medications.length} medication(s) prescribed`
                      : 'No medications prescribed';

                  return (
                    <div
                      key={record.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {formatDate(record.visitDate)}
                            </span>
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getVisitTypeBadgeClass(
                                record.visitType
                              )}`}
                            >
                              {record.visitType}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {record.diagnosis}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-600 line-clamp-2">{record.notes}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {record.doctorSpecialization
                              ? `${record.doctorName} - ${record.doctorSpecialization}`
                              : record.doctorName}
                          </span>
                        </div>

                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Prescription: </span>
                          {prescriptionSummary}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
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
                {records.length === 0
                  ? 'No medical records found.'
                  : 'No records match the selected filters.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

