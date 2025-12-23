'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Download, CheckCircle2, XCircle, Clock } from 'lucide-react';
import {
  getMyDoctorAppointments,
  AppointmentResponse as ApiAppointment,
} from '@/src/services/appointment.service';

interface Appointment {
  id: number;
  time: string;
  patientName: string;
  patientId: string;
  status: 'completed' | 'cancelled' | 'pending' | 'upcoming';
}

// Helper to map API status to component status
const mapStatus = (status: string): 'completed' | 'cancelled' | 'pending' | 'upcoming' => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'completed';
    case 'cancelled':
      return 'cancelled';
    case 'pending':
      return 'pending';
    case 'confirmed':
      return 'upcoming';
    default:
      return 'pending';
  }
};

// Helper to format time from API
const formatTime = (time: string): string => {
  // If time is already formatted (e.g., "09:00 AM"), return as is
  if (time.includes('AM') || time.includes('PM')) {
    return time;
  }
  // If time is in 24-hour format (e.g., "09:00"), convert to 12-hour
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const statusConfig = {
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    className: 'text-green-600',
    bgClassName: 'bg-green-50',
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    className: 'text-red-600',
    bgClassName: 'bg-red-50',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'text-yellow-600',
    bgClassName: 'bg-yellow-50',
  },
  upcoming: {
    label: 'Upcoming',
    icon: Clock,
    className: 'text-blue-600',
    bgClassName: 'bg-blue-50',
  },
};

export default function TodayAppointmentTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const allAppointments = await getMyDoctorAppointments();
        const today = new Date().toISOString().split('T')[0];
        
        // Filter appointments for today and transform to component format
        const todayAppointments: Appointment[] = allAppointments
          .filter((apt: ApiAppointment) => apt.appointmentDate?.split('T')[0] === today)
          .map((apt: ApiAppointment) => ({
            id: apt.id,
            time: formatTime((apt.timeSlot || '').split('-')[0].trim()),
            patientName: apt.patientName,
            patientId: String(apt.patientId),
            status: mapStatus(apt.status),
          }))
          .sort((a, b) => a.time.localeCompare(b.time));

        setAppointments(todayAppointments);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load today\'s appointments. Please try again later.');
        // Keep empty array - will show "No appointments found"
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.patientId.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Appointments</h2>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
              <option value="upcoming">Upcoming</option>
            </select>
            
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} className="text-gray-600" />
            </button>
            
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
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
        /* Table */
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">TIME</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">PATIENT NAME</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">PATIENT ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No appointments found
                  </td>
                </tr>
              ) : (
              filteredAppointments.map((appointment) => {
                const status = statusConfig[appointment.status];
                const StatusIcon = status.icon;
                
                return (
                  <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-900">{appointment.time}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium">{appointment.patientName}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{appointment.patientId}</td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${status.bgClassName}`}>
                        <StatusIcon size={16} className={status.className} />
                        <span className={`text-sm font-medium ${status.className}`}>
                          {status.label}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

