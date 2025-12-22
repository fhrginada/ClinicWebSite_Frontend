'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import { getAllPrescriptions, deletePrescription, downloadPrescriptionPdf, Prescription } from '@/src/services/prescription.service';
import { Plus, FileText, Download, Trash2, Calendar, User, Pill } from 'lucide-react';

export default function PrescriptionsPage() {
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllPrescriptions();
      setPrescriptions(data);
    } catch (err) {
      console.error('Error fetching prescriptions:', err);
      setError('Failed to load prescriptions. Please try again later.');
      // Keep empty array - will show "No prescriptions found"
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this prescription?')) {
      return;
    }

    setDeletingId(id);
    try {
      await deletePrescription(id);
      setPrescriptions(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting prescription:', err);
      alert('Failed to delete prescription. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownloadPdf = async (id: string) => {
    try {
      const blob = await downloadPrescriptionPdf(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `prescription-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Failed to download PDF. Please try again.');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Prescriptions</h1>
              <p className="text-gray-600">Manage and view all patient prescriptions</p>
            </div>
            <button
              onClick={() => router.push('/doctor/prescriptions/new')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              New Prescription
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            /* Prescriptions List */
            <div className="space-y-4">
              {prescriptions.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No prescriptions found</p>
                  <p className="text-gray-400 text-sm">Create your first prescription to get started</p>
                </div>
              ) : (
                prescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <User size={18} />
                            <span className="font-semibold text-gray-900">{prescription.patientName}</span>
                            <span className="text-sm">({prescription.patientId})</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={18} />
                            <span className="text-sm">{formatDate(prescription.date)}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Pill size={18} className="text-blue-600" />
                            <span className="font-semibold text-gray-900">Medications</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-6">
                            {prescription.medications.map((med, index) => (
                              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <div className="font-medium text-gray-900">{med.name}</div>
                                <div className="text-sm text-gray-600">
                                  {med.dosage} • {med.frequency}
                                  {med.duration && ` • ${med.duration}`}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {prescription.notes && (
                          <div className="text-sm text-gray-600 ml-6">
                            <span className="font-medium">Notes: </span>
                            {prescription.notes}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => handleDownloadPdf(prescription.id)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          title="Download PDF"
                        >
                          <Download size={18} className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(prescription.id)}
                          disabled={deletingId === prescription.id}
                          className="p-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

