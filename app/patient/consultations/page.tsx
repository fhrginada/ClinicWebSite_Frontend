'use client';

import { useState } from 'react';
import Sidebar from '@/components/patient/Sidebar';
import Topbar from '@/components/patient/Topbar';
import { Calendar, User, FileText, Pill, Search, Filter } from 'lucide-react';

interface Consultation {
  id: string;
  date: string;
  doctorName: string;
  doctorSpecialization: string;
  notes: string;
  prescriptions: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
}

// Mock data generator
const generateMockConsultations = (): Consultation[] => {
  const consultations: Consultation[] = [];
  const today = new Date();
  const doctors = [
    { name: 'Dr. Ahmed Nabel', specialization: 'Cardiology' },
    { name: 'Dr. Sarah Williams', specialization: 'General Medicine' },
    { name: 'Dr. Michael Brown', specialization: 'Dermatology' },
    { name: 'Dr. Emily Chen', specialization: 'Pediatrics' },
  ];
  const notes = [
    'Patient reports improvement in symptoms. Blood pressure is stable. Continue current medication regimen and schedule follow-up in 4 weeks.',
    'Routine checkup completed. All vitals within normal range. Patient advised to maintain healthy lifestyle and regular exercise.',
    'Follow-up consultation for ongoing treatment. Patient responding well to prescribed medications. No adverse effects reported.',
    'Initial consultation completed. Comprehensive examination performed. Treatment plan discussed and agreed upon.',
    'Patient presents with mild symptoms. Prescribed medication and advised rest. Symptoms should improve within 3-5 days.',
  ];

  // Generate consultations for the past 6 months
  for (let month = 0; month < 6; month++) {
    const consultationDate = new Date(today);
    consultationDate.setMonth(today.getMonth() - month);
    
    // Generate 1-2 consultations per month
    const consultationsPerMonth = Math.floor(Math.random() * 2) + 1;
    
    for (let i = 0; i < consultationsPerMonth; i++) {
      const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      
      const dayOffset = Math.floor(Math.random() * 28);
      const date = new Date(consultationDate);
      date.setDate(consultationDate.getDate() - dayOffset);
      
      const hasPrescription = Math.random() > 0.3;
      const prescriptions = hasPrescription ? [
        { name: 'Aspirin', dosage: '100mg', frequency: 'Once daily', duration: '30 days' },
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days' },
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
      ].slice(0, Math.floor(Math.random() * 3) + 1) : [];
      
      consultations.push({
        id: `CONS-${String(1000 + consultations.length).padStart(4, '0')}`,
        date: date.toISOString().split('T')[0],
        doctorName: randomDoctor.name,
        doctorSpecialization: randomDoctor.specialization,
        notes: randomNote,
        prescriptions,
      });
    }
  }

  return consultations.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export default function ConsultationsPage() {
  const [consultations] = useState<Consultation[]>(generateMockConsultations());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  const filteredConsultations = consultations.filter((consultation) =>
    consultation.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    consultation.doctorSpecialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    consultation.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Consultations List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Consultations</h1>
                <p className="text-sm text-gray-600">Select a consultation to view details</p>
              </div>

              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search consultations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Consultations List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredConsultations.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No consultations found</p>
                ) : (
                  filteredConsultations.map((consultation) => (
                    <button
                      key={consultation.id}
                      onClick={() => setSelectedConsultation(consultation)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedConsultation?.id === consultation.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {consultation.doctorName}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {consultation.doctorSpecialization}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(consultation.date)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Consultation Details */}
          <div className="lg:col-span-2">
            {selectedConsultation ? (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Consultation Details</h2>
                  <div className="h-1 w-20 bg-blue-600 rounded"></div>
                </div>

                {/* Doctor Information */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {selectedConsultation.doctorName}
                      </h3>
                      <p className="text-gray-600 mt-1">{selectedConsultation.doctorSpecialization}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(selectedConsultation.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consultation Notes */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">Consultation Notes</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedConsultation.notes}
                    </p>
                  </div>
                </div>

                {/* Prescriptions */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Pill className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">Prescriptions</h3>
                  </div>
                  {selectedConsultation.prescriptions.length > 0 ? (
                    <div className="space-y-3">
                      {selectedConsultation.prescriptions.map((prescription, index) => (
                        <div
                          key={index}
                          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{prescription.name}</h4>
                            <span className="text-sm text-gray-600">{prescription.dosage}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Frequency: </span>
                              {prescription.frequency}
                            </div>
                            <div>
                              <span className="font-medium">Duration: </span>
                              {prescription.duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                      No prescriptions were prescribed for this consultation.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Select a consultation to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

