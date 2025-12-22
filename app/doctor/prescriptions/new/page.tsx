import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import AddPrescriptionForm from '@/components/AddPrescriptionForm';

export default function NewPrescriptionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-10">Add New Prescription</h1>
          <AddPrescriptionForm />
        </div>
      </main>
    </div>
  );
}

