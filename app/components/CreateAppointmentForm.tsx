/**
 * Create Appointment Form - Client Component
 * 
 * This is a Next.js 13+ Client Component that:
 * - Uses 'use client' directive
 * - Has local state management with useState
 * - Handles form submission with mock implementation (frontend-only)
 * - Shows loading and success states
 * 
 * Next.js best practices:
 * - Form validation before submission
 * - Error boundary with try-catch
 * - Loading state while processing
 * - User feedback with toast/alert
 */

'use client';

import { useEffect, useMemo, useState, FormEvent, ChangeEvent } from 'react';

interface CreateAppointmentFormProps {
  doctorId?: number;
  onSuccess?: () => void;
}

export default function CreateAppointmentForm({
  doctorId,
  onSuccess,
}: CreateAppointmentFormProps) {
  const [formData, setFormData] = useState({
    doctorId: doctorId || 0,
    date: '',
    timeSlot: '',
    reasonForVisit: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setFormData((prev) => ({ ...prev, doctorId: doctorId || 0 }));
  }, [doctorId]);

  // Mock available time slots
  const availableSlotsForDate = useMemo(() => {
    if (!formData.date) return [];
    // Generate mock time slots for the selected date
    const slots = [
      '09:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '02:00 PM - 03:00 PM',
      '03:00 PM - 04:00 PM',
      '04:00 PM - 05:00 PM',
    ];
    return slots;
  }, [formData.date]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'doctorId' ? (value ? parseInt(value) : 0) : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validation
    if (!formData.doctorId) {
      setError('Please select a doctor');
      setLoading(false);
      return;
    }

    if (!formData.date) {
      setError('Please select an appointment date');
      setLoading(false);
      return;
    }

    if (!formData.timeSlot) {
      setError('Please select an available time slot');
      setLoading(false);
      return;
    }

    // Mock appointment creation - no API call
    setTimeout(() => {
      setSuccess(true);
      setFormData({
        doctorId: doctorId || 0,
        date: '',
        timeSlot: '',
        reasonForVisit: '',
        notes: '',
      });

      if (onSuccess) {
        onSuccess();
      }

      // Show success message for 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Book an Appointment
      </h2>

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-semibold">
            ✓ Appointment created successfully!
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Doctor ID */}
        <div>
          <label htmlFor="doctorId" className="block text-sm font-semibold text-gray-700 mb-2">
            Doctor ID *
          </label>
          <input
            type="number"
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            placeholder="Enter doctor ID"
            required
            min={1}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
            Appointment Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Time Slot */}
        <div>
          <label htmlFor="timeSlot" className="block text-sm font-semibold text-gray-700 mb-2">
            Available Time Slot *
          </label>
          <select
            id="timeSlot"
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading || !formData.date || !formData.doctorId}
          >
            <option value="">
              {availableSlotsForDate.length === 0
                ? 'No available slots for selected date'
                : 'Select a time slot'}
            </option>
            {availableSlotsForDate.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reasonForVisit" className="block text-sm font-semibold text-gray-700 mb-2">
            Reason for Visit
          </label>
          <input
            type="text"
            id="reasonForVisit"
            name="reasonForVisit"
            value={formData.reasonForVisit}
            onChange={handleChange}
            placeholder="e.g., Checkup, Follow-up"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional information..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Appointment...' : 'Book Appointment'}
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-500 text-center">
        * Required fields
      </p>
    </div>
  );
}
