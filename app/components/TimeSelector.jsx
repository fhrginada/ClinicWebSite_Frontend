'use client';

import React from 'react';

const TimeSelector = ({ selectedTime, onTimeSelect, selectedDate, onConfirmBooking }) => {
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
  ];

  const formatDate = (date) => {
    if (!date) return '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="rounded-3xl border border-white/35 bg-white/20 backdrop-blur-lg shadow-glass p-6 h-full flex flex-col">
      {selectedDate && (
        <p className="text-sm text-slate-600/90 mb-6">{formatDate(selectedDate)}</p>
      )}
      
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 mb-6 flex-1">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className={`
              px-4 py-2 rounded-xl font-semibold text-sm transition-colors border
              ${
                selectedTime === time
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
              }
            `}
            aria-pressed={selectedTime === time}
          >
            {time}
          </button>
        ))}
      </div>

      {onConfirmBooking && (
        <button
          onClick={onConfirmBooking}
          className="w-full bg-blue-600 text-white py-3 rounded-xl px-6 shadow-md font-semibold hover:bg-blue-700 transition-colors mt-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Confirm Booking
        </button>
      )}
    </div>
  );
};

export default TimeSelector;

