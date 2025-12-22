'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/nurse/Sidebar';
import Topbar from '@/components/nurse/Topbar';
import { createAppointment, CreateAppointmentPayload } from '@/src/services/appointment.service';
import { getAllDoctors, Doctor } from '@/src/services/doctor.service';

export default function AddAppointmentPage() {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    date: '',
    time: '',
    reason: '',
    doctorName: '',
    doctorId: '',
    notes: '',
  });
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getAllDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Error loading doctors:', error);
        // Continue with form even if doctors fail to load
      }
    };
    fetchDoctors();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (field === 'doctorName') {
      // Find the doctor ID from the selected name
      const selectedDoctor = doctors.find(d => d.name === value);
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        doctorId: selectedDoctor ? selectedDoctor.id.toString() : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Validate required fields
      if (!formData.patientId || !formData.date || !formData.time || !formData.doctorId || !formData.reason) {
        setSubmitError('Please fill in all required fields.');
        setIsSubmitting(false);
        return;
      }

      const payload: CreateAppointmentPayload = {
        patientId: formData.patientId,
        doctorId: parseInt(formData.doctorId),
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        notes: formData.notes || undefined,
      };

      await createAppointment(payload);
      
      // Success - show feedback
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        patientName: '',
        patientId: '',
        date: '',
        time: '',
        reason: '',
        doctorName: '',
        doctorId: '',
        notes: '',
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      setSubmitError(
        error.response?.data?.message || 
        'Failed to create appointment. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Appointment</h1>
            <p className="text-gray-600">Schedule a new patient appointment</p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">Appointment created successfully!</p>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">{submitError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  required
                  placeholder="Enter patient name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Patient ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.patientId}
                  onChange={(e) => handleInputChange('patientId', e.target.value)}
                  required
                  placeholder="Enter patient ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Doctor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Name <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.doctorName}
                  onChange={(e) => handleInputChange('doctorName', e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
                  {doctors.length === 0 && (
                    <>
                      <option value="Dr. Ahmed Nabel">Dr. Ahmed Nabel</option>
                      <option value="Dr. Sarah Williams">Dr. Sarah Williams</option>
                      <option value="Dr. Michael Brown">Dr. Michael Brown</option>
                      <option value="Dr. Emily Chen">Dr. Emily Chen</option>
                    </>
                  )}
                </select>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Select reason</option>
                  <option value="General Checkup">General Checkup</option>
                  <option value="Follow-up Visit">Follow-up Visit</option>
                  <option value="Vaccination">Vaccination</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                placeholder="Enter any additional notes or instructions..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    patientName: '',
                    patientId: '',
                    date: '',
                    time: '',
                    reason: '',
                    doctorName: '',
                    notes: '',
                  });
                }}
                className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Creating...
                  </span>
                ) : (
                  'Schedule Appointment'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

