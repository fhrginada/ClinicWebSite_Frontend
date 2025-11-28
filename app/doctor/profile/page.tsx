import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import DoctorProfileClient from './components/DoctorProfileClient';

// Mock doctor data - in a real app, this would come from an API or database
async function getDoctorData() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    id: '1',
    name: 'Ahmed Nabel',
    email: 'ahmed.nabel@clinic.com',
    phone: '+20 123 456 7890',
    specialization: 'Cardiology',
    licenseNumber: 'MD-12345',
    bio: 'Experienced cardiologist with over 15 years of practice. Specialized in preventive cardiology and heart disease management.',
    address: '123 Medical Center, Cairo, Egypt',
    dateOfBirth: '1980-05-15',
    gender: 'Male',
    yearsOfExperience: 15,
    education: [
      { degree: 'M.D.', institution: 'Cairo University', year: '2005' },
      { degree: 'Residency', institution: 'National Heart Institute', year: '2010' },
    ],
    languages: ['Arabic', 'English'],
    profilePicture: null, // Will be handled via upload
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

