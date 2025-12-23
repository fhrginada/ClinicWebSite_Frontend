# 🏥 Clinic Website - Frontend Setup

## ⚡ Quick Start

### Step 1: Ensure Backend is Running
```bash
# Make sure ASP.NET backend is running on port 7043
# URL: https://localhost:7043

# Check backend:
https://localhost:7043/swagger
```

### Step 2: Update Environment Variables
The `.env.local` file is already configured:
```dotenv
NEXT_PUBLIC_API_URL=https://localhost:7043
```

**If you need to change it:**
1. Edit `.env.local`
2. Restart the development server

### Step 3: Install Dependencies (if needed)
```bash
npm install
```

### Step 4: Start Development Server
```bash
npm run dev
```

**Frontend will be available at:** http://localhost:3000

---

## 📖 Pages Available

### 1. **Doctors List** (Server Component)
- **URL:** http://localhost:3000/doctors
- **What it does:**
  - Fetches list of all doctors from API
  - Renders cards with doctor information
  - "Book Appointment" button for each doctor
- **Component Type:** Server Component (async)
- **Files:**
  - `app/doctors/page.tsx` - Main page
  - `app/doctors/components/DoctorCard.tsx` - Individual doctor card

### 2. **Book Appointment** (Client Component)
- **URL:** http://localhost:3000/appointment-booking
- **What it does:**
  - Shows form to create new appointment
  - Accepts patient ID, doctor ID, date, time
  - Submits POST request to backend
  - Shows success/error messages
- **Component Type:** Client Component (uses React state)
- **File:** `app/components/CreateAppointmentForm.tsx`

### 3. **API Test Page**
- **URL:** http://localhost:3000/api-test
- **What it does:**
  - Test all API endpoints manually
  - View response data in real-time
  - Useful for debugging
- **File:** `app/api-test/page.tsx`

---

## 🔧 API Endpoints Implemented

All endpoints in `src/services/api.ts`:

| Endpoint | Method | Function | Status |
|----------|--------|----------|--------|
| `/api/patients/dashboard` | GET | `getPatientDashboard()` | ✅ |
| `/api/patients/{id}` | GET | `getPatientById(id)` | ✅ |
| `/api/medical-history/patient/{id}` | GET | `getMedicalHistoryByPatient(id)` | ✅ |
| `/api/doctors` | GET | `getAllDoctors()` | ✅ |
| `/api/doctors/{id}/availability` | GET | `getDoctorAvailability(id)` | ✅ |
| `/api/appointments` | POST | `createAppointment(payload)` | ✅ |
| `/api/consultations/{appointmentId}` | GET | `getConsultationByAppointmentId(id)` | ✅ |
| `/api/consultations` | POST | `createConsultation(payload)` | ✅ |
| `/api/consultations/{id}` | PUT | `updateConsultation(id, payload)` | ✅ |

---

## 📝 Example Usage

### In a Component
```typescript
import { getAllDoctors, createAppointment } from '@/src/services/api';

// Fetch doctors (can use in Server or Client Component)
const doctors = await getAllDoctors();

// Create appointment (use in Client Component with event handler)
const appointment = await createAppointment({
  patientId: '123',
  doctorId: 5,
  date: '2025-12-25',
  time: '14:00',
  reason: 'Checkup'
});
```

---

## 🚨 Troubleshooting

### Issue: "Failed to fetch" Error
**Solution:**
1. Check if backend is running on https://localhost:7043
2. Verify `.env.local` has correct `NEXT_PUBLIC_API_URL`
3. Restart dev server: `npm run dev`
4. Check browser console for more details

### Issue: CORS Error
**Solution:**
- Make sure backend CORS policy allows `http://localhost:3000`
- This should be configured in backend `Program.cs`

### Issue: 404 Not Found
**Solution:**
- Check backend endpoint paths match exactly
- Verify controller names and routes in backend
- Use Swagger UI to inspect actual endpoints

### Issue: Environment Variable Not Showing
**Solution:**
1. Restart dev server after changing `.env.local`
2. Environment variables are loaded at build time
3. Changes to `.env.local` require restart

---

## 📚 Project Structure

```
app/
├── doctors/                          # Doctors listing page
│   ├── page.tsx                     # Server component
│   └── components/
│       ├── DoctorCard.tsx
│       └── DoctorsList.tsx
├── appointment-booking/             # Booking page
│   └── page.tsx                    # Client component
├── api-test/                        # API testing page
│   └── page.tsx
├── components/
│   └── CreateAppointmentForm.tsx   # Reusable form
└── [other existing pages]

src/
└── services/
    └── api.ts                       # All API functions

.env.local                           # Configuration
```

---

## ✅ Next.js 13+ Features Used

- ✅ **App Router** - Modern routing
- ✅ **Server Components** - Direct API calls (doctors page)
- ✅ **Client Components** - Interactivity (forms)
- ✅ **TypeScript** - Type safety
- ✅ **Dynamic Routes** - URL parameters
- ✅ **Environment Variables** - Configuration
- ✅ **Metadata** - SEO optimization
- ✅ **Native Fetch** - No dependencies

---

## 🎯 Next Steps

1. ✅ Run the development server
2. ✅ Visit http://localhost:3000/doctors
3. ✅ Test creating an appointment
4. ✅ Check API responses in browser console
5. ⏳ (Optional) Integrate with actual backend database

---

## 📞 Support

For issues or questions:
1. Check the backend logs
2. Use the API test page: http://localhost:3000/api-test
3. Check browser DevTools Console
4. Review `NEXTJS_SETUP_GUIDE.md` for more details

---

**Backend:** https://localhost:7043
**Frontend:** http://localhost:3000
**Last Updated:** December 23, 2025
