import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';

export default function PatientsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-72 p-6">
        <Topbar />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

