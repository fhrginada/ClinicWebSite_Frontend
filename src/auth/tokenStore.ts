let inMemoryToken: string | null = null;

const STORAGE_KEY = 'clinic.jwt';

export function getToken(): string | null {
  if (inMemoryToken) return inMemoryToken;
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) {
    inMemoryToken = stored;
    return stored;
  }
  return null;
}

export function setToken(token: string | null) {
  inMemoryToken = token;
  if (typeof window === 'undefined') return;
  if (token) {
    window.localStorage.setItem(STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export function clearToken() {
  setToken(null);
}
