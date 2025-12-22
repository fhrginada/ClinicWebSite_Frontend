'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import PrescriptionCard from '@/components/doctor/PrescriptionCard';
import TaskList from '@/components/doctor/TaskList';
import TodayAppointmentTable from '@/components/doctor/TodayAppointmentTable';
import { getPatientsDashboard } from '@/src/services/patient.service';

export default function DoctorDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [patientsStats, setPatientsStats] = useState<{
    totalPatients: number;
    activePatients: number;
  } | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setDashboardError(null);

      try {
        // Fetch patients dashboard data
        try {
          const patientsDashboard = await getPatientsDashboard();
          setPatientsStats({
            totalPatients: patientsDashboard.totalPatients || 0,
            activePatients: patientsDashboard.activePatients || 0,
          });
        } catch (error) {
          console.error('Error fetching patients dashboard:', error);
          // Continue with other data even if this fails
        }

        // Note: Appointments are fetched by TodayAppointmentTable component
        // This allows the dashboard to render even if one API fails
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setDashboardError('Some dashboard data could not be loaded. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        {/* Dashboard Error Message */}
        {dashboardError && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            {dashboardError}
          </div>
        )}

        {/* Dashboard Stats Cards (if available) */}
        {patientsStats && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Patients</h3>
              <p className="text-2xl font-bold text-gray-900">{patientsStats.totalPatients}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Active Patients</h3>
              <p className="text-2xl font-bold text-blue-600">{patientsStats.activePatients}</p>
            </div>
          </div>
        )}

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

