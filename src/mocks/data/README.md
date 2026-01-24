# Mock Data Documentation

This directory contains comprehensive mock data for the clinic management system.

## File Structure

- `doctors.json` - Doctor profiles with credentials and specializations
- `patients.json` - Patient profiles with assigned doctors
- `nurses.json` - Nurse profiles assigned to doctors
- `medicalRecords.json` - Visit-based medical records linking patients to doctors
- `prescriptions.json` - Prescriptions linked to medical records
- `testResults.json` - Lab test results linked to medical records

## Data Relationships

```
Doctor (1) ──< (Many) Patients
Doctor (1) ──< (Many) Nurses
Patient (1) ──< (Many) Medical Records
Medical Record (1) ──< (Many) Prescriptions
Medical Record (1) ──< (Many) Test Results
```

## Credentials

### Doctors
- Email: `{firstname}.{lastname}@intelliclinic.com`
- Password: `doctor123`
- Role: `Doctor`

### Patients
- Email: `{firstname}.{lastname}@email.com`
- Password: `patient123`
- Role: `Patient`

### Nurses
- Email: `{firstname}.{lastname}@intelliclinic.com`
- Password: `nurse123`
- Role: `Nurse`

## Usage

Import the data loader utility:

```typescript
import { 
  doctors, 
  patients, 
  nurses, 
  medicalRecords, 
  prescriptions, 
  testResults,
  getPatientsByDoctor,
  getMedicalRecordsByPatient,
  getPrescriptionsByRecord,
  getTestResultsByRecord
} from '@/src/mocks/dataLoader';
```

## Data Statistics

- **Doctors**: 6 doctors across 5 specializations
- **Patients**: 10 patients assigned to various doctors
- **Nurses**: 6 nurses, one assigned to each doctor
- **Medical Records**: 13 visit records
- **Prescriptions**: 10 prescriptions linked to records
- **Test Results**: 18 test results across various records

## Notes

- All dates are in ISO 8601 format
- Patient IDs and Doctor IDs are consistent across all files
- Medical records include visit dates, complaints, diagnosis, and notes
- Prescriptions include detailed medication information with dosages and frequencies
- Test results include normal ranges and status indicators

