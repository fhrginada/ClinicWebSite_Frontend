import api from './api';

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
  startDate: string;
  endDate: string;
  availableSlots: Array<{
    date: string;
    timeSlots: string[];
  }>;
}

/**
 * Get doctor by ID
 */
export async function getDoctorById(id: number): Promise<Doctor> {
  try {
    const response = await api.get<Doctor>(`/api/doctors/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching doctor ${id}:`, error);
    throw error;
  }
}

/**
 * Get doctor availability
 * @param id - Doctor ID
 * @param startDate - Optional start date (ISO string). Defaults to today
 * @param days - Optional number of days to fetch. Defaults to 7
 */
export async function getDoctorAvailability(
  id: number,
  startDate?: string,
  days?: number
): Promise<DoctorAvailability> {
  try {
    const params: Record<string, string> = {};
    if (startDate) {
      params.startDate = startDate;
    }
    if (days) {
      params.days = days.toString();
    }

    const response = await api.get<DoctorAvailability>(
      `/api/doctors/${id}/availability`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching availability for doctor ${id}:`, error);
    throw error;
  }
}

