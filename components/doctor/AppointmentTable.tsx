'use client';

import Filters from './Filters';
import AppointmentRow from './AppointmentRow';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  reason: string;
}

interface AppointmentTableProps {
  appointments: Appointment[];
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: string) => void;
  onStatusChange: (appointmentId: string, newStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled') => void;
  onEditAppointment: (appointmentId: string, data: { date: string; time: string; reason: string }) => void;
}

export default function AppointmentTable({
  appointments,
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onStatusChange,
  onEditAppointment,
}: AppointmentTableProps) {
  return (
    <div>
      {/* Filters */}
      <Filters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Time
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Patient ID
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Reason
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-base font-medium">No appointments found</p>
                    <p className="text-sm text-gray-400">
                      {searchQuery || statusFilter !== 'All'
                        ? 'Try adjusting your search or filter criteria'
                        : 'No appointments scheduled for the next 7 days'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <AppointmentRow
                  key={appointment.id}
                  appointment={appointment}
                  onStatusChange={onStatusChange}
                  onEditAppointment={onEditAppointment}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      {appointments.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Showing {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
