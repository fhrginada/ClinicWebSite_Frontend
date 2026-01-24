/**
 * TEMPORARY MOCK AUTHENTICATION
 * Frontend-only solution for testing until backend is ready
 * 
 * User-based authentication: validates email + password from mock data
 */

import { ClinicRole } from './jwt';
import { findUserByCredentials, type User } from '@/src/mocks/dataLoader';

const MOCK_AUTH_KEY = 'clinic.mockAuth';
const MOCK_ROLE_KEY = 'clinic.mockRole';
const MOCK_USER_ID_KEY = 'clinic.mockUserId';
const MOCK_USER_NAME_KEY = 'clinic.mockUserName';

export type MockAuthState = {
  isAuthenticated: boolean;
  role: ClinicRole | null;
  userId?: number | null;
  userName?: string | null;
};

/**
 * Validate user credentials against mock data
 * Returns user info if credentials match, null otherwise
 * 
 * @param email - User's email address
 * @param password - User's password
 * @returns User authentication result with role, id, and name, or null if invalid
 */
export function validateMockCredentials(
  email: string,
  password: string
): { role: ClinicRole; userId: number; userName: string } | null {
  const user = findUserByCredentials(email, password);
  
  if (!user) {
    return null;
  }

  return {
    role: user.role as ClinicRole,
    userId: user.id,
    userName: user.name,
  };
}

/**
 * Set mock authentication state in localStorage
 */
export function setMockAuth(
  role: ClinicRole,
  userId?: number,
  userName?: string
): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(MOCK_AUTH_KEY, 'true');
  window.localStorage.setItem(MOCK_ROLE_KEY, role);
  if (userId !== undefined) {
    window.localStorage.setItem(MOCK_USER_ID_KEY, userId.toString());
  }
  if (userName) {
    window.localStorage.setItem(MOCK_USER_NAME_KEY, userName);
  }
  // Dispatch custom event to notify AuthContext in the same window
  window.dispatchEvent(new CustomEvent('mockAuthChanged', { detail: { role, userId, userName } }));
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
  const userIdStr = window.localStorage.getItem(MOCK_USER_ID_KEY);
  const userId = userIdStr ? parseInt(userIdStr, 10) : null;
  const userName = window.localStorage.getItem(MOCK_USER_NAME_KEY) || null;

  // Validate role
  const validRoles: ClinicRole[] = ['Admin', 'Doctor', 'Nurse', 'Patient'];
  const validRole = role && validRoles.includes(role) ? role : null;

  return {
    isAuthenticated: isAuthenticated && validRole !== null,
    role: validRole,
    userId: userId || undefined,
    userName: userName || undefined,
  };
}

/**
 * Clear mock authentication state
 */
export function clearMockAuth(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(MOCK_AUTH_KEY);
  window.localStorage.removeItem(MOCK_ROLE_KEY);
  window.localStorage.removeItem(MOCK_USER_ID_KEY);
  window.localStorage.removeItem(MOCK_USER_NAME_KEY);
  // Dispatch custom event to notify AuthContext in the same window
  window.dispatchEvent(new CustomEvent('mockAuthChanged', { detail: { role: null } }));
}

/**
 * Get roles array from mock auth (for compatibility with AuthContext)
 */
export function getMockRoles(): ClinicRole[] {
  const { role } = getMockAuth();
  return role ? [role] : [];
}

