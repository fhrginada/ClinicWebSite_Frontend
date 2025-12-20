'use client';

import { useState, useRef } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  Droplet,
  Heart,
  Shield,
  AlertCircle,
} from 'lucide-react';

interface PatientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  bloodType: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  insuranceProvider: string;
  insurancePolicyNumber: string;
}

interface PatientProfileClientProps {
  patient: PatientData;
}

export default function PatientProfileClient({ patient: initialPatient }: PatientProfileClientProps) {
  const [patient, setPatient] = useState(initialPatient);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialPatient);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(patient);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(patient);
  };

  const handleSave = () => {
    setPatient({ ...editedData, emergencyContact: editedData.emergencyContact });
    setIsEditing(false);
    // In a real app, you would make an API call here to save the data
    console.log('Saving patient data:', { ...editedData, profilePicture: profileImage });
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value },
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your personal information and settings</p>
          </div>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-white text-blue-600 border border-blue-300 rounded-xl shadow-md font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Profile Picture Section */}
        <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
          <div className="relative">
            <div
              className={`w-32 h-32 rounded-full overflow-hidden ${
                isEditing ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
              }`}
              onClick={isEditing ? handleImageClick : undefined}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={patient.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                  {getInitials(patient.name)}
                </div>
              )}
            </div>
            {isEditing && (
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                <Camera className="w-5 h-5 text-white" />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <p className="text-gray-600 mt-1">Patient ID: {patient.id}</p>
            {isEditing && (
              <p className="text-xs text-blue-600 mt-2">Click on image to change profile picture</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-base font-medium text-gray-900 mt-1">{patient.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-base font-medium text-gray-900">{patient.email}</p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-base font-medium text-gray-900">{patient.phone}</p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-base font-medium text-gray-900">
                    {new Date(patient.dateOfBirth).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Gender</label>
              {isEditing ? (
                <select
                  value={editedData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-base font-medium text-gray-900 mt-1">{patient.gender}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Address</label>
              {isEditing ? (
                <textarea
                  value={editedData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={2}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex items-start gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <p className="text-base font-medium text-gray-900">{patient.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Blood Type</label>
              {isEditing ? (
                <select
                  value={editedData.bloodType}
                  onChange={(e) => handleInputChange('bloodType', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Droplet className="w-4 h-4 text-gray-400" />
                  <p className="text-base font-medium text-gray-900">{patient.bloodType}</p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Allergies</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.allergies.join(', ')}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      allergies: e.target.value.split(',').map((a) => a.trim()).filter((a) => a.length > 0),
                    }))
                  }
                  placeholder="Penicillin, Peanuts, etc."
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {patient.allergies.length > 0 ? (
                    patient.allergies.map((allergy, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200"
                      >
                        {allergy}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No known allergies</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Chronic Conditions</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.chronicConditions.join(', ')}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      chronicConditions: e.target.value.split(',').map((c) => c.trim()).filter((c) => c.length > 0),
                    }))
                  }
                  placeholder="Hypertension, Diabetes, etc."
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {patient.chronicConditions.length > 0 ? (
                    patient.chronicConditions.map((condition, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200"
                      >
                        {condition}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No chronic conditions</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Emergency Contact</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.emergencyContact.name}
                onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-base font-medium text-gray-900 mt-1">{patient.emergencyContact.name}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-500">Relationship</label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.emergencyContact.relationship}
                onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-base font-medium text-gray-900 mt-1">{patient.emergencyContact.relationship}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={editedData.emergencyContact.phone}
                onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-base font-medium text-gray-900">{patient.emergencyContact.phone}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Insurance Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Insurance Provider</label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.insuranceProvider}
                onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-base font-medium text-gray-900 mt-1">{patient.insuranceProvider}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-500">Policy Number</label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.insurancePolicyNumber}
                onChange={(e) => handleInputChange('insurancePolicyNumber', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-base font-medium text-gray-900 mt-1">{patient.insurancePolicyNumber}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

