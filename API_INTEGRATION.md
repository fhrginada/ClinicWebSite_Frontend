# API Integration Documentation

## Overview
This document outlines the API endpoints that are now integrated between the Frontend (Next.js) and Backend (.NET 8) applications.

## Backend Configuration
- **API Base URL**: `https://localhost:5001`
- **Authentication**: JWT Bearer Token
- **Database**: SQL Server (patient_domain)

## Frontend Configuration
- **Frontend Port**: `3000` (Next.js)
- **API Base URL Environment Variable**: `NEXT_PUBLIC_API_URL`
- **Default Value**: `https://localhost:5001`

## API Endpoints Implemented

### 1. Patients (`/api/Patients`)
| Method | Endpoint | Service Function | Status |
|--------|----------|-----------------|--------|
| GET | `/api/Patients` | `getAllPatients()` | ✅ |
| GET | `/api/Patients/{id}` | `getPatientById(id)` | ✅ |
| GET | `/api/Patients/dashboard` | `getPatientsDashboard()` | ✅ |
| GET | `/api/Patients/dashboard/{patientId}` | `getPatientDashboard(id)` | ✅ |

**Service File**: `src/services/patient.service.ts`

---

### 2. Doctors (`/api/doctors`)
| Method | Endpoint | Service Function | Status |
|--------|----------|-----------------|--------|
| GET | `/api/doctors` | `getAllDoctors()` | ✅ |
| GET | `/api/doctors/{id}` | `getDoctorById(id)` | ✅ |
| GET | `/api/doctors/{id}/availability` | `getDoctorAvailability(id)` | ✅ |
| POST | `/api/doctors` | Coming Soon | ⏳ |

**Service File**: `src/services/doctor.service.ts`

---

### 3. Medical History (`/api/medical-history`)
| Method | Endpoint | Service Function | Status |
|--------|----------|-----------------|--------|
| GET | `/api/medical-history` | `getAllMedicalHistory()` | ✅ |
| GET | `/api/medical-history/patient/{patientId}` | `getMedicalHistory(patientId)` | ✅ |
| GET | `/api/medical-history/{id}` | `getMedicalHistoryById(id)` | ✅ |
| POST | `/api/medical-history` | `createMedicalHistory()` | ✅ |
| PUT | `/api/medical-history/{id}` | `updateMedicalHistory()` | ✅ |
| DELETE | `/api/medical-history/{id}` | `deleteMedicalHistory()` | ✅ |

**Service File**: `src/services/medical-history.service.ts`

---

### 4. Appointments (`/api/appointments`)
| Method | Endpoint | Service Function | Status |
|--------|----------|-----------------|--------|
| GET | `/api/appointments` | `getAllAppointments()` | ✅ |
| POST | `/api/appointments` | `createAppointment()` | ✅ |
| PUT | `/api/appointments/status` | `updateAppointmentStatus()` | ✅ |

**Service File**: `src/services/appointment.service.ts`

---

### 5. Consultations (`/api/consultations`)
| Method | Endpoint | Service Function | Status |
|--------|----------|-----------------|--------|
| GET | `/api/consultations/{appointmentId}` | `getConsultationByAppointmentId()` | ✅ |
| POST | `/api/consultations` | `createConsultation()` | ✅ |
| PUT | `/api/consultations/{id}` | `updateConsultation()` | ✅ |

**Service File**: `src/services/appointment.service.ts` (exported as part of Appointment service)

---

### 6. Prescriptions (`/api/Prescriptions`)
| Method | Endpoint | Service Function | Status |
|--------|----------|-----------------|--------|
| GET | `/api/Prescriptions` | `getAllPrescriptions()` | ✅ |
| GET | `/api/Prescriptions/{id}` | `getPrescriptionById(id)` | ✅ |
| POST | `/api/Prescriptions` | `createPrescription()` | ✅ |
| PUT | `/api/Prescriptions/{id}` | `updatePrescription()` | ✅ |
| DELETE | `/api/Prescriptions/{id}` | `deletePrescription()` | ✅ |

