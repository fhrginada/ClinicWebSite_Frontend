'use client';

import { useState } from 'react';
import { Search, Filter, Download, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface Appointment {
  id: string;
  time: string;
  patientName: string;
  patientId: string;
  status: 'completed' | 'cancelled' | 'pending' | 'upcoming';
}

// Mock appointments data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    time: '09:00 AM',
    patientName: 'John Smith',
    patientId: 'PAT001',
    status: 'completed',
  },
  {
    id: '2',
    time: '10:30 AM',
    patientName: 'Maria Rodriguez',
    patientId: 'PAT002',
    status: 'upcoming',
  },
  {
    id: '3',
    time: '11:00 AM',
    patientName: 'Ahmed Ali',
    patientId: 'PAT003',
    status: 'pending',
  },
  {
    id: '4',
    time: '02:00 PM',
    patientName: 'Emily Chen',
    patientId: 'PAT004',
    status: 'upcoming',
  },
  {
    id: '5',
    time: '03:30 PM',
    patientName: 'David Brown',
    patientId: 'PAT005',
    status: 'cancelled',
  },
];

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
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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

      {/* Table */}
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
    </div>
  );
}

