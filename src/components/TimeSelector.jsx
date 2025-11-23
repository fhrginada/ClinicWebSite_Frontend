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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      {selectedDate && (
        <p className="text-sm text-gray-600 mb-6">{formatDate(selectedDate)}</p>
      )}
      
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 mb-6 flex-1">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-colors
              ${selectedTime === time
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }
            `}
          >
            {time}
          </button>
        ))}
      </div>

      {onConfirmBooking && (
        <button
          onClick={onConfirmBooking}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-auto"
        >
          Confirm Booking
        </button>
      )}
    </div>
  );
};

export default TimeSelector;

