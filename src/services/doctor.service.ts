// Mock doctor service - frontend only
export interface Doctor {
  id: number;
  name: string;
  email: string;
  phone?: string;
  specialization?: string;
  bio?: string;
  profilePicture?: string;
  yearsOfExperience?: number;
  licenseNumber?: string;
}

export interface DoctorAvailability {
  doctorId: number;
  date: string;
  availableSlots: Array<{
    date: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }>;
}

export async function getAllDoctors(): Promise<Doctor[]> {
  // Mock data - frontend only
  return [
    {
      id: 1,
      name: 'Dr. Ahmed Nabel',
      email: 'ahmed.nabel@clinic.com',
      phone: '+1 234-567-8900',
      specialization: 'General Medicine',
      bio: 'Experienced general practitioner with over 15 years of experience.',
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@clinic.com',
      phone: '+1 234-567-8901',
      specialization: 'Cardiology',
      bio: 'Board-certified cardiologist specializing in heart disease prevention.',
    },
    {
      id: 3,
      name: 'Dr. Michael Chen',
      email: 'michael.chen@clinic.com',
      phone: '+1 234-567-8902',
      specialization: 'Pediatrics',
      bio: 'Dedicated pediatrician with a passion for children\'s health.',
    },
  ];
}

export async function getDoctorAvailability(doctorId: number, date: string): Promise<DoctorAvailability> {
  // Mock data - frontend only
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
  ];

  return {
    doctorId,
    date,
    availableSlots: timeSlots.map(time => ({
      date,
      startTime: time,
      endTime: time,
      isAvailable: true,
    })),
  };
}

