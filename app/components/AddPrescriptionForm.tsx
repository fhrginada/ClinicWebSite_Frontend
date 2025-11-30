'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus, Trash2, Pill, AlertCircle } from 'lucide-react';

export default function AddPrescriptionForm() {
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [medications, setMedications] = useState([
    { name: '', dosage: '', frequency: '', duration: '' }
  ]);

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const updateMedication = (index: number, field: keyof typeof medications[0], value: string) => {
    const updated = [...medications];
    updated[index] = { ...updated[index], [field]: value };
    setMedications(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Prescription saved successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Patient Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            Patient Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Patient Full Name"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Patient ID (e.g. PT-2025-001)"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Medications */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <Pill className="w-6 h-6 text-blue-600" />
              Medications
            </h2>
            <button
              type="button"
              onClick={addMedication}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
            >
              <Plus className="w-5 h-5" />
              Add Medication
            </button>
          </div>

          <div className="space-y-6">
            {medications.map((med, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeMedication(index)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  <input placeholder="Medication name" value={med.name} onChange={(e) => updateMedication(index, 'name', e.target.value)} required className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  <input placeholder="Dosage (e.g. 500mg)" value={med.dosage} onChange={(e) => updateMedication(index, 'dosage', e.target.value)} required className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  <input placeholder="Frequency (e.g. twice daily)" value={med.frequency} onChange={(e) => updateMedication(index, 'frequency', e.target.value)} required className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  <input placeholder="Duration (e.g. 7 days)" value={med.duration} onChange={(e) => updateMedication(index, 'duration', e.target.value)} required className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <Link href="/prescriptions">
            <button type="button" className="px-8 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition flex items-center gap-2"
          >
            <Pill className="w-5 h-5" />
            Save Prescription
          </button>
        </div>
      </form>
    </div>
  );
}