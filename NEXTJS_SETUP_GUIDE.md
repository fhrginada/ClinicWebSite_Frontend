# 🚀 Next.js + ASP.NET Integration Guide

## ✅ تم إنجازه

### 1. API Service Layer (`src/services/api.ts`)
- ✅ Created complete API service with **native `fetch` API** (no external dependencies)
- ✅ Base URL configured via `NEXT_PUBLIC_API_URL` environment variable
- ✅ All 9 required endpoints implemented:
  - `GET /api/patients/dashboard`
  - `GET /api/patients/{id}`
  - `GET /api/medical-history/patient/{id}`
  - `GET /api/doctors`
  - `GET /api/doctors/{id}/availability`
  - `POST /api/appointments`
  - `GET /api/consultations/{appointmentId}`
  - `POST /api/consultations`
  - `PUT /api/consultations/{id}`
- ✅ Full TypeScript types for all responses
- ✅ Basic error handling with `response.ok` check
- ✅ All functions exported and documented

### 2. Environment Configuration
- ✅ `.env.local` updated with correct backend URL:
  ```dotenv
  NEXT_PUBLIC_API_URL=https://localhost:7043
  ```

### 3. Server Component Example
- ✅ `app/doctors/page.tsx` - Async Server Component
  - Fetches doctor list from API
  - Proper error handling
  - Zero JavaScript sent to client initially (Server-side rendering)
  - Metadata configured for SEO

### 4. Client Components
- ✅ `app/doctors/components/DoctorCard.tsx` - Displays single doctor
- ✅ `app/doctors/components/DoctorsList.tsx` - Lists all doctors
- ✅ `app/components/CreateAppointmentForm.tsx` - POST form component
- ✅ `app/appointment-booking/page.tsx` - Full booking page

---

## 📁 Project Structure

```
app/
├── doctors/                          # Doctors listing page
│   ├── page.tsx                     # Server component (SSR)
│   └── components/
│       ├── DoctorCard.tsx          # Client component
│       └── DoctorsList.tsx         # Client component
├── appointment-booking/             # Appointment booking page
│   └── page.tsx                    # Client component
├── components/
│   └── CreateAppointmentForm.tsx   # Reusable form component
└── ...

src/
└── services/
    └── api.ts                       # All API functions
    
.env.local                           # Environment variables
```

---

## 🔧 API Service Features

### Type-Safe Endpoints

```typescript
import {
  getAllDoctors,
  getPatientDashboard,
  createAppointment,
  Doctor,
  PatientDashboard,
} from '@/src/services/api';

// TypeScript knows the return type automatically
const doctors: Doctor[] = await getAllDoctors();
const dashboard: PatientDashboard = await getPatientDashboard();
```

### Generic Fetch Wrapper

```typescript
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T>
```

**Benefits:**
- Consistent error handling
- Automatic JSON parsing
- Type safety with generics
- No external HTTP library needed

---

## 🎯 Server vs Client Components

### Server Components (`app/doctors/page.tsx`)
```typescript
// ✅ Server component (default)
async function DoctorsPage() {
  const doctors = await getAllDoctors(); // Runs on server
  return <div>...</div>;
}
```

**Advantages:**
- Direct database/API access
- Secure (no API keys exposed)
- Better performance (no JS sent to client)
- Better SEO

### Client Components (`CreateAppointmentForm.tsx`)
```typescript
'use client'; // ✅ Client component

export default function CreateAppointmentForm() {
  const [formData, setFormData] = useState({}); // Client state
  const handleSubmit = async () => {
    await createAppointment(formData); // Form submission
  };
}
```

**Use Cases:**
- Form handling with `useState`, `useEffect`
- Event listeners and interactivity
- Client-side state management

---

## 🚀 Running the Application

### Backend Setup
```bash
# Make sure ASP.NET backend is running on port 7043
# URL: https://localhost:7043
```

### Frontend Setup

#### 1. Install Dependencies (if needed)
```bash
npm install
# or
yarn install
# or
pnpm install
```

#### 2. Start Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

**Frontend URL:** `http://localhost:3000`

#### 3. View Pages
- **Doctors List:** http://localhost:3000/doctors
- **Book Appointment:** http://localhost:3000/appointment-booking

