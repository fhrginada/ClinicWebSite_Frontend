import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Tabs from '../components/Tabs';
import Calendar from '../components/Calendar';
import TimeSelector from '../components/TimeSelector';
import AppointmentForm from '../components/AppointmentForm';
import DecorativeShapes from '../components/DecorativeShapes';

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
    <div className="relative min-h-screen bg-clinic-radial text-slate-900 overflow-hidden">
      <DecorativeShapes />
      <div className="relative z-10 pb-12">
        <Navbar />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* Page Header */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Manage Your Appointments
            </h1>
            <p className="text-slate-600/90">
              Book, view, or manage your appointments online with ease.
            </p>
          </div>

          {/* Tabs */}
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Content - Book New Tab */}
          {activeTab === 'book' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-x-8 lg:gap-y-8 items-stretch">
              {/* Section 1: Select a Date */}
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">1. Select a Date</h2>
                <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
              </div>

              {/* Section 2: Choose a Time */}
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">2. Choose a Time</h2>
                <TimeSelector
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                  selectedDate={selectedDate}
                  onConfirmBooking={handleConfirmBooking}
                />
              </div>

              {/* Section 3: Provide Details */}
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">3. Provide Details</h2>
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
            <div className="rounded-3xl border border-white/35 bg-white/20 backdrop-blur-lg shadow-glass p-8 text-center">
              <p className="text-slate-600/90">No upcoming appointments scheduled.</p>
            </div>
          )}

          {/* Past Appointments Tab */}
          {activeTab === 'past' && (
            <div className="rounded-3xl border border-white/35 bg-white/20 backdrop-blur-lg shadow-glass p-8 text-center">
              <p className="text-slate-600/90">No past appointments found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAppointmentsPage;

