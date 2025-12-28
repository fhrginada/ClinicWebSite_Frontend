// Mock nurse service - frontend only
export interface Nurse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  specialization?: string;
  licenseNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  yearsOfExperience?: number;
  bio?: string;
}

export async function getNurseById(id: number): Promise<Nurse> {
  // Mock data - frontend only
  return {
    id,
    name: 'Nurse Mary',
    email: 'nurse.mary@clinic.com',
    phone: '+1 234-567-8903',
    department: 'General',
  };
}

export async function updateNurse(id: number, data: Partial<Nurse>): Promise<Nurse> {
  // Mock implementation - frontend only
  const nurse = await getNurseById(id);
  return { ...nurse, ...data };
}