---

## 📝 API Functions Usage Examples

### Example 1: Fetching Doctors
```typescript
import { getAllDoctors, Doctor } from '@/src/services/api';

async function showDoctors() {
  try {
    const doctors: Doctor[] = await getAllDoctors();
    console.log(doctors);
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
  }
}
```

### Example 2: Creating Appointment
```typescript
import { createAppointment, CreateAppointmentRequest } from '@/src/services/api';

const appointment: CreateAppointmentRequest = {
  patientId: '123',
  doctorId: 5,
  date: '2025-12-25',
  time: '14:00',
  reason: 'Annual checkup',
  notes: 'Please have lab results ready'
};

const result = await createAppointment(appointment);
```

### Example 3: Getting Medical History
```typescript
import { getMedicalHistoryByPatient, MedicalHistory } from '@/src/services/api';

const history: MedicalHistory[] = 
  await getMedicalHistoryByPatient('123');
```

### Example 4: Doctor Availability
```typescript
import { getDoctorAvailability, DoctorAvailability } from '@/src/services/api';

const availability: DoctorAvailability = 
  await getDoctorAvailability(5, '2025-12-24', 7);
// Get 7 days of availability starting from 2025-12-24
```

---

## 🛡️ Error Handling

### API Layer Error Handling
```typescript
// Automatically throws on non-OK response
if (!response.ok) {
  throw new Error(`API Error: ${response.status} ${response.statusText}`);
}
```

### Component Level Error Handling
```typescript
try {
  const data = await createAppointment(formData);
  // Success
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  setError(message);
}
```

---

## 📊 Environment Variables

### Development (.env.local)
```dotenv
NEXT_PUBLIC_API_URL=https://localhost:7043
```

### Production (.env.production.local)
```dotenv
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## 🧪 Testing the Integration

### 1. Verify Backend is Running
```bash
# Check backend at:
https://localhost:7043/swagger
# or
https://localhost:7043/api/doctors
```

### 2. Check Frontend Environment
```bash
# In browser console:
console.log(process.env.NEXT_PUBLIC_API_URL);
// Should output: https://localhost:7043
```

### 3. Test API Calls
```bash
# In browser console:
import { getAllDoctors } from '@/src/services/api';
const doctors = await getAllDoctors();
console.log(doctors);
```

---

## 🚨 Common Issues & Solutions

### Issue: CORS Error
**Solution:** Ensure backend CORS policy allows `http://localhost:3000`

### Issue: 404 Errors
**Solution:** 
- Verify backend endpoint paths match exactly
- Check backend controller names and routes
- Use Swagger UI to inspect actual endpoints

### Issue: SSL Certificate Warnings
**Solution:** 
- For development, it's safe to ignore self-signed certificate warnings
- Or configure your browser to trust localhost certificates

### Issue: Environment Variable Not Loading
**Solution:**
- Restart dev server after changing `.env.local`
- Use `process.env.NEXT_PUBLIC_API_URL` only on server components or in API routes
- For client components, use it during build time only

---

## ✨ Next.js 13+ Best Practices Applied

✅ **Async Server Components** - Direct API calls on server
✅ **App Router** - Modern routing structure
✅ **TypeScript** - Full type safety
✅ **Client/Server Separation** - Proper use of 'use client'
✅ **Error Boundaries** - Graceful error handling
✅ **Environment Variables** - Configuration management
✅ **Metadata** - SEO optimization
✅ **Native Fetch API** - No unnecessary dependencies
✅ **Form Validation** - Client-side validation
✅ **Loading States** - UX feedback

---

## 📚 Further Reading

- [Next.js 13+ Documentation](https://nextjs.org/docs)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

## 🎓 Key Takeaways

1. **API Service Layer** - Centralized, type-safe API calls
2. **Server Components** - Use for data fetching (better performance/security)
3. **Client Components** - Use for interactivity and state management
4. **Error Handling** - Always wrap API calls in try-catch
5. **Environment Variables** - Never hardcode API URLs
6. **TypeScript** - Leverage types for better developer experience

---

**Last Updated:** December 23, 2025
**Backend Version:** ASP.NET Web API (Port: 7043)
**Frontend Version:** Next.js 13+ (Port: 3000)
