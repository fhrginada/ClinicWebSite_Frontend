/**
 * MOCK DATA - TEMPORARY
 * Frontend-only mock data for testing when backend is unavailable
 * 
 * This file now imports comprehensive mock data from JSON files
 * while maintaining backward compatibility with existing interfaces
 */

import { doctors, patients, nurses, medicalRecords, prescriptions, testResults } from './dataLoader';

export interface MockDoctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
  availableTimes?: string[];
  phone?: string;
  specialization?: string;
  licenseNumber?: string;
  bio?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  yearsOfExperience?: number;
  education?: Array<{ degree: string; institution: string; year: string }>;
  languages?: string[];
  profilePicture?: string | null;
}

export interface MockPatient {
  id: number;
  name: string;
  age: number;
  gender: string;
  email?: string;
  phone?: string;
}

export interface MockAppointment {
  id: number;
  doctorId: number;
  patientId?: number;
  patientName: string;
  doctorName?: string;
  date: string;
  time: string;
  timeSlot?: string;
  status: string;
  reasonForVisit?: string;
  notes?: string;
  appointmentDate?: string;
}

export interface MockNotification {
  id: number;
  message: string;
  read: boolean;
  createdAt?: string;
}

// Export comprehensive data from JSON files
export const mockDoctors: MockDoctor[] = doctors.map(d => ({
  id: d.id,
  name: d.name,
  specialty: d.specialization,
  specialization: d.specialization,
  email: d.email,
  phone: d.phone,
  availableTimes: d.availableTimes,
  licenseNumber: d.licenseNumber,
  bio: d.bio,
  address: d.address,
  dateOfBirth: d.dateOfBirth,
  gender: d.gender,
  yearsOfExperience: d.yearsOfExperience,
  education: d.education,
  languages: d.languages,
}));

export const mockPatients: MockPatient[] = patients.map(p => ({
  id: p.id,
  name: p.name,
  age: p.age,
  gender: p.gender,
  email: p.email,
  phone: p.phone,
}));

export const mockAppointments: MockAppointment[] = [
  {
    id: 1,
    doctorId: 1,
    patientId: 1,
    patientName: "Sara Ahmed",
    doctorName: "Dr. Emily Carter",
    date: "2025-01-10",
    time: "11:00",
    timeSlot: "11:00 AM",
    appointmentDate: "2025-01-10T00:00:00",
    status: "Upcoming",
    reasonForVisit: "Check-up",
  },
  {
    id: 2,
    doctorId: 2,
    patientId: 2,
    patientName: "Omar Hassan",
    doctorName: "Dr. John Smith",
    date: "2025-01-08",
    time: "14:30",
    timeSlot: "2:30 PM",
    appointmentDate: "2025-01-08T00:00:00",
    status: "Completed",
    reasonForVisit: "Follow-up",
  },
  {
    id: 3,
    doctorId: 3,
    patientId: 3,
    patientName: "Fatima Ali",
    doctorName: "Dr. Evelyn Reed",
    date: "2025-01-15",
    time: "10:00",
    timeSlot: "10:00 AM",
    appointmentDate: "2025-01-15T00:00:00",
    status: "Upcoming",
    reasonForVisit: "New Patient Visit",
  },
];

export const mockNotifications: MockNotification[] = [
  {
    id: 1,
    message: "New appointment booked",
    read: false,
    createdAt: "2025-01-07T10:00:00",
  },
  {
    id: 2,
    message: "Appointment confirmed",
    read: true,
    createdAt: "2025-01-06T14:30:00",
  },
  {
    id: 3,
    message: "Your appointment is tomorrow",
    read: false,
    createdAt: "2025-01-09T09:00:00",
  },
];

// Helper function to generate availability slots for a doctor
export function generateMockAvailability(
  doctorId: number,
  startDate?: string,
  days: number = 7
): Array<{
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}> {
  const doctor = mockDoctors.find(d => d.id === doctorId);
  if (!doctor) return [];

  const slots: Array<{
    date: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }> = [];

  const start = startDate ? new Date(startDate) : new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayOfWeek = dayNames[currentDate.getDay()];

    // Generate slots for this doctor's available times
    const availableTimes = doctor.availableTimes || ["09:00", "10:00", "11:00", "13:00", "14:00"];
    
    availableTimes.forEach(time => {
      const [hours, minutes] = time.split(':');
      const endHour = parseInt(hours) + 1;
      const endTime = `${endHour.toString().padStart(2, '0')}:${minutes}`;
      
      slots.push({
        date: dateStr,
        dayOfWeek,
        startTime: time,
        endTime,
        isAvailable: true,
      });
    });
  }

  return slots;
}

// Export comprehensive data for direct access
export { doctors, patients, nurses, medicalRecords, prescriptions, testResults } from './dataLoader';
export * from './dataLoader';

