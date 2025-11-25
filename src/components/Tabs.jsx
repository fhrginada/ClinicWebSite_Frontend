import React from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'book', label: 'Book New' },
    { id: 'upcoming', label: 'Upcoming Appointments' },
    { id: 'past', label: 'Past Appointments' },
  ];

  return (
    <div className="border-b border-white/30 mb-10">
      <div className="flex space-x-6" role="tablist" aria-label="Appointment management tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative pb-4 px-1 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 ${
              activeTab === tab.id
                ? 'text-primary-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary-500'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

