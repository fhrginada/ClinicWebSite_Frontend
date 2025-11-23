import React from 'react';

const AppointmentForm = ({ 
  reason, 
  onReasonChange, 
  doctor, 
  onDoctorChange, 
  notes, 
  onNotesChange 
}) => {
  const reasons = [
    'New Patient Visit',
    'Follow-up',
    'Consultation',
    'Check-up',
    'Emergency',
    'Other'
  ];

  const doctors = [
    { id: 1, name: 'Dr. Emily Carter', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'General Medicine' },
    { id: 3, name: 'Dr. Sarah Johnson', specialty: 'Pediatrics' },
    { id: 4, name: 'Dr. David Williams', specialty: 'Orthopedics' },
    { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Dermatology' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">3. Provide Details</h3>
      
      <div className="space-y-6">
        {/* Reason for Visit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Visit
          </label>
          <select
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Select a Doctor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a Doctor
          </label>
          <select
            value={doctor}
            onChange={(e) => onDoctorChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={`${doc.name} (${doc.specialty})`}>
                {doc.name} ({doc.specialty})
              </option>
            ))}
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Please provide any relevant information..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;

