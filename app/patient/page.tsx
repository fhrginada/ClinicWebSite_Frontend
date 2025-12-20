'use client';

import Sidebar from '@/components/patient/Sidebar';
import Topbar from '@/components/patient/Topbar';
import { Calendar, MessageSquare, Bell, CheckCircle2 } from 'lucide-react';

export default function PatientDashboard() {
  // Mock data
  const upcomingAppointments = 3;
  const activeConsultations = 2;
  const unreadNotifications = 5;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h2>
            <p className="text-gray-600">
              Here's an overview of your health information and upcoming activities.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Upcoming Appointments Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{upcomingAppointments}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Upcoming Appointments</h3>
            <p className="text-sm text-gray-600">You have {upcomingAppointments} scheduled visits</p>
          </div>

          {/* Active Consultations Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{activeConsultations}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Consultations</h3>
            <p className="text-sm text-gray-600">Ongoing conversations with doctors</p>
          </div>

          {/* Notifications Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">{unreadNotifications}</span>
                {unreadNotifications > 0 && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Notifications</h3>
            <p className="text-sm text-gray-600">{unreadNotifications} unread messages</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Book Appointment</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
              <MessageSquare className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Message Doctor</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <CheckCircle2 className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">View Results</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
              <Bell className="w-8 h-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">View Notifications</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

