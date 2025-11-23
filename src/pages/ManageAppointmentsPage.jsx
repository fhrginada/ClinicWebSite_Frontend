import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Tabs from '../components/Tabs';
import Calendar from '../components/Calendar';
import TimeSelector from '../components/TimeSelector';
import AppointmentForm from '../components/AppointmentForm';

const ManageAppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 0, 8)); // January 8, 2024
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [reason, setReason] = useState('New Patient Visit');
  const [doctor, setDoctor] = useState('Dr. Emily Carter (Cardiology)');
  const [notes, setNotes] = useState('');

  const handleConfirmBooking = () => {
    // Validate required fields
    if (!selectedDate || !selectedTime || !reason || !doctor) {
      alert('Please fill in all required fields');
      return;
    }

    const appointmentData = {
      date: selectedDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: selectedTime,
      reason: reason,
      doctor: doctor,
      notes: notes || 'No additional notes'
    };

    console.log('=== Appointment Booking Confirmed ===');
    console.log('Date:', appointmentData.date);
    console.log('Time:', appointmentData.time);
    console.log('Reason:', appointmentData.reason);
    console.log('Doctor:', appointmentData.doctor);
    console.log('Notes:', appointmentData.notes);
    console.log('=====================================');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Your Appointments
          </h1>
          <p className="text-gray-600">
            Book, view, or manage your appointments online with ease.
          </p>
        </div>

        {/* Tabs */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content - Book New Tab */}
        {activeTab === 'book' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Section 1: Select a Date */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Select a Date</h2>
              <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            </div>

            {/* Section 2: Choose a Time */}
            <div className="lg:col-span-1">
              <TimeSelector
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
                selectedDate={selectedDate}
                onConfirmBooking={handleConfirmBooking}
              />
            </div>

            {/* Section 3: Provide Details */}
            <div className="lg:col-span-1">
              <AppointmentForm
                reason={reason}
                onReasonChange={setReason}
                doctor={doctor}
                onDoctorChange={setDoctor}
                notes={notes}
                onNotesChange={setNotes}
              />
            </div>
          </div>
        )}

        {/* Upcoming Appointments Tab */}
        {activeTab === 'upcoming' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-600">No upcoming appointments scheduled.</p>
          </div>
        )}

        {/* Past Appointments Tab */}
        {activeTab === 'past' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-600">No past appointments found.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageAppointmentsPage;

