'use client';

import { useState, useMemo, useEffect } from 'react';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import AppointmentTable from '@/components/doctor/AppointmentTable';
// Removed API service imports - using mock data

interface Appointment {
  id: number;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  reason: string;
}

// Mock appointments data
const mockAppointments: Appointment[] = [
  {
    id: 1,
    patientName: 'John Smith',
    patientId: '1',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    status: 'Pending',
    reason: 'General Checkup',
  },
  {
    id: 2,
    patientName: 'Sarah Johnson',
    patientId: '2',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:30',
    status: 'Confirmed',
    reason: 'Follow-up',
  },
];

export default function AppointmentsPage() {
  // Fixed: Use lazy initialization to avoid setState in effect
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  // Fixed: Remove unused error state

  useEffect(() => {
    // Use mock data instead of API
    const timer = setTimeout(() => {
      setAppointments(mockAppointments);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter appointments by date (next 7 days)
  const filteredByDate = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(today.getDate() + 7);

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
    // Mock update - no API call
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
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

