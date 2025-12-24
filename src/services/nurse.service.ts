/**
 * MOCK MODE - Frontend only
 */

export interface Nurse {
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
  profilePicture?: string | null;
}

export interface NotificationPayload {
  doctorId: number;
  message: string;
  appointmentId?: string;
}

// Mock nurse data
const mockNurses: Nurse[] = [
  {
    id: 1,
    name: 'Nurse Jane Doe',
    email: 'jane.doe@intelliclinic.com',
    phone: '+1-555-0301',
    specialization: 'General Nursing',
  },
];

/**
 * Send notification to doctor - MOCK
 */
export async function notifyDoctor(payload: NotificationPayload): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200));
  console.log('📬 MOCK: Notification sent to doctor:', payload);
}

/**
 * Get nurse by ID - MOCK
 */
export async function getNurseById(id: number): Promise<Nurse> {
  await new Promise(resolve => setTimeout(resolve, 150));
  const nurse = mockNurses.find(n => n.id === id);
  if (!nurse) {
    throw new Error(`Nurse with ID ${id} not found`);
  }
  return nurse;
}

/**
 * Update nurse information - MOCK
 */
export async function updateNurse(id: number, payload: Partial<Nurse>): Promise<Nurse> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const nurse = mockNurses.find(n => n.id === id);
  if (!nurse) {
    throw new Error(`Nurse with ID ${id} not found`);
  }
  Object.assign(nurse, payload);
  console.log('👩‍⚕️ MOCK: Nurse updated:', id);
  return nurse;
}

