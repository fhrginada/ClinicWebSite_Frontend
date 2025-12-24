/**
 * MOCK DATA - TEMPORARY
 * Frontend-only mock data for testing when backend is unavailable
 */

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

export const mockDoctors: MockDoctor[] = [
  {
    id: 1,
    name: "Dr. Emily Carter",
    specialty: "Cardiology",
    specialization: "Cardiology",
    email: "emily.carter@intelliclinic.com",
    phone: "+1-555-0101",
    availableTimes: ["09:00", "10:30", "11:00", "13:00", "14:00", "15:00"],
    yearsOfExperience: 12,
    bio: "Expert in cardiovascular health",
  },
  {
    id: 2,
    name: "Dr. John Smith",
    specialty: "Dermatology",
    specialization: "Dermatology",
    email: "john.smith@intelliclinic.com",
    phone: "+1-555-0102",
    availableTimes: ["10:00", "12:00", "14:30", "15:30"],
    yearsOfExperience: 8,
    bio: "Specialized in skin care and dermatology",
  },
  {
    id: 3,
    name: "Dr. Evelyn Reed",
    specialty: "Family Medicine",
    specialization: "Family Medicine",
    email: "evelyn.reed@intelliclinic.com",
    phone: "+1-555-0103",
    availableTimes: ["09:00", "10:00", "11:00", "13:00", "14:00"],
    yearsOfExperience: 15,
    bio: "Over 15 years of experience in comprehensive healthcare",
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    specialization: "Cardiology",
    email: "michael.chen@intelliclinic.com",
    phone: "+1-555-0104",
    availableTimes: ["09:30", "10:30", "11:30", "13:30", "14:30"],
    yearsOfExperience: 10,
    bio: "Specialized in heart health and cardiovascular disease prevention",
  },
  {
    id: 5,
    name: "Dr. Sarah Johnson",
    specialty: "Pediatrics",
    specialization: "Pediatrics",
    email: "sarah.johnson@intelliclinic.com",
    phone: "+1-555-0105",
    availableTimes: ["09:00", "10:00", "11:00", "13:00"],
    yearsOfExperience: 7,
    bio: "Dedicated to providing compassionate care for children",
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    specialty: "Internal Medicine",
    specialization: "Internal Medicine",
    email: "james.wilson@intelliclinic.com",
    phone: "+1-555-0106",
    availableTimes: ["10:00", "11:00", "14:00", "15:00"],
    yearsOfExperience: 11,
    bio: "Expert in diagnosing and treating complex medical conditions",
  },
];

export const mockPatients: MockPatient[] = [
  {
    id: 1,
    name: "Sara Ahmed",
    age: 27,
    gender: "Female",
    email: "sara.ahmed@email.com",
    phone: "+1-555-0201",
  },
  {
    id: 2,
    name: "Omar Hassan",
    age: 35,
    gender: "Male",
    email: "omar.hassan@email.com",
    phone: "+1-555-0202",
  },
  {
    id: 3,
    name: "Fatima Ali",
    age: 42,
    gender: "Female",
    email: "fatima.ali@email.com",
    phone: "+1-555-0203",
  },
  {
    id: 4,
    name: "Ahmed Mohamed",
    age: 29,
    gender: "Male",
    email: "ahmed.mohamed@email.com",
    phone: "+1-555-0204",
  },
];

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

