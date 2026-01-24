'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import { Settings as SettingsIcon, Bell, Lock, Shield } from 'lucide-react';
import { getMockAuth } from '@/src/auth/mockAuth';

export default function SettingsPage() {
  const router = useRouter();
  const [doctorId, setDoctorId] = useState<number | null>(null);

  useEffect(() => {
    const auth = getMockAuth();
    if (!auth.isAuthenticated || auth.role !== 'Doctor') {
      router.replace('/login');
      return;
    }
    setDoctorId(auth.userId || null);
  }, [router]);

  if (!doctorId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar doctorId={doctorId} />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <div className="space-y-6">
            {/* Notification Settings */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-gray-700">Email notifications</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-gray-700">SMS notifications</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-gray-700">Appointment reminders</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-gray-700">Patient updates</span>
                </label>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Privacy Settings</h2>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-gray-700">Show availability to patients</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-gray-700">Allow data analytics</span>
                </label>
              </div>
            </div>

            {/* Security Settings */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
              </div>
              <div className="space-y-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Change Password
                </button>
                <button className="px-6 py-3 bg-white text-red-600 border border-red-300 rounded-lg font-medium hover:bg-red-50 transition-colors ml-4">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

