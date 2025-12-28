// Mock appointment service - frontend only
export interface AppointmentResponse {
  id: number;
  patientId: number;
  patientName: string;
  appointmentDate: string;
  timeSlot: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  reasonForVisit?: string;
  doctorName?: string;
  doctorSpecialization?: string;
}

export interface CreateAppointmentPayload {
  doctorId: number;
  appointmentDate: string;
  timeSlot: string;
  reasonForVisit?: string;
}

export async function getAllAppointments(): Promise<AppointmentResponse[]> {
  // Mock data - frontend only
  return [
    {
      id: 1,
      patientId: 1,
      patientName: 'John Doe',
      appointmentDate: new Date().toISOString(),
      timeSlot: '10:00 AM',
      status: 'Confirmed',
      reasonForVisit: 'Regular checkup',
      doctorName: 'Dr. Ahmed Nabel',
      doctorSpecialization: 'General Medicine',
    },
    {
      id: 2,
      patientId: 2,
      patientName: 'Jane Smith',
      appointmentDate: new Date(Date.now() + 86400000).toISOString(),
      timeSlot: '2:00 PM',
      status: 'Pending',
      reasonForVisit: 'Follow-up',
      doctorName: 'Dr. Sarah Johnson',
      doctorSpecialization: 'Cardiology',
    },
  ];
}

export async function getMyAppointments(): Promise<AppointmentResponse[]> {
  // Mock data - frontend only
  return getAllAppointments();
}

export async function createAppointment(payload: CreateAppointmentPayload): Promise<AppointmentResponse> {
  // Mock implementation - frontend only
  return {
    id: Date.now(),
    patientId: 1,
    patientName: 'Patient Name',
    appointmentDate: payload.appointmentDate,
    timeSlot: payload.timeSlot,
    status: 'Pending',
    reasonForVisit: payload.reasonForVisit,
    doctorName: 'Dr. Unknown',
    doctorSpecialization: 'General Medicine',
  };
}

