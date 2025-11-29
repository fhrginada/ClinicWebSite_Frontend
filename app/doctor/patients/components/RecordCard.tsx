import { MedicalRecord } from '../types';
import { Calendar, User, FileText } from 'lucide-react';

interface RecordCardProps {
  record: MedicalRecord;
  onViewFull?: (recordId: string) => void;
}

export default function RecordCard({ record, onViewFull }: RecordCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getVisitTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'Emergency':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Follow-up':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Checkup':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const prescriptionSummary =
    record.prescription.medications.length > 0
      ? `${record.prescription.medications.length} medication(s) prescribed`
      : 'No medications prescribed';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">
              {formatDate(record.visitDate)}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getVisitTypeBadgeClass(
                record.visitType
              )}`}
            >
              {record.visitType}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {record.diagnosis}
          </h3>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 line-clamp-2">{record.notes}</p>
        </div>

        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{record.doctorName}</span>
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Prescription: </span>
          {prescriptionSummary}
        </div>
      </div>

      {onViewFull && (
        <button
          onClick={() => onViewFull(record.id)}
          className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          View Full Record
        </button>
      )}
    </div>
  );
}

