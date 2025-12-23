'use client';

export default function AppointmentForm() {
  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
      <p className="text-sm text-gray-600">
        This form is deprecated. Use the secure booking flow at{' '}
        <a className="text-blue-600 hover:underline" href="/appointment-booking">
          /appointment-booking
        </a>
        .
      </p>
    </div>
  );
}
