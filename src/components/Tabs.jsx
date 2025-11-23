import React from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'book', label: 'Book New' },
    { id: 'upcoming', label: 'Upcoming Appointments' },
    { id: 'past', label: 'Past Appointments' },
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-4 px-1 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

