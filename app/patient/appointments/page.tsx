'use client';

import { useState, useMemo } from 'react';
import Sidebar from '@/components/patient/Sidebar';
import Topbar from '@/components/patient/Topbar';
import StatusBadge from '@/components/doctor/StatusBadge';
import { Search, Filter } from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  doctorSpecialization: string;
  reason: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

// Mock data generator
const generateMockAppointments = (): Appointment[] => {
  const appointments: Appointment[] = [];
  const today = new Date();
  const doctors = [
    { name: 'Dr. Ahmed Nabel', specialization: 'Cardiology' },
    { name: 'Dr. Sarah Williams', specialization: 'General Medicine' },
    { name: 'Dr. Michael Brown', specialization: 'Dermatology' },
    { name: 'Dr. Emily Chen', specialization: 'Pediatrics' },
  ];
  const statuses: ('Pending' | 'Confirmed' | 'Completed' | 'Cancelled')[] = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
  const times = ['09:00', '10:30', '11:15', '13:00', '14:30', '15:45', '16:00'];
  const reasons = [
    'General Checkup',
    'Follow-up Visit',
    'Blood Test',
    'Consultation',
    'Vaccination',
    'X-Ray Review',
    'Prescription Refill',
    'Annual Physical'
  ];

  // Generate past appointments (last 30 days)
  for (let day = 30; day >= 0; day--) {
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() - day);
    
    if (Math.random() > 0.7) { // 30% chance of appointment per day
      const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
      const randomStatus = day < 0 ? 'Completed' : statuses[Math.floor(Math.random() * statuses.length)];
      
      appointments.push({
        id: `APT-${String(1000 + appointments.length).padStart(4, '0')}`,
        date: appointmentDate.toISOString().split('T')[0],
        time: randomTime,
        doctorName: randomDoctor.name,
        doctorSpecialization: randomDoctor.specialization,
        reason: randomReason,
        status: randomStatus as 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled',
      });
    }
  }

  // Generate future appointments (next 30 days)
  for (let day = 1; day <= 30; day++) {
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + day);
    
    if (Math.random() > 0.8) { // 20% chance of appointment per day
      const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
      const randomStatus = day <= 7 ? (Math.random() > 0.5 ? 'Confirmed' : 'Pending') : 'Pending';
      
      appointments.push({
        id: `APT-${String(1000 + appointments.length).padStart(4, '0')}`,
        date: appointmentDate.toISOString().split('T')[0],
        time: randomTime,
        doctorName: randomDoctor.name,
        doctorSpecialization: randomDoctor.specialization,
        reason: randomReason,
        status: randomStatus as 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled',
      });
    }
  }

  return appointments.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });
};

export default function AppointmentsPage() {
  const [appointments] = useState<Appointment[]>(generateMockAppointments());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('All');

  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const matchesSearch = 
        apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.reason.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
      
      const matchesDate = (() => {
        if (dateFilter === 'All') return true;
        const aptDate = new Date(apt.date);
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
                {filteredAppointments.length === 0 ? (
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
                        {formatDate(appointment.date)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {formatTime(appointment.time)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                        {appointment.doctorName}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {appointment.doctorSpecialization}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {appointment.reason}
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={appointment.status} />
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

