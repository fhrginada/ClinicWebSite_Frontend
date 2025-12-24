/**
 * TEMPORARY MOCK AUTHENTICATION
 * Frontend-only solution for testing until backend is ready
 */

import { ClinicRole } from './jwt';

const MOCK_AUTH_KEY = 'clinic.mockAuth';
const MOCK_ROLE_KEY = 'clinic.mockRole';

export type MockAuthState = {
  isAuthenticated: boolean;
  role: ClinicRole | null;
};

/**
 * Hardcoded mock credentials
 */
const MOCK_CREDENTIALS = {
  doctor: { password: 'doctor123', role: 'Doctor' as ClinicRole },
  nurse: { password: 'nurse123', role: 'Nurse' as ClinicRole },
  patient: { password: 'patient123', role: 'Patient' as ClinicRole },
};

/**
 * Check if credentials match mock values
 * Username can be anything, password must match
 */
export function validateMockCredentials(
  username: string,
  password: string
): ClinicRole | null {
  if (password === MOCK_CREDENTIALS.doctor.password) {
    return 'Doctor';
  }
  if (password === MOCK_CREDENTIALS.nurse.password) {
    return 'Nurse';
  }
  if (password === MOCK_CREDENTIALS.patient.password) {
    return 'Patient';
  }
  return null;
}

/**
 * Set mock authentication state in localStorage
 */
export function setMockAuth(role: ClinicRole): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(MOCK_AUTH_KEY, 'true');
  window.localStorage.setItem(MOCK_ROLE_KEY, role);
}

/**
 * Get mock authentication state from localStorage
 */
export function getMockAuth(): MockAuthState {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, role: null };
  }

  const isAuthenticated = window.localStorage.getItem(MOCK_AUTH_KEY) === 'true';
  const role = window.localStorage.getItem(MOCK_ROLE_KEY) as ClinicRole | null;

  // Validate role
  const validRoles: ClinicRole[] = ['Admin', 'Doctor', 'Nurse', 'Patient'];
  const validRole = role && validRoles.includes(role) ? role : null;

  return {
    isAuthenticated: isAuthenticated && validRole !== null,
    role: validRole,
  };
}

/**
 * Clear mock authentication state
 */
export function clearMockAuth(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(MOCK_AUTH_KEY);
  window.localStorage.removeItem(MOCK_ROLE_KEY);
}

/**
 * Get roles array from mock auth (for compatibility with AuthContext)
 */
export function getMockRoles(): ClinicRole[] {
  const { role } = getMockAuth();
  return role ? [role] : [];
}

