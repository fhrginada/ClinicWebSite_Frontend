'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, Clock, User, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function AppointmentConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(10);

  // Get appointment details from URL params or localStorage
  const appointmentId = searchParams.get('id') || 'N/A';
  const doctorName = searchParams.get('doctor') || 'Dr. Smith';
  const date = searchParams.get('date') || new Date().toLocaleDateString();
  const time = searchParams.get('time') || '10:00 AM';

  useEffect(() => {
    // Countdown timer to redirect to dashboard
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/patient');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Appointment Confirmed! ✅
          </h1>
          <p className="text-lg text-gray-600">
            تم تأكيد موعدك بنجاح
          </p>
        </div>

        {/* Appointment Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b">
            Appointment Details
          </h2>

          <div className="space-y-4">
            {/* Appointment ID */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointment ID</p>
                <p className="text-lg font-semibold text-gray-900">#{appointmentId}</p>
              </div>
            </div>

            {/* Doctor */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="text-lg font-semibold text-gray-900">{doctorName}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-lg font-semibold text-gray-900">{date}</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-lg font-semibold text-gray-900">{time}</p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold text-gray-900 mb-3">Important Notes:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>A confirmation email has been sent to your registered email address</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Please arrive 15 minutes before your appointment time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Bring your ID and insurance card (if applicable)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>You can reschedule or cancel up to 24 hours before your appointment</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => router.push('/patient')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Go to Dashboard
            <ArrowRight size={20} />
          </button>
          <button
            onClick={() => router.push('/patient/appointments')}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-colors"
          >
            View All Appointments
          </button>
        </div>

        {/* Auto Redirect Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Redirecting to dashboard in <span className="font-semibold text-blue-600">{countdown}</span> seconds...
          </p>
        </div>
      </div>
    </div>
  );
}
