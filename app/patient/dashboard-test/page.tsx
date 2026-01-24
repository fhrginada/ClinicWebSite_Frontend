'use client';

import { useEffect, useState } from 'react';
import { Calendar, MessageSquare, Bell, Activity, RefreshCw, CheckCircle } from 'lucide-react';

interface DashboardData {
  firstName?: string;
  upcomingAppointments?: any[];
  notifications?: any[];
}

export default function DashboardTestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [apiStatus, setApiStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [authInfo, setAuthInfo] = useState<string>('');

  useEffect(() => {
    // Check for authentication
    if (typeof window !== 'undefined') {
      const mockAuth = window.localStorage.getItem('clinic.mockAuth');
      const mockRole = window.localStorage.getItem('clinic.mockRole');
      const token = window.localStorage.getItem('clinic.jwt');
      
      let info = '';
      if (mockAuth === 'true' && mockRole) {
        info += `Mock Auth: ${mockRole}`;
      }
      if (token) {
        info += ` | JWT Token: موجود`;
      }
      setAuthInfo(info || 'لا يوجد تسجيل دخول');
    }
  }, []);

  const testDashboardAPI = async () => {
    setLoading(true);
    setError(null);
    setApiStatus('idle');

    try {
      // Get token from localStorage if exists
      const token = typeof window !== 'undefined' ? window.localStorage.getItem('clinic.jwt') : null;
      
      // Test the backend API
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('https://localhost:5000/api/patients/dashboard/1', {
        method: 'GET',
        headers,
      });

      // Check for specific error codes
      if (response.status === 401) {
        throw new Error('API Error: 401 - يحتاج Authentication (تسجيل دخول). الـ endpoint يتطلب دور Admin أو Doctor أو Nurse');
      }
      
      if (response.status === 403) {
        throw new Error('API Error: 403 - Forbidden. ليس لديك صلاحية للوصول لهذا الـ endpoint');
      }
      
      if (response.status === 404) {
        throw new Error('API Error: 404 - Patient not found أو الـ endpoint غير موجود. تأكد أن الـ Backend شغال على https://localhost:5000');
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      setApiStatus('success');
    } catch (err: any) {
      setError(err.message);
      setApiStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Patient Dashboard - Test Page 🧪
          </h1>
          <p className="text-gray-600 mb-4">
            اختبر اتصال Patient Dashboard بالـ Backend
          </p>
          {authInfo && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>🔑 Authentication Status:</strong> {authInfo}
              </p>
            </div>
          )}
        </div>

        {/* Test Button */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <button
            onClick={testDashboardAPI}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin" size={20} />
                جاري التحميل...
              </>
            ) : (
              <>
                <Activity size={20} />
                اختبر Dashboard API
              </>
            )}
          </button>
        </div>

        {/* API Status */}
        {apiStatus !== 'idle' && (
          <div className={`rounded-xl shadow-sm p-6 mb-6 ${
            apiStatus === 'success' ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
          }`}>
            <h3 className={`font-bold text-lg mb-2 ${
              apiStatus === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {apiStatus === 'success' ? '✅ نجح الاتصال!' : '❌ فشل الاتصال'}
            </h3>
            {error && (
              <p className="text-red-700 mb-2">خطأ: {error}</p>
            )}
          </div>
        )}

        {/* Results */}
        {data && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                مرحباً {data.firstName || 'Guest'}! 👋
              </h2>
              <p className="text-gray-600">
                البيانات جاية من الـ Backend بنجاح
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Appointments */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">
                    {data.upcomingAppointments?.length || 0}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">المواعيد القادمة</h3>
                <p className="text-sm text-gray-600">Upcoming Appointments</p>
              </div>

              {/* Consultations */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">الاستشارات النشطة</h3>
                <p className="text-sm text-gray-600">Active Consultations</p>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">
                    {data.notifications?.length || 0}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">الإشعارات</h3>
                <p className="text-sm text-gray-600">Notifications</p>
              </div>
            </div>

            {/* Raw Data */}
            <div className="bg-gray-900 rounded-xl shadow-sm p-6">
              <h3 className="text-white font-bold text-lg mb-4">📦 Raw API Response:</h3>
              <pre className="text-green-400 text-sm overflow-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mt-6">
          <h3 className="font-bold text-blue-900 text-lg mb-3">📋 كيفية الاختبار:</h3>
          <ol className="list-decimal list-inside space-y-3 text-blue-800">
            <li className="font-semibold">تأكد أن Backend شغال على <code className="bg-blue-100 px-2 py-1 rounded">https://localhost:5000</code></li>
            <li>اضغط على زر &quot;اختبر Dashboard API&quot;</li>
            <li>إذا ظهرت رسالة ✅ نجح الاتصال - يبقى Dashboard شغال تمام!</li>
            <li className="font-semibold">إذا ظهر خطأ 401/403:</li>
            <ul className="list-disc list-inside mr-6 mt-2 space-y-1 font-normal">
              <li>هذا الـ endpoint يتطلب JWT token مع دور Admin/Doctor/Nurse</li>
              <li>للاختبار، روح <a href="/login" className="text-blue-600 underline">صفحة تسجيل الدخول</a></li>
              <li>سجل دخول كـ Admin/Doctor/Nurse</li>
              <li>ارجع هنا واختبر تاني</li>
            </ul>
            <li className="font-semibold">إذا ظهر خطأ 404:</li>
            <ul className="list-disc list-inside mr-6 mt-2 space-y-1 font-normal">
              <li>Patient بـ ID=1 مش موجود في الـ Database</li>
              <li>Backend مش شغال أو الـ endpoint غير متاح</li>
            </ul>
          </ol>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>ملحوظة:</strong> الـ endpoint <code className="bg-yellow-100 px-2 py-1 rounded">/api/patients/dashboard/1</code> يتطلب authentication. 
              إذا كنت عايز تختبر بدون تسجيل دخول، Backend لازم يكون فيه patient بـ ID=1 والـ endpoint يكون مفتوح للاختبار.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex gap-4">
          <a
            href="/patient"
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            ← رجوع للـ Dashboard الأصلي
          </a>
          <a
            href="/login"
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            صفحة تسجيل الدخول →
          </a>
        </div>
      </div>
    </div>
  );
}
