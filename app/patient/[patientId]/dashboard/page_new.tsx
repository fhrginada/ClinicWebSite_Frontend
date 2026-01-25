'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/components/patient/Sidebar';
import Topbar from '@/components/patient/Topbar';
import { Calendar, MessageSquare, Bell, CheckCircle2, RefreshCw } from 'lucide-react';
import { getMockAuth } from '@/src/auth/mockAuth';
import { getMyMedicalHistory } from '@/src/services/medical-history.service';
import { getPrescriptionsByPatient } from '@/src/mocks/dataLoader';
import { getMyAppointments } from '@/src/services/appointment.service';
import { mockNotifications } from '@/src/mocks/mockData';

export default function PatientDashboard() {
  const router = useRouter();
  const params = useParams();
  const patientId = params?.patientId ? parseInt(params.patientId as string, 10) : null;
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Auth guard - check role and user ID
  useEffect(() => {
    const checkAuth = () => {
      console.log('=== Dashboard Auth Check ===');
      console.log('patientId from URL:', patientId);
      console.log('localStorage values:');
      if (typeof window !== 'undefined') {
        console.log('clinic.mockAuth:', window.localStorage.getItem('clinic.mockAuth'));
        console.log('clinic.mockRole:', window.localStorage.getItem('clinic.mockRole'));
        console.log('clinic.mockUserId:', window.localStorage.getItem('clinic.mockUserId'));
        console.log('clinic.mockUserName:', window.localStorage.getItem('clinic.mockUserName'));
      }
      
      const auth = getMockAuth();
      console.log('getMockAuth() result:', auth);
      
      if (!auth.isAuthenticated || auth.role !== 'Patient') {
        console.log('Not authenticated or not patient, redirecting to login');
        router.replace('/login');
        return;
      }
      
      // Verify the patient ID matches the logged-in user
      if (patientId && auth.userId !== patientId) {
        console.log(`PatientId mismatch: URL=${patientId}, Auth=${auth.userId}, redirecting`);
        router.replace(`/patient/${auth.userId}/dashboard`);
        return;
      }
      
      if (!patientId && auth.userId) {
        console.log('No patientId in URL but have userId, redirecting to:', `/patient/${auth.userId}/dashboard`);
        router.replace(`/patient/${auth.userId}/dashboard`);
        return;
      }
      
      console.log('Authorization successful!');
      setIsAuthorized(true);
    };

    checkAuth();
  }, [router, patientId]);

  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [activePrescriptions, setActivePrescriptions] = useState(0);
  const [recentVisits, setRecentVisits] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchDashboardData = useCallback(async () => {
    if (!isAuthorized || !patientId) return;
    
    setIsLoading(true);
    try {
      // Fetch appointments
      const appointments = await getMyAppointments();
      const upcoming = appointments.filter(apt => 
        apt.status === 'Upcoming' || apt.status === 'Pending'
      ).length;
      setUpcomingAppointments(upcoming);

      // Fetch patient's medical history
      const medicalHistory = await getMyMedicalHistory(patientId);
      setRecentVisits(medicalHistory.total);

      // Fetch patient's prescriptions
      const prescriptions = getPrescriptionsByPatient(patientId);
      setActivePrescriptions(prescriptions.filter(p => p.status === 'Active').length);

      // Fetch unread notifications
      const unread = mockNotifications.filter(n => !n.read).length;
      setUnreadNotifications(unread);
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthorized, patientId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleRefresh = () => {
    fetchDashboardData();
  };

  // Don't render until authorized
  if (!isAuthorized || !patientId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientId={patientId} />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            <p className="text-gray-600">
              Here's an overview of your health information and upcoming activities.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Upcoming Appointments Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/patient/appointments')}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {isLoading ? '...' : upcomingAppointments}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Upcoming Appointments</h3>
            <p className="text-sm text-gray-600">You have {upcomingAppointments} scheduled visits</p>
          </div>

          {/* Active Prescriptions Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {isLoading ? '...' : activePrescriptions}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Prescriptions</h3>
            <p className="text-sm text-gray-600">{activePrescriptions} medications in use</p>
          </div>

          {/* Notifications Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/patient/notifications')}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {isLoading ? '...' : unreadNotifications}
                </span>
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
            <button
              type="button"
              onClick={() => router.push('/appointment')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Book Appointment</span>
            </button>
            <button
              type="button"
              onClick={() => router.push('/patient/consultations')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Message Doctor</span>
            </button>
            <button
              type="button"
              onClick={() => router.push('/patient/medical-history')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">View Results</span>
            </button>
            <button
              type="button"
              onClick={() => router.push('/patient/notifications')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors cursor-pointer"
            >
              <Bell className="w-8 h-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">View Notifications</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