**Service File**: `src/services/prescription.service.ts`

---

### 7. Notifications (`/api/notifications`)
| Method | Endpoint | Service Function | Status |
|--------|----------|-----------------|--------|
| GET | `/api/notifications/{userId}` | `getUserNotifications(userId)` | ✅ |
| POST | `/api/notifications/{id}/read` | `markAsRead(notificationId)` | ✅ |

**Service File**: `src/services/notification.service.ts`

---

## How to Use the Services

### Example: Fetching Patient Dashboard

```typescript
import { getPatientDashboard } from '@/src/services';

// In a React component
async function PatientDashboard() {
  try {
    const dashboard = await getPatientDashboard('patient-123');
    console.log(dashboard);
  } catch (error) {
    console.error('Failed to load dashboard:', error);
  }
}
```

### Example: Creating an Appointment

```typescript
import { createAppointment } from '@/src/services';

const appointment = await createAppointment({
  patientId: '123',
  doctorId: 5,
  date: '2025-12-24',
  time: '14:00',
  reason: 'Checkup',
  notes: 'Follow-up appointment'
});
```

### Example: Creating a Consultation

```typescript
import { createConsultation } from '@/src/services';

const consultation = await createConsultation({
  appointmentId: 1,
  notes: 'Patient condition improved',
  diagnosis: 'Flu-like symptoms',
  treatment: 'Rest and hydration',
  prescription: 'Paracetamol 500mg'
});
```

## Authentication

All requests automatically include the JWT token from `localStorage`:

```typescript
// Stored in: localStorage['token']
// Sent in header: Authorization: Bearer {token}
```

## Error Handling

All service functions include try-catch blocks and log errors to console:

```typescript
try {
  const data = await getPatientById('123');
} catch (error) {
  // Error automatically logged
  // Re-thrown for handling in components
}
```

## Environment Variables

Configure the backend URL in `.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=https://localhost:5001
```

## CORS Configuration

The backend CORS policy allows requests from:
- `http://localhost:3000` (Frontend development)

To update CORS, modify `Program.cs` in the backend:

```csharp
options.AddPolicy("AllowFrontend", policy =>
{
    policy.WithOrigins("http://localhost:3000")
          .AllowAnyHeader()
          .AllowAnyMethod();
});
```

## Database Schema

The backend uses Entity Framework Core with these main entities:
- `User` - Authentication
- `Patient` - Patient information
- `Doctor` - Doctor information
- `Appointment` - Appointments
- `Consultation` - Consultation details
- `Prescription` - Prescription details
- `MedicalHistory` - Medical history records
- `Notification` - Notifications

## Running the Applications

### Backend (.NET 8)
```bash
cd ClinicWebsite_BackEnd
dotnet run
# API runs on: https://localhost:5001
```

### Frontend (Next.js)
```bash
cd ClinicWebSite_Frontend
npm install
npm run dev
# Frontend runs on: http://localhost:3000
```

## Testing the Endpoints

### Using Swagger UI (Backend)
Navigate to: `https://localhost:5001/swagger`

### Using API testing tools
- **Postman**: Import the backend endpoints
- **cURL**: Use for quick API tests
- **VS Code REST Client**: Install extension and create `.http` files

## Next Steps

1. ✅ API services are integrated
2. ⏳ Create React components that use these services
3. ⏳ Add form validation for POST/PUT requests
4. ⏳ Implement error boundary components
5. ⏳ Add loading states and toast notifications
6. ⏳ Implement user authentication flow
7. ⏳ Add TypeScript strict mode checking

## Troubleshooting

### "Failed to fetch" errors
- Check if backend is running on port 5001
- Verify CORS configuration
- Check network tab in browser dev tools

### "401 Unauthorized" errors
- Ensure JWT token is stored in localStorage
- Check token expiration
- Verify token is sent in Authorization header

### "404 Not Found" errors
- Verify API endpoint path is correct
- Check backend controller routing
- Ensure backend is running

---

Last Updated: December 23, 2025
