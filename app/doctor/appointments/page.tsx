'use client';

import { useState, useMemo, useEffect } from 'react';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import AppointmentTable from '@/components/doctor/AppointmentTable';
import {
  getMyDoctorAppointments,
  updateAppointmentStatus,
  AppointmentResponse as ApiAppointment,
} from '@/src/services/appointment.service';

interface Appointment {
  id: number;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  reason: string;
}

// Helper to transform API appointment to component format
const transformAppointment = (apt: ApiAppointment): Appointment => ({
  id: apt.id,
  patientName: apt.patientName,
  patientId: String(apt.patientId),
  date: apt.appointmentDate?.split('T')[0] ?? '',
  time: (apt.timeSlot || '').split('-')[0].trim(),
  status: apt.status as 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled',
  reason: apt.reasonForVisit || 'General Consultation',
});

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const allAppointments = await getMyDoctorAppointments();
        
        // Filter appointments for next 7 days
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sevenDaysLater = new Date(today);
        sevenDaysLater.setDate(today.getDate() + 7);
        
        const filteredAppointments = allAppointments
          .filter((apt: ApiAppointment) => {
            const aptDate = new Date(apt.appointmentDate);
            aptDate.setHours(0, 0, 0, 0);
            return aptDate >= today && aptDate <= sevenDaysLater;
          })
          .map(transformAppointment)
          .sort((a, b) => {
            const dateCompare = a.date.localeCompare(b.date);
            if (dateCompare !== 0) return dateCompare;
            return a.time.localeCompare(b.time);
          });

        setAppointments(filteredAppointments);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments. Please try again later.');
        // Keep empty array - will show "No appointments found"
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter appointments by date (next 7 days)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysLater = new Date(today);
  sevenDaysLater.setDate(today.getDate() + 7);

  const filteredByDate = useMemo(() => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);
      return aptDate >= today && aptDate <= sevenDaysLater;
    });
  }, [appointments]);

  // Apply search and status filters
  const filteredAppointments = useMemo(() => {
    return filteredByDate.filter(apt => {
      const matchesSearch = 
        apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.patientId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [filteredByDate, searchQuery, statusFilter]);

  const handleStatusChange = async (appointmentId: number, newStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled') => {
    try {
      // Optimistically update UI
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        )
      );

      // Update on backend
      await updateAppointmentStatus({
        appointmentId,
        status: newStatus,
      });
    } catch (error) {
      console.error('Error updating appointment status:', error);
      // Revert optimistic update on error
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? { ...apt, status: apt.status } : apt
        )
      );
      alert('Failed to update appointment status. Please try again.');
    }
  };

  const handleEditAppointment = (
    appointmentId: number,
    updatedData: { date: string; time: string; reason: string }
  ) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId
          ? { ...apt, ...updatedData }
          : apt
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
            <p className="text-gray-600 mb-1">Manage all upcoming patient visits</p>
            <p className="text-sm text-gray-500">Next 7 days</p>
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
            /* Appointment Table */
            <AppointmentTable
            appointments={filteredAppointments}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            onSearchChange={setSearchQuery}
            onStatusFilterChange={setStatusFilter}
            onStatusChange={handleStatusChange}
              onEditAppointment={handleEditAppointment}
            />
          )}
        </div>
      </main>
    </div>
  );
}

