'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { clearToken, getToken, setToken } from '@/src/auth/tokenStore';
import { ClinicRole, getRolesFromJwt, isTokenExpired } from '@/src/auth/jwt';
import { getMockAuth, getMockRoles, clearMockAuth } from '@/src/auth/mockAuth';

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

function toApiErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Request failed';
}

function computeState(token: string | null): AuthState {
  // TEMPORARY: Check for mock authentication first
  const mockAuth = getMockAuth();
  if (mockAuth.isAuthenticated && mockAuth.role) {
    return {
      token: null, // No real token for mock auth
      roles: [mockAuth.role],
      isAuthenticated: true,
    };
  }

  // Fall back to JWT token authentication
  if (!token) return { token: null, roles: [], isAuthenticated: false };
  if (isTokenExpired(token)) return { token: null, roles: [], isAuthenticated: false };
  return {
    token,
    roles: getRolesFromJwt(token),
    isAuthenticated: true,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setTokenState] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Force re-computation when mock auth changes

  useEffect(() => {
    const existing = getToken();
    setTokenState(existing);

    // TEMPORARY: Listen for storage changes to detect mock auth updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'clinic.mockAuth' || e.key === 'clinic.mockRole') {
        setRefreshKey((prev) => prev + 1); // Force state recomputation
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const state = useMemo(() => computeState(token), [token, refreshKey]);

  const login = async (input: LoginInput) => {
    // MOCK MODE - No API call
    console.log('🔐 MOCK: Login attempt:', input.email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // For mock mode, we rely on mock auth from login page
    // This function is kept for compatibility but doesn't make API calls
    const redirect = searchParams?.get('redirect');
    router.replace(redirect ? decodeURIComponent(redirect) : '/');
  };

  const register = async (input: RegisterInput) => {
    // MOCK MODE - No API call
    console.log('📝 MOCK: Registration attempt:', input.email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Auto-login after registration (mock)
    await login({ email: input.email, password: input.password });
  };

  const logout = (redirectToLogin = true) => {
    clearToken();
    clearMockAuth(); // TEMPORARY: Clear mock auth too
    setTokenState(null);
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
