'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full rounded-t-xl overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {service.description}
        </p>
        <Link
          href={`/services/${service.id}`}
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          Learn More
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;

