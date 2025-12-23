import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import DoctorProfileClient from './components/DoctorProfileClient';
import { getDoctorById, Doctor } from '@/src/services/doctor.service';
import { getCurrentDoctorId } from '@/src/utils/doctor';

type DoctorData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  bio: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  yearsOfExperience: number;
  education: Array<{ degree: string; institution: string; year: string }>;
  languages: string[];
  profilePicture: string | null;
};

async function getDoctorData(): Promise<DoctorData> {
  try {
    const doctorId = getCurrentDoctorId();
    const doctor = await getDoctorById(doctorId);
    
    // Transform API response to match component expectations
    return {
      ...doctor,
      id: doctor.id.toString(),
      name: doctor.name || 'Unknown Doctor',
      email: doctor.email || '',
      phone: doctor.phone || '',
      specialization: doctor.specialization || '',
      licenseNumber: doctor.licenseNumber || '',
      bio: doctor.bio || '',
      address: doctor.address || '',
      dateOfBirth: doctor.dateOfBirth || '',
      gender: doctor.gender || '',
      yearsOfExperience: doctor.yearsOfExperience || 0,
      education: doctor.education || [],
      languages: doctor.languages || [],
      profilePicture: doctor.profilePicture || null,
    };
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    // Return fallback data if API fails
    return {
      id: '1',
      name: 'Doctor',
      email: '',
      phone: '',
      specialization: '',
      licenseNumber: '',
      bio: 'Unable to load doctor information. Please try again later.',
      address: '',
      dateOfBirth: '',
      gender: '',
      yearsOfExperience: 0,
      education: [],
      languages: [],
      profilePicture: null,
    };
  }
}

export default async function DoctorProfilePage() {
  const doctorData = await getDoctorData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-72 p-6">
        <Topbar />
        <DoctorProfileClient doctor={doctorData} />
      </main>
    </div>
  );
}

