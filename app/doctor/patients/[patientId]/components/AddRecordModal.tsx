'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddRecordModalProps {
  patientId: string;
  patientName: string;
  onClose: () => void;
}

export default function AddRecordModal({
  patientId,
  patientName,
  onClose,
}: AddRecordModalProps) {
  const [formData, setFormData] = useState({
    visitDate: new Date().toISOString().split('T')[0],
    diagnosis: '',
    notes: '',
    visitType: 'Checkup' as 'Checkup' | 'Follow-up' | 'Emergency',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to add record
    console.log('Adding record for patient:', patientId, formData);
    alert('Record added successfully! (This is a demo)');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Record</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name
            </label>
            <input
              type="text"
              value={patientName}
              disabled
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visit Date
            </label>
            <input
              type="date"
              value={formData.visitDate}
              onChange={(e) =>
                setFormData({ ...formData, visitDate: e.target.value })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visit Type
            </label>
            <select
              value={formData.visitType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visitType: e.target.value as 'Checkup' | 'Follow-up' | 'Emergency',
                })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Checkup">Checkup</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnosis
            </label>
            <input
              type="text"
              value={formData.diagnosis}
              onChange={(e) =>
                setFormData({ ...formData, diagnosis: e.target.value })
              }
              required
              placeholder="Enter diagnosis"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              required
              rows={4}
              placeholder="Enter visit notes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white text-blue-600 border border-blue-300 rounded-xl shadow-md hover:bg-blue-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors"
            >
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

