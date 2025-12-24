/**
 * MOCK MODE - Frontend only
 * All functions return mock data
 */

import { mockDoctors, generateMockAvailability, type MockDoctor } from '@/src/mocks/mockData';

export interface Doctor {
  id: number;
  name: string;
  email: string;
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

export interface DoctorAvailability {
  doctorId: number;
  doctorName: string;
  specialty: string;
  availableSlots: Array<{
    date: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }>;
}

/**
 * Get doctor by ID - MOCK
 */
export async function getDoctorById(id: number): Promise<Doctor> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const doctor = mockDoctors.find(d => d.id === id);
  if (!doctor) {
    throw new Error(`Doctor with ID ${id} not found`);
  }
  
  return {
    id: doctor.id,
    name: doctor.name,
    email: doctor.email,
    phone: doctor.phone,
    specialization: doctor.specialization || doctor.specialty,
    bio: doctor.bio,
    yearsOfExperience: doctor.yearsOfExperience,
  } as Doctor;
}

/**
 * Get all doctors - MOCK
 */
export async function getAllDoctors(): Promise<Doctor[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return mockDoctors.map(doctor => ({
    id: doctor.id,
    name: doctor.name,
    email: doctor.email,
    phone: doctor.phone,
    specialization: doctor.specialization || doctor.specialty,
    bio: doctor.bio,
    yearsOfExperience: doctor.yearsOfExperience,
  })) as Doctor[];
}

/**
 * Get doctor availability - MOCK
 * @param id - Doctor ID
 * @param startDate - Optional start date (ISO string). Defaults to today
 * @param days - Optional number of days to fetch. Defaults to 7
 */
export async function getDoctorAvailability(
  id: number,
  startDate?: string,
  days?: number
): Promise<DoctorAvailability> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const doctor = mockDoctors.find(d => d.id === id);
  if (!doctor) {
    throw new Error(`Doctor with ID ${id} not found`);
  }
  
  const slots = generateMockAvailability(id, startDate, days || 7);
  
  return {
    doctorId: doctor.id,
    doctorName: doctor.name,
    specialty: doctor.specialty,
    availableSlots: slots,
  };
}

