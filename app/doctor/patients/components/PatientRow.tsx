import Link from 'next/link';
import { Patient } from '../types';

interface PatientRowProps {
  patient: Patient;
}

export default function PatientRow({ patient }: PatientRowProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeClass = (status: string) => {
    return status === 'Active'
      ? 'bg-green-50 text-green-700 border-green-200'
      : 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm mr-3">
            {patient.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
            <div className="text-sm text-gray-500">{patient.medicalId}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {patient.age}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {patient.gender}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(patient.lastVisitDate)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(
            patient.status
          )}`}
        >
          {patient.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link
          href={`/doctor/patients/${patient.id}`}
          className="text-blue-600 hover:text-blue-900 transition-colors"
        >
          View Profile
        </Link>
      </td>
    </tr>
  );
}

