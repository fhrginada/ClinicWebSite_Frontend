'use client';

import { Search } from 'lucide-react';

interface FiltersProps {
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: string) => void;
}

export default function Filters({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Bar */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by patient name or ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      
      {/* Status Filter */}
      <div className="sm:w-48">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-none cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
}

