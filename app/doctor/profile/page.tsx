import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import DoctorProfileClient from './components/DoctorProfileClient';

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

function getDoctorData(): DoctorData {
  // Mock doctor data
  return {
    id: '1',
    name: 'Dr. Ahmed Nabel',
    email: 'ahmed.nabel@clinic.com',
    phone: '+1 234-567-8900',
    specialization: 'General Medicine',
    licenseNumber: 'MD-12345',
    bio: 'Experienced general practitioner with over 15 years of experience in patient care.',
    address: '123 Medical Center Dr, City, State 12345',
    dateOfBirth: '1980-01-15',
    gender: 'Male',
    yearsOfExperience: 15,
    education: [
      { degree: 'MD', institution: 'Medical University', year: '2005' },
      { degree: 'Residency', institution: 'General Hospital', year: '2008' },
    ],
    languages: ['English', 'Arabic'],
    profilePicture: null,
  };
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

