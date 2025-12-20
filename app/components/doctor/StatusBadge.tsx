'use client';

import { CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react';

interface StatusBadgeProps {
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

const statusConfig = {
  Pending: {
    label: 'Pending',
    icon: Clock,
    className: 'text-yellow-700',
    bgClassName: 'bg-yellow-50 border-yellow-200',
  },
  Confirmed: {
    label: 'Confirmed',
    icon: Calendar,
    className: 'text-blue-700',
    bgClassName: 'bg-blue-50 border-blue-200',
  },
  Completed: {
    label: 'Completed',
    icon: CheckCircle2,
    className: 'text-green-700',
    bgClassName: 'bg-green-50 border-green-200',
  },
  Cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    className: 'text-red-700',
    bgClassName: 'bg-red-50 border-red-200',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${config.bgClassName} ${config.className}`}>
      <Icon size={14} />
      {config.label}
    </span>
  );
}

