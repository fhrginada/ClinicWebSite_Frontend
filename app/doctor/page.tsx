import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import PrescriptionCard from '@/components/doctor/PrescriptionCard';
import TaskList from '@/components/doctor/TaskList';
import TodayAppointmentTable from '@/components/doctor/TodayAppointmentTable';

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Prescription Card */}
          <PrescriptionCard />
          
          {/* Tasks Card */}
          <TaskList />
        </div>
        
        {/* Appointments Table */}
        <TodayAppointmentTable />
      </main>
    </div>
  );
}

