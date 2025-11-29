'use client';

import { useState, useRef } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Edit2,
  Save,
  X,
  Camera,
  Globe,
  Briefcase,
  FileText,
} from 'lucide-react';

interface DoctorData {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  bio: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  yearsOfExperience: number;
  education: Array<{ degree: string; institution: string; year: string }>;
  languages: string[];
  profilePicture: string | null;
}

interface DoctorProfileClientProps {
  doctor: DoctorData;
}

export default function DoctorProfileClient({ doctor: initialDoctor }: DoctorProfileClientProps) {
  const [doctor, setDoctor] = useState(initialDoctor);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialDoctor);
  const [profileImage, setProfileImage] = useState<string | null>(initialDoctor.profilePicture);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(doctor);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(doctor);
  };

  const handleSave = () => {
    setDoctor({ ...editedData, profilePicture: profileImage });
    setIsEditing(false);
    // In a real app, you would make an API call here to save the data
    console.log('Saving doctor data:', { ...editedData, profilePicture: profileImage });
  };

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      // In a real app, you would upload the file to a server here
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
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                  {getInitials(doctor.name)}
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
            <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
            <p className="text-gray-600 mt-1">{doctor.specialization}</p>
            <p className="text-sm text-gray-500 mt-1">License: {doctor.licenseNumber}</p>
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
                <p className="text-base font-medium text-gray-900 mt-1">{doctor.name}</p>
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
                  <p className="text-base font-medium text-gray-900">{doctor.email}</p>
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
                  <p className="text-base font-medium text-gray-900">{doctor.phone}</p>
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
                    {new Date(doctor.dateOfBirth).toLocaleDateString('en-US', {
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
                <p className="text-base font-medium text-gray-900 mt-1">{doctor.gender}</p>
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
                  <p className="text-base font-medium text-gray-900">{doctor.address}</p>
                </div>
              )}
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
              <label className="text-sm text-gray-500">Specialization</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-base font-medium text-gray-900 mt-1">{doctor.specialization}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">License Number</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-base font-medium text-gray-900 mt-1">{doctor.licenseNumber}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Years of Experience</label>
              {isEditing ? (
                <input
                  type="number"
                  value={editedData.yearsOfExperience}
                  onChange={(e) => handleInputChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Award className="w-4 h-4 text-gray-400" />
                  <p className="text-base font-medium text-gray-900">
                    {doctor.yearsOfExperience} years
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Languages</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.languages.join(', ')}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      languages: e.target.value.split(',').map((l) => l.trim()).filter((l) => l.length > 0),
                    }))
                  }
                  placeholder="Arabic, English, French"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {doctor.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              )}
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
            value={editedData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about yourself..."
          />
        ) : (
          <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
        )}
      </div>

      {/* Education Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        </div>
        <div className="space-y-4">
          {doctor.education.map((edu, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">{edu.degree}</p>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

