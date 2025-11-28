'use client';

import { useState, useMemo } from 'react';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import AppointmentTable from '@/components/doctor/AppointmentTable';

// Mock data generator for next 7 days
const generateMockAppointments = () => {
  const appointments = [];
  const today = new Date();
  const statuses: ('Pending' | 'Confirmed' | 'Completed' | 'Cancelled')[] = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
  const times = ['09:00', '10:30', '11:15', '13:00', '14:30', '15:45', '16:00'];
  const patientNames = [
    'Maria Rodriguez',
    'John Smith',
    'Emily Chen',
    'Robert Johnson',
    'Sarah Williams',
    'Michael Brown',
    'Jessica Davis',
    'David Wilson',
    'Lisa Anderson',
    'James Martinez'
  ];
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

  let appointmentId = 1;
  
  // Generate appointments for next 7 days
  for (let day = 0; day < 7; day++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + day);
    
    // Generate 2-4 appointments per day
    const appointmentsPerDay = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < appointmentsPerDay; i++) {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      const randomPatient = patientNames[Math.floor(Math.random() * patientNames.length)];
      const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
      
      appointments.push({
        id: `APT-${String(appointmentId).padStart(4, '0')}`,
        patientName: randomPatient,
        patientId: `P${String(1000 + appointmentId).padStart(4, '0')}`,
        date: currentDate.toISOString().split('T')[0],
        time: randomTime,
        status: randomStatus,
        reason: randomReason
      });
      
      appointmentId++;
    }
  }
  
  return appointments.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(generateMockAppointments());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

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

  const handleStatusChange = (appointmentId: string, newStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled') => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const handleEditAppointment = (appointmentId: string, updatedData: { date: string; time: string; reason: string }) => {
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

          {/* Appointment Table */}
          <AppointmentTable
            appointments={filteredAppointments}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            onSearchChange={setSearchQuery}
            onStatusFilterChange={setStatusFilter}
            onStatusChange={handleStatusChange}
            onEditAppointment={handleEditAppointment}
          />
        </div>
      </main>
    </div>
  );
}

