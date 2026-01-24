'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  Settings,
  ChevronLeft,
  LogOut,
  User
} from 'lucide-react';
import { getMockAuth, clearMockAuth } from '@/src/auth/mockAuth';
import { getDoctorById } from '@/src/mocks/dataLoader';

// Helper function to get initials from name
function getInitials(name: string): string {
  if (!name) return 'U';
  // Remove "Dr. " prefix if present
  const cleanName = name.replace(/^Dr\.\s*/i, '').trim();
  const parts = cleanName.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return cleanName.substring(0, 2).toUpperCase();
}

export default function Sidebar({ doctorId }: { doctorId?: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const auth = getMockAuth();
  const [doctorName, setDoctorName] = useState<string>(auth.userName || 'Doctor');
  const [specialization, setSpecialization] = useState<string>('Doctor');
  
  useEffect(() => {
    const currentDoctorId = doctorId || auth.userId;
    if (currentDoctorId) {
      const doctor = getDoctorById(currentDoctorId);
      if (doctor) {
        setDoctorName(doctor.name);
        setSpecialization(doctor.specialization || 'Doctor');
      }
    }
  }, [doctorId, auth.userId]);
  
  const dashboardPath = doctorId ? `/doctor/${doctorId}/dashboard` : '/doctor';
  const patientsPath = doctorId ? `/doctor/${doctorId}/patients` : '/doctor/patients';
  const navigationItems = [
    { icon: Home, label: 'Dashboard', href: dashboardPath },
    { icon: Calendar, label: 'My Appointments', href: '/doctor/appointments' },
    { icon: Users, label: 'Patients', href: patientsPath },
    { icon: FileText, label: 'Prescriptions', href: '/doctor/prescriptions' },
    { icon: User, label: 'Profile', href: '/doctor/profile' },
    { icon: Settings, label: 'Settings', href: '/doctor/settings' },
  ];

  const initials = getInitials(doctorName);

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-[#1a1f3a] flex flex-col transition-all duration-300 z-50 ${
        isExpanded ? 'w-72' : 'w-20'
      }`}
    >
      {/* Top Section with Logo and Collapse Button */}
      <div className="flex items-center justify-between px-4 py-6">
        {isExpanded && (
          <div className="flex items-center justify-center flex-1">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden">
              <Image 
                src="/assets/Logo.png" 
                alt="Logo" 
                width={48} 
                height={48}
                className="object-contain"
              />
            </div>
          </div>
        )}
        {!isExpanded && (
          <div className="flex items-center justify-center w-full">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden">
              <Image 
                src="/assets/Logo.png" 
                alt="Logo" 
                width={48} 
                height={48}
                className="object-contain"
              />
            </div>
          </div>
        )}
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={16} className="text-white" />
          </button>
        )}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors absolute top-6 right-2"
            aria-label="Expand sidebar"
          >
            <ChevronLeft size={16} className="rotate-180 text-white" />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-2 px-4 py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${isActive 
                  ? 'bg-[#2563eb] text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }
                ${!isExpanded ? 'justify-center' : ''}
              `}
              title={!isExpanded ? item.label : ''}
            >
              {isActive && isExpanded && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#2563eb] rounded-r"></div>
              )}
              <Icon size={20} />
              {isExpanded && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      {isExpanded && (
        <div className="px-4 pb-6">
          <div className="bg-[#1e3a8a] rounded-xl p-4">
            {/* Profile Picture */}
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                  {initials}
                </div>
              </div>
            </div>
            
            {/* Name and Role */}
            <div className="text-center mb-4">
              <h3 className="text-white font-semibold text-base mb-1">{doctorName}</h3>
              <p className="text-gray-400 text-xs">{specialization}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => router.push('/doctor/settings')}
                className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors"
                aria-label="Settings"
                title="Settings"
              >
                <Settings size={18} className="text-white" />
              </button>
              <button
                onClick={() => {
                  clearMockAuth();
                  router.push('/login');
                }}
                className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed User Icon */}
      {!isExpanded && (
        <div className="px-4 pb-6">
          <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mx-auto overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
              {initials}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

