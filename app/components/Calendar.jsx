'use client';

import React, { useState } from 'react';

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0, 1)); // January 2024

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    if (day) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      onDateSelect(date);
    }
  };

  const isSelected = (day) => {
    if (!day || !selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="rounded-3xl border border-white/35 bg-white/20 backdrop-blur-lg shadow-glass p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-xl transition-colors border border-transparent hover:border-white/40 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          aria-label="Go to previous month"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-semibold text-slate-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-xl transition-colors border border-transparent hover:border-white/40 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          aria-label="Go to next month"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center text-sm font-semibold text-slate-600/90 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day)}
            disabled={!day}
            className={`
              aspect-square flex items-center justify-center text-sm font-semibold rounded-xl transition-colors border
              ${!day ? 'cursor-default border-transparent' : 'cursor-pointer hover:border-white/50 hover:bg-white/20'}
              ${
                isSelected(day)
                  ? 'border-primary-500 bg-primary-600/90 text-white shadow-glass'
                  : day
                  ? 'text-slate-900 border-white/20 bg-white/10'
                  : 'text-transparent border-transparent'
              }
            `}
            aria-pressed={isSelected(day)}
          >
            {day || ''}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

