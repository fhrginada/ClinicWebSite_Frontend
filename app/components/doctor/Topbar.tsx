'use client';

import { Calendar, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDoctorById } from '@/src/services/doctor.service';
import { getCurrentDoctorId } from '@/src/utils/doctor';

export default function Topbar() {
  const [doctorName, setDoctorName] = useState<string>('Doctor');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorName = async () => {
      try {
        const doctorId = getCurrentDoctorId();
        const doctor = await getDoctorById(doctorId);
        setDoctorName(doctor.name || 'Doctor');
      } catch (error) {
        console.error('Error fetching doctor name:', error);
        // Keep default name on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctorName();
  }, []);

  const currentDate = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isLoading ? 'Loading...' : `${getGreeting()}, Dr. ${doctorName}`}
          </h1>
          <p className="text-gray-600 mt-1">
            Have a great and productive day
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar size={20} />
            <span className="text-sm font-medium">{formattedDate}</span>
          </div>
          
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

