'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import api from '@/src/services/api';
import { clearToken, getToken, setToken } from '@/src/auth/tokenStore';
import { ClinicRole, getRolesFromJwt, isTokenExpired } from '@/src/auth/jwt';

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
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any;

    if (typeof data === 'string' && data.trim()) return data;

    if (Array.isArray(data)) {
      const messages = data
        .map((x) => (typeof x?.description === 'string' ? x.description : x?.code))
        .filter((x): x is string => typeof x === 'string' && x.trim().length > 0);
      if (messages.length) return messages.join(' ');
    }

    if (data && typeof data === 'object') {
      const title = typeof data.title === 'string' ? data.title : undefined;
      const errors = data.errors;
      if (errors && typeof errors === 'object') {
        const flattened: string[] = [];
        for (const key of Object.keys(errors)) {
          const arr = errors[key];
          if (Array.isArray(arr)) {
            for (const msg of arr) {
              if (typeof msg === 'string' && msg.trim()) flattened.push(msg);
            }
          }
        }
        if (flattened.length) return flattened.join(' ');
      }
      if (title) return title;
    }

    return error.message || 'Request failed';
  }

  return error instanceof Error ? error.message : 'Request failed';
}

function computeState(token: string | null): AuthState {
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

  useEffect(() => {
    const existing = getToken();
    setTokenState(existing);
  }, []);

  const state = useMemo(() => computeState(token), [token]);

  const login = async (input: LoginInput) => {
    const res = await api.post<{ token: string; refreshToken: string }>('/api/Users/login', input);
    const jwt = res.data.token;
    setToken(jwt);
    setTokenState(jwt);

    const redirect = searchParams?.get('redirect');
    router.replace(redirect ? decodeURIComponent(redirect) : '/');
  };

  const register = async (input: RegisterInput) => {
    try {
      await api.post('/api/Users/register', input);
      await login({ email: input.email, password: input.password });
    } catch (err) {
      throw new Error(toApiErrorMessage(err));
    }
  };

  const logout = (redirectToLogin = true) => {
    clearToken();
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
