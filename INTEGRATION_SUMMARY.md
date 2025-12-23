# 🔗 Front-End و Back-End Integration Guide

## ✅ تم إنجازه الآن:

### 1. **تحديث جميع الـ Services**
- ✅ `patient.service.ts` - مع dashboard endpoints
- ✅ `doctor.service.ts` - مع availability
- ✅ `appointment.service.ts` - مع consultation endpoints
- ✅ `medical-history.service.ts` - جديد ومكتمل
- ✅ `prescription.service.ts` - مكتمل
- ✅ `notification.service.ts` - مكتمل
- ✅ `nurse.service.ts` - مكتمل

### 2. **ربط API Base URL**
- ✅ تم تحديث `src/services/api.ts` ليستخدم `https://localhost:5001`
- ✅ تم تحديث `.env.local` بـ الـ port الصحيح

### 3. **الملفات المهمة الجديدة**
- `src/services/index.ts` - يصدر جميع الخدمات والـ endpoints
- `API_INTEGRATION.md` - وثائق شاملة لكل الـ endpoints

---

## 📋 الـ Endpoints المتصلة

### Patients
```typescript
GET /api/patients/dashboard
GET /api/patients/{id}
```

### Doctors
```typescript
GET /api/doctors
GET /api/doctors/{id}/availability
```

### Medical History
```typescript
GET /api/medical-history/patient/{id}
```

### Appointments
```typescript
POST /api/appointments
GET /api/appointments
```

### Consultations
```typescript
GET /api/consultations/{appointmentId}
POST /api/consultations
PUT /api/consultations/{id}
```

### Prescriptions
```typescript
GET /api/Prescriptions
POST /api/Prescriptions
```

---

## 🚀 كيفية الاستخدام

### Import الخدمات في صفحاتك:
```typescript
import { 
  getPatientDashboard,
  getAllDoctors,
  getMedicalHistory,
  createAppointment,
  createConsultation 
} from '@/src/services';
```

### مثال استخدام:
```typescript
async function loadPatientData(patientId: string) {
  const dashboard = await getPatientDashboard(patientId);
  const history = await getMedicalHistory(Number(patientId));
  console.log(dashboard, history);
}
```

---

## ⚙️ تشغيل الـ Applications

### Backend (.NET 8)
```bash
cd ClinicWebsite_BackEnd
dotnet run
# يعمل على: https://localhost:5001
```

### Frontend (Next.js)
```bash
cd ClinicWebSite_Frontend
npm run dev
# يعمل على: http://localhost:3000
```

---

## 🔐 Authentication
- JWT Token يتم حفظه في `localStorage['token']`
- يتم إرساله تلقائياً مع كل request
- يمكن تفعيله من خلال login

---

## 📚 للمزيد من التفاصيل
اقرأ `API_INTEGRATION.md` الموجود في جذر الـ Frontend project
