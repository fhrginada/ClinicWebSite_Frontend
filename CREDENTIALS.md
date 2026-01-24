# Login Credentials Reference

This document lists all the specific email and password combinations from the mock data.

## 🔐 Authentication System

The system validates **both email and password** from the mock data files. Each user has a unique password following the pattern: `{firstname}2024`.

## 👨‍⚕️ Doctors

| Name | Email | Password | ID | Specialization | Assigned Patients |
|------|-------|----------|-----|---------------|-------------------|
| Dr. Emily Carter | `emily.carter@intelliclinic.com` | `emily2024` | 1 | Cardiology | Sara Ahmed, Ahmed Mohamed |
| Dr. John Smith | `john.smith@intelliclinic.com` | `john2024` | 2 | Dermatology | Omar Hassan, Amina Hassan |
| Dr. Evelyn Reed | `evelyn.reed@intelliclinic.com` | `evelyn2024` | 3 | Family Medicine | Fatima Ali, Mariam Ali |
| Dr. Michael Chen | `michael.chen@intelliclinic.com` | `michael2024` | 4 | Cardiology | Layla Ibrahim, Hassan Ibrahim |
| Dr. Sarah Johnson | `sarah.johnson@intelliclinic.com` | `sarah2024` | 5 | Pediatrics | Yusuf Hassan |
| Dr. James Wilson | `james.wilson@intelliclinic.com` | `james2024` | 6 | Internal Medicine | Khalid Mohamed |

## 👥 Patients

| Name | Email | Password | ID | Assigned Doctor |
|------|-------|----------|-----|-----------------|
| Sara Ahmed | `sara.ahmed@email.com` | `sara2024` | 1 | Dr. Emily Carter (ID: 1) |
| Omar Hassan | `omar.hassan@email.com` | `omar2024` | 2 | Dr. John Smith (ID: 2) |
| Fatima Ali | `fatima.ali@email.com` | `fatima2024` | 3 | Dr. Evelyn Reed (ID: 3) |
| Ahmed Mohamed | `ahmed.mohamed@email.com` | `ahmed2024` | 4 | Dr. Emily Carter (ID: 1) |
| Layla Ibrahim | `layla.ibrahim@email.com` | `layla2024` | 5 | Dr. Michael Chen (ID: 4) |
| Yusuf Hassan | `yusuf.hassan@email.com` | `yusuf2024` | 6 | Dr. Sarah Johnson (ID: 5) |
| Mariam Ali | `mariam.ali@email.com` | `mariam2024` | 7 | Dr. Evelyn Reed (ID: 3) |
| Khalid Mohamed | `khalid.mohamed@email.com` | `khalid2024` | 8 | Dr. James Wilson (ID: 6) |
| Amina Hassan | `amina.hassan@email.com` | `amina2024` | 9 | Dr. John Smith (ID: 2) |
| Hassan Ibrahim | `hassan.ibrahim@email.com` | `hassan2024` | 10 | Dr. Michael Chen (ID: 4) |

## 👩‍⚕️ Nurses

| Name | Email | Password | ID | Assigned Doctor |
|------|-------|----------|-----|-----------------|
| Nurse Jane Doe | `jane.doe@intelliclinic.com` | `jane2024` | 1 | Dr. Emily Carter (ID: 1) |
| Nurse Robert Martinez | `robert.martinez@intelliclinic.com` | `robert2024` | 2 | Dr. John Smith (ID: 2) |
| Nurse Patricia Williams | `patricia.williams@intelliclinic.com` | `patricia2024` | 3 | Dr. Evelyn Reed (ID: 3) |
| Nurse David Kim | `david.kim@intelliclinic.com` | `david2024` | 4 | Dr. Michael Chen (ID: 4) |
| Nurse Jennifer Brown | `jennifer.brown@intelliclinic.com` | `jennifer2024` | 5 | Dr. Sarah Johnson (ID: 5) |
| Nurse Thomas Anderson | `thomas.anderson@intelliclinic.com` | `thomas2024` | 6 | Dr. James Wilson (ID: 6) |

## 🎯 How It Works

1. **Login**: Enter email and password (e.g., `john.smith@intelliclinic.com` / `john2024`)
2. **Authentication**: System validates credentials and retrieves user ID, role, and name
3. **Redirect**: User is redirected to their specific dashboard:
   - Doctors → `/doctor/{doctorId}/dashboard`
   - Patients → `/patient/{patientId}/dashboard`
   - Nurses → `/nurse/{nurseId}/dashboard`
4. **Data Filtering**: Each dashboard shows only data assigned to that specific user:
   - **Doctors** see only their assigned patients
   - **Patients** see only their own medical records
   - **Nurses** see only patients assigned to their doctor

## 📝 Example: Dr. John Smith

When you login with:
- **Email**: `john.smith@intelliclinic.com`
- **Password**: `john2024`

You will:
1. Be redirected to `/doctor/2/dashboard`
2. See only **2 patients** assigned to you:
   - Omar Hassan (ID: 2)
   - Amina Hassan (ID: 9)
3. See only appointments, prescriptions, and medical records for these patients
4. See only appointments scheduled with you

## ✅ Notes

- Email matching is **case-insensitive**
- Each user has a **unique password** based on their first name
- The system stores user ID, role, and name for personalized dashboards
- All data is filtered by user ID to ensure data isolation
- Route protection ensures users can only access their own dashboards
