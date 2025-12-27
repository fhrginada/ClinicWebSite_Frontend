'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export type ClinicRole = 'Admin' | 'Doctor' | 'Nurse' | 'Patient';

type AuthState = {
  token: string | null;
  roles: ClinicRole[];
  isAuthenticated: boolean;
};

type LoginInput = { email: string; password: string };

type RegisterInput = {
  fullName?: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  email: string;
  password: string;
};

type AuthContextValue = AuthState & {
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: (redirectToLogin?: boolean) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'clinic.auth';

function getStoredAuth(): { token: string; roles: ClinicRole[] } | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

function setStoredAuth(token: string | null, roles: ClinicRole[] = []) {
  if (typeof window === 'undefined') return;
  if (token) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, roles }));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function computeState(token: string | null, roles: ClinicRole[]): AuthState {
  if (!token) return { token: null, roles: [], isAuthenticated: false };
  return {
    token,
    roles,
    isAuthenticated: true,
  };
}

// Mock authentication - accepts any email/password
// In a real frontend-only app, you might want to use a different auth strategy
function mockLogin(email: string): { token: string; roles: ClinicRole[] } {
  // Simple mock: determine role from email or default to Patient
  let role: ClinicRole = 'Patient';
  const emailLower = email.toLowerCase();
  if (emailLower.includes('admin') || emailLower.includes('@admin')) {
    role = 'Admin';
  } else if (emailLower.includes('doctor') || emailLower.includes('@doctor')) {
    role = 'Doctor';
  } else if (emailLower.includes('nurse') || emailLower.includes('@nurse')) {
    role = 'Nurse';
  }
  
  // Generate a simple mock token
  const token = btoa(JSON.stringify({ email, role, exp: Date.now() + 86400000 }));
  return { token, roles: [role] };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setTokenState] = useState<string | null>(null);
  const [roles, setRolesState] = useState<ClinicRole[]>([]);

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored) {
      setTokenState(stored.token);
      setRolesState(stored.roles);
    }
  }, []);

  const state = useMemo(() => computeState(token, roles), [token, roles]);

  const login = async (input: LoginInput) => {
    // Mock authentication - accepts any credentials
    const { token: newToken, roles: newRoles } = mockLogin(input.email);
    setStoredAuth(newToken, newRoles);
    setTokenState(newToken);
    setRolesState(newRoles);

    const redirect = searchParams?.get('redirect');
    router.replace(redirect ? decodeURIComponent(redirect) : '/');
  };

  const register = async (input: RegisterInput) => {
    // Mock registration - just log in with the provided email
    await login({ email: input.email, password: input.password });
  };

  const logout = (redirectToLogin = true) => {
    setStoredAuth(null);
    setTokenState(null);
    setRolesState([]);
    if (redirectToLogin) router.replace('/login');
  };

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
