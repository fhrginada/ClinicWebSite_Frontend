'use client';

import { useEffect, useMemo, useState } from 'react';
import Sidebar from '@/components/patient/Sidebar';
import Topbar from '@/components/patient/Topbar';
import StatusBadge from '@/components/doctor/StatusBadge';
import { Search, Filter } from 'lucide-react';
import { getMyAppointments, type AppointmentResponse } from '@/src/services/appointment.service';

type AppointmentRow = Pick<
  AppointmentResponse,
  'id' | 'appointmentDate' | 'timeSlot' | 'doctorName' | 'doctorSpecialization' | 'reasonForVisit' | 'status'
>;

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('All');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const data = await getMyAppointments();
        if (cancelled) return;
        setAppointments(
          data.map((a) => ({
            id: a.id,
            appointmentDate: a.appointmentDate,
            timeSlot: a.timeSlot,
            doctorName: a.doctorName,
            doctorSpecialization: a.doctorSpecialization,
            reasonForVisit: a.reasonForVisit,
            status: a.status,
          }))
        );
      } catch (e: any) {
        if (cancelled) return;
        setLoadError(e?.response?.data?.message ?? 'Failed to load appointments.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const matchesSearch = 
        apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (apt.reasonForVisit ?? '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
      
      const matchesDate = (() => {
        if (dateFilter === 'All') return true;
        const aptDate = new Date(apt.appointmentDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (dateFilter === 'Upcoming') {
          return aptDate >= today && apt.status !== 'Completed' && apt.status !== 'Cancelled';
        }
        if (dateFilter === 'Past') {
          return aptDate < today || apt.status === 'Completed' || apt.status === 'Cancelled';
        }
        return true;
      })();
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, searchQuery, statusFilter, dateFilter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatTimeSlot = (slot: string) => {
    const parts = slot.split(' - ').map((s) => s.trim());
    if (parts.length === 2) {
      return `${formatTime(parts[0])} - ${formatTime(parts[1])}`;
    }
    if (parts.length === 1 && parts[0].includes(':')) return formatTime(parts[0]);
    return slot;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
            <p className="text-gray-600">View and manage all your appointments</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by doctor name or reason..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-none cursor-pointer"
            >
              <option value="All">All Dates</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Past">Past</option>
            </select>
            
            <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500">
                      Loading appointments...
                    </td>
                  </tr>
                ) : loadError ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500">
                      {loadError}
                    </td>
                  </tr>
                ) : filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-base font-medium">No appointments found</p>
                        <p className="text-sm text-gray-400">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                        {formatDate(appointment.appointmentDate)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {formatTimeSlot(appointment.timeSlot)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                        {appointment.doctorName}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {appointment.doctorSpecialization}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {appointment.reasonForVisit}
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={appointment.status as any} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          {filteredAppointments.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

