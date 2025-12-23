'use client';

import { useState, useEffect, useMemo } from 'react';
import Sidebar from '@/components/nurse/Sidebar';
import Topbar from '@/components/nurse/Topbar';
import TodayAppointmentTable from '@/components/nurse/TodayAppointmentTable';
import { getAllAppointments, AppointmentResponse } from '@/src/services/appointment.service';

export default function NurseDashboard() {
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAllAppointments();
        setAppointments(data);
      } catch (err) {
        console.error('Error loading appointments:', err);
        setError('Failed to load appointments. Please try again later.');
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.appointmentDate);
      aptDate.setHours(0, 0, 0, 0);
      return aptDate.getTime() === today.getTime();
    });

    const upcomingAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.appointmentDate);
      aptDate.setHours(0, 0, 0, 0);
      return aptDate.getTime() > today.getTime() && apt.status !== 'Completed' && apt.status !== 'Cancelled';
    });

    return {
      totalAppointments: appointments.length,
      todayAppointments: todayAppointments.length,
      upcomingAppointments: upcomingAppointments.length,
    };
  }, [appointments]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Appointments</h3>
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Today's Appointments</h3>
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl font-bold text-blue-600">{stats.todayAppointments}</p>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Upcoming Appointments</h3>
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl font-bold text-green-600">{stats.upcomingAppointments}</p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Appointments Table */}
        <TodayAppointmentTable />
      </main>
    </div>
  );
}


