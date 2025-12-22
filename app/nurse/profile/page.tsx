'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/nurse/Sidebar';
import Topbar from '@/components/nurse/Topbar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  FileText,
  GraduationCap,
  Edit2,
  Save,
  X,
} from 'lucide-react';
import { getNurseById, updateNurse, Nurse } from '@/src/services/nurse.service';
import { getCurrentNurseId } from '@/src/utils/nurse';

export default function NurseProfilePage() {
  const [nurse, setNurse] = useState<Nurse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Nurse>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchNurseData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const nurseId = getCurrentNurseId();
        const data = await getNurseById(nurseId);
        setNurse(data);
        setEditedData(data);
      } catch (err) {
        console.error('Error loading nurse data:', err);
        setError('Failed to load nurse information. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNurseData();
  }, []);

  const handleEdit = () => {
    if (nurse) {
      setIsEditing(true);
      setEditedData(nurse);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (nurse) {
      setEditedData(nurse);
    }
  };

  const handleSave = async () => {
    if (!nurse) return;
    
    setIsSaving(true);
    try {
      const nurseId = getCurrentNurseId();
      const updated = await updateNurse(nurseId, editedData);
      setNurse(updated);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating nurse:', err);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof Nurse, value: string | number | undefined) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <main className="ml-72 p-6">
          <Topbar />
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !nurse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <main className="ml-72 p-6">
          <Topbar />
          <div className="text-center py-12">
            <p className="text-red-600 mb-2">{error || 'Failed to load profile'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-72 p-6">
        <Topbar />
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600 mt-1">View your personal information and professional details</p>
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
                    disabled={isSaving}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>

            {/* Profile Picture Section */}
            <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                    {getInitials(nurse.name)}
                  </div>
                </div>
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">{nurse.name}</h2>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.specialization || ''}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    placeholder="Department/Specialization"
                    className="text-gray-600 mt-1 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-600 mt-1">{nurse.specialization || 'General Nursing'}</p>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.licenseNumber || ''}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    placeholder="License Number"
                    className="text-sm text-gray-500 mt-1 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-sm text-gray-500 mt-1">License: {nurse.licenseNumber || 'N/A'}</p>
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
                      value={editedData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-base font-medium text-gray-900 mt-1">{nurse.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-base font-medium text-gray-900">{nurse.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-base font-medium text-gray-900">{nurse.phone || 'N/A'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Date of Birth</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedData.dateOfBirth || ''}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-base font-medium text-gray-900">
                        {nurse.dateOfBirth ? new Date(nurse.dateOfBirth).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }) : 'N/A'}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Gender</label>
                  {isEditing ? (
                    <select
                      value={editedData.gender || ''}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-base font-medium text-gray-900 mt-1">{nurse.gender || 'N/A'}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-500">Address</label>
                  <div className="flex items-start gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    {isEditing ? (
                      <textarea
                        value={editedData.address || ''}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={2}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-base font-medium text-gray-900">{nurse.address || 'N/A'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Department/Specialization</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.specialization || ''}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-base font-medium text-gray-900 mt-1">{nurse.specialization || 'General Nursing'}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-500">License Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.licenseNumber || ''}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-base font-medium text-gray-900 mt-1">{nurse.licenseNumber || 'N/A'}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-500">Years of Experience</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Award className="w-4 h-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedData.yearsOfExperience || 0}
                        onChange={(e) => handleInputChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32"
                      />
                    ) : (
                      <p className="text-base font-medium text-gray-900">
                        {nurse.yearsOfExperience || 0} years
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">Biography</h3>
            </div>
            {isEditing ? (
              <textarea
                value={editedData.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your biography..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{nurse.bio || 'No biography available.'}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

