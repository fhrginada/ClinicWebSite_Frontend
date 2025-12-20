'use client';

import { CheckCircle2, XCircle, CheckCircle, Edit } from 'lucide-react';
import StatusBadge from './StatusBadge';
import EditAppointmentModal from './EditAppointmentModal';
import { useState } from 'react';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  reason: string;
}

interface AppointmentRowProps {
  appointment: Appointment;
  onStatusChange: (appointmentId: string, newStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled') => void;
  onEditAppointment: (appointmentId: string, data: { date: string; time: string; reason: string }) => void;
}

export default function AppointmentRow({
  appointment,
  onStatusChange,
  onEditAppointment,
}: AppointmentRowProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    // Convert 24h format to 12h format
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleConfirm = () => {
    if (appointment.status !== 'Confirmed') {
      onStatusChange(appointment.id, 'Confirmed');
    }
  };

  const handleCancel = () => {
    if (appointment.status !== 'Cancelled') {
      onStatusChange(appointment.id, 'Cancelled');
    }
  };

  const handleComplete = () => {
    if (appointment.status !== 'Completed') {
      onStatusChange(appointment.id, 'Completed');
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
        {/* Time */}
        <td className="py-4 px-4 text-sm text-gray-900 font-medium">
          {formatTime(appointment.time)}
        </td>

        {/* Date */}
        <td className="py-4 px-4 text-sm text-gray-600">
          {formatDate(appointment.date)}
        </td>

        {/* Patient Name */}
        <td className="py-4 px-4 text-sm text-gray-900 font-medium">
          {appointment.patientName}
        </td>

        {/* Patient ID */}
        <td className="py-4 px-4 text-sm text-gray-600">
          {appointment.patientId}
        </td>

        {/* Reason */}
        <td className="py-4 px-4 text-sm text-gray-600">
          {appointment.reason}
        </td>

        {/* Status */}
        <td className="py-4 px-4">
          <StatusBadge status={appointment.status} />
        </td>

        {/* Actions */}
        <td className="py-4 px-4">
          <div className="flex items-center gap-2 flex-wrap">
            {appointment.status === 'Pending' && (
              <button
                onClick={handleConfirm}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Confirm"
                aria-label="Confirm appointment"
              >
                <CheckCircle size={18} />
              </button>
            )}
            
            {appointment.status !== 'Completed' && appointment.status !== 'Cancelled' && (
              <>
                <button
                  onClick={handleComplete}
                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Mark as Completed"
                  aria-label="Mark as completed"
                >
                  <CheckCircle2 size={18} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Cancel"
                  aria-label="Cancel appointment"
                >
                  <XCircle size={18} />
                </button>
              </>
            )}
            
            <button
              onClick={handleEdit}
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit"
              aria-label="Edit appointment"
            >
              <Edit size={18} />
            </button>
          </div>
        </td>
      </tr>

      {/* Edit Modal */}
      <EditAppointmentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        appointment={appointment}
        onSave={onEditAppointment}
      />
    </>
  );
}

