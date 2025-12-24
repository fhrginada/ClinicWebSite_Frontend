'use client';

import React, { useState, useEffect } from 'react';

const Calendar = ({ selectedDate, onDateSelect }) => {
  // Initialize with selected date or current month
  const getInitialMonth = () => {
    if (selectedDate) {
      return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    }
    return new Date();
  };
  const [currentMonth, setCurrentMonth] = useState(getInitialMonth);
  
  // Update current month when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      const newMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      if (newMonth.getTime() !== currentMonth.getTime()) {
        setCurrentMonth(newMonth);
      }
    }
  }, [selectedDate, currentMonth]);

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
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      // Only allow selecting today or future dates
      if (date >= today) {
        onDateSelect(date);
      }
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

  const isDisabled = (day) => {
    if (!day) return true;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-xl transition-colors border border-gray-300 bg-white hover:border-blue-600 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          aria-label="Go to previous month"
        >
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-semibold text-slate-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-xl transition-colors border border-gray-300 bg-white hover:border-blue-600 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          aria-label="Go to next month"
        >
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        {days.map((day, index) => {
          const disabled = isDisabled(day);
          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={!day || disabled}
              className={`
                aspect-square flex items-center justify-center text-sm font-semibold rounded-xl transition-colors border
                ${!day ? 'cursor-default border-transparent' : disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-blue-600 hover:bg-blue-50'}
                ${
                  isSelected(day)
                    ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                    : day && !disabled
                    ? 'text-gray-800 border-gray-300 bg-white'
                    : day && disabled
                    ? 'text-gray-400 border-gray-200 bg-gray-50'
                    : 'text-transparent border-transparent'
                }
              `}
              aria-pressed={isSelected(day)}
            >
              {day || ''}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

