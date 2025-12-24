/**
 * Appointment Booking Page
 * Matches reference UI with 3-card layout
 * PUBLIC PAGE - No authentication required (TEMPORARY)
 */

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo, FormEvent, ChangeEvent } from 'react';
import { createAppointment } from '@/src/services/appointment.service';
import { getDoctorAvailability, getAllDoctors, type DoctorAvailability, type Doctor } from '@/src/services/doctor.service';
import Calendar from '../components/Calendar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AppointmentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    doctorId: 0,
    reasonForVisit: 'New Patient Visit',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [availability, setAvailability] = useState<DoctorAvailability | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // Initialize doctorId from query params
  useEffect(() => {
    const doctorIdParam = searchParams?.get('doctorId');
    if (doctorIdParam) {
      setFormData(prev => ({ ...prev, doctorId: parseInt(doctorIdParam) }));
    }
  }, [searchParams]);

  // Home page doctors (hardcoded from LeadPractitioner component)
  const homePageDoctors: Doctor[] = [
    {
      id: 0, // Placeholder ID - will be replaced if found in API
      name: 'Dr. Evelyn Reed',
      email: '',
      specialization: 'Family Medicine',
    },
    {
      id: 0,
      name: 'Dr. Michael Chen',
      email: '',
      specialization: 'Cardiology',
    },
    {
      id: 0,
      name: 'Dr. Sarah Johnson',
      email: '',
      specialization: 'Pediatrics',
    },
    {
      id: 0,
      name: 'Dr. James Wilson',
      email: '',
      specialization: 'Internal Medicine',
    },
  ];

  // Load doctors list from API and merge with home page doctors
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoadingDoctors(true);
        const apiDoctors = await getAllDoctors();
        if (!cancelled) {
          // Merge home page doctors with API doctors
          // If a home page doctor exists in API (by name match), use API version
          // Otherwise, add home page doctor with a unique negative ID
          const mergedDoctors: Doctor[] = [...apiDoctors];
          
          homePageDoctors.forEach((homeDoctor, index) => {
            const existsInApi = apiDoctors.some(
              apiDoc => apiDoc.name.toLowerCase() === homeDoctor.name.toLowerCase()
            );
            if (!existsInApi) {
              // Add with negative ID to avoid conflicts
              mergedDoctors.push({
                ...homeDoctor,
                id: -(index + 1), // Negative IDs for home page doctors not in API
              });
            }
          });
          
          setDoctors(mergedDoctors);
        }
      } catch (err) {
        console.error('Failed to load doctors:', err);
        // If API fails, still show home page doctors
        if (!cancelled) {
          setDoctors(homePageDoctors.map((doc, index) => ({
            ...doc,
            id: -(index + 1),
          })));
        }
      } finally {
        if (!cancelled) setLoadingDoctors(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Load availability when doctor and date are selected
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!formData.doctorId || !selectedDate) {
        setAvailability(null);
        return;
      }
      
      // For home page doctors (negative IDs), skip API call and show all slots as available
      if (formData.doctorId < 0) {
        setAvailability(null); // Will be handled in availableSlots logic
        setLoadingAvailability(false);
        return;
      }
      
      try {
        setLoadingAvailability(true);
        const dateStr = selectedDate.toISOString().split('T')[0];
        const data = await getDoctorAvailability(formData.doctorId, dateStr);
        if (cancelled) return;
        setAvailability(data);
      } catch {
        if (!cancelled) setAvailability(null);
      } finally {
        if (!cancelled) setLoadingAvailability(false);
      }
    })();
    return () => { cancelled = true; };
  }, [formData.doctorId, selectedDate]);

  // Helper function to convert 24-hour time to 12-hour format
  const convertTo12Hour = (time24: string): string => {
    // If already in 12-hour format, return as is
    if (time24.includes('AM') || time24.includes('PM')) {
      return time24.trim();
    }
    
    // Parse 24-hour format (e.g., "09:00", "14:30")
    const match = time24.match(/(\d{1,2}):(\d{2})/);
    if (!match) return time24;
    
    let hour = parseInt(match[1]);
    const minutes = match[2];
    
    if (hour === 0) return `12:${minutes} AM`;
    if (hour < 12) return `${hour}:${minutes} AM`;
    if (hour === 12) return `12:${minutes} PM`;
    return `${hour - 12}:${minutes} PM`;
  };

  // Helper function to normalize time for comparison
  const normalizeTimeForComparison = (time: string): string => {
    // Remove AM/PM and spaces, keep only numbers and colon
    let normalized = time.replace(/ AM| PM/gi, '').replace(/\s/g, '').trim();
    // Ensure format is H:MM or HH:MM
    const parts = normalized.split(':');
    if (parts.length === 2) {
      const hour = parseInt(parts[0]);
      const min = parts[1];
      return `${hour}:${min}`;
    }
    return normalized;
  };

  // Predefined time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
  ];

  // Get available time slots for selected date
  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    
    // For home page doctors (negative IDs), show all slots as available
    if (formData.doctorId < 0) {
      return timeSlots; // Return all predefined time slots
    }
    
    if (!availability) return [];
    
    const selectedKey = selectedDate.toISOString().split('T')[0];
    return availability.availableSlots
      .filter((s) => {
        const d = new Date(s.date);
        const key = d.toISOString().split('T')[0];
        return key === selectedKey && s.isAvailable;
      })
      .map((s) => convertTo12Hour(s.startTime));
  }, [availability, selectedDate, formData.doctorId]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'doctorId' ? parseInt(value) : value,
    }));
    setError(null);
    if (name === 'doctorId') {
      setSelectedDate(null);
      setSelectedTime('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
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

    if (!selectedDate) {
      setError('Please select an appointment date');
      setLoading(false);
      return;
    }

    if (!selectedTime) {
      setError('Please select an available time slot');
      setLoading(false);
      return;
    }

    try {
      const appointmentDate = selectedDate.toISOString().split('T')[0] + 'T00:00:00';
      // Convert time back to 24-hour format if needed for API
      const timeSlot = selectedTime;
      await createAppointment({
        doctorId: formData.doctorId,
        appointmentDate,
        timeSlot: timeSlot,
        reasonForVisit: formData.reasonForVisit || undefined,
      });
      setSuccess(true);
      
      // Reset form
      setSelectedDate(null);
      setSelectedTime('');
      setFormData({
        doctorId: 0,
        reasonForVisit: 'New Patient Visit',
        notes: '',
      });

      // Show success message and redirect
      setTimeout(() => {
        setSuccess(false);
        router.push('/appointment-confirmation');
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create appointment';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const reasons = [
    'New Patient Visit',
    'Follow-up',
    'Consultation',
    'Check-up',
    'Emergency',
    'Other'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Your Appointments</h1>
          <p className="text-lg text-gray-600">Book, view, or manage your appointments online with ease.</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-800 font-semibold">✓ Appointment created successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-800"><strong>Error:</strong> {error}</p>
          </div>
        )}

        {/* Main Content */}
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Card 1: Select a Date */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">1. Select a Date</h2>
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </div>

              {/* Card 2: Choose a Time */}
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. Choose a Time</h2>
                {selectedDate ? (
                  <>
                    <p className="text-sm text-gray-600 mb-4">{formatDate(selectedDate)}</p>
                    {loadingAvailability ? (
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-500">Loading availability...</p>
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-500 text-center">
                          {formData.doctorId ? 'No available slots for this date' : 'Please select a doctor first'}
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 mb-4 flex-1">
                        {timeSlots.map((time) => {
                          // Check if this time slot is available
                          const isAvailable = availableSlots.length > 0 && availableSlots.some(slot => {
                            const slotNormalized = normalizeTimeForComparison(slot);
                            const timeNormalized = normalizeTimeForComparison(time);
                            // Compare normalized times
                            return slotNormalized === timeNormalized;
                          });
                          const isSelected = selectedTime === time;
                          
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => isAvailable && handleTimeSelect(time)}
                              disabled={!isAvailable}
                              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                                isSelected
                                  ? 'bg-blue-600 text-white shadow-md'
                                  : isAvailable
                                  ? 'bg-gray-100 text-gray-800 hover:bg-blue-50 hover:border-blue-300 border border-gray-200'
                                  : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading || !selectedTime || !formData.doctorId}
                      className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
                    >
                      {loading ? 'Confirming...' : 'Confirm Booking'}
                    </button>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500 text-center">Please select a date first</p>
                  </div>
                )}
              </div>

              {/* Card 3: Provide Details */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">3. Provide Details</h2>
                <div className="space-y-4">
                  {/* Reason for Visit */}
                  <div>
                    <label htmlFor="reasonForVisit" className="block text-sm font-semibold text-gray-700 mb-2">
                      Reason for Visit
                    </label>
                    <select
                      id="reasonForVisit"
                      name="reasonForVisit"
                      value={formData.reasonForVisit}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      disabled={loading}
                    >
                      {reasons.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select a Doctor */}
                  <div>
                    <label htmlFor="doctorId" className="block text-sm font-semibold text-gray-700 mb-2">
                      Select a Doctor
                    </label>
                    <select
                      id="doctorId"
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      disabled={loading || loadingDoctors}
                      required
                    >
                      <option value={0}>Select a doctor...</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} {doctor.specialization ? `(${doctor.specialization})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Please provide any relevant information..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
