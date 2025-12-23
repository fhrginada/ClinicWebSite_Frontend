export type ClinicRole = 'Admin' | 'Doctor' | 'Nurse' | 'Patient';

type JwtPayload = {
  exp?: number;
  email?: string;
  unique_name?: string;
  name?: string;
  role?: string | string[];
  roles?: string | string[];
  [k: string]: unknown;
};

function base64UrlDecode(input: string): string {
  const pad = '='.repeat((4 - (input.length % 4)) % 4);
  const base64 = (input + pad).replace(/-/g, '+').replace(/_/g, '/');
  const decoded = atob(base64);
  return decodeURIComponent(
    decoded
      .split('')
      .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join('')
  );
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(base64UrlDecode(parts[1])) as JwtPayload;
  } catch {
    return null;
  }
}

export function getRolesFromJwt(token: string): ClinicRole[] {
  const payload = decodeJwt(token);
  if (!payload) return [];

  const raw = (payload.role ?? payload.roles) as unknown;
  const roles = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return roles
    .map(String)
    .filter((r): r is ClinicRole =>
      r === 'Admin' || r === 'Doctor' || r === 'Nurse' || r === 'Patient'
    );
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwt(token);
  if (!payload?.exp) return false;
  return Date.now() >= payload.exp * 1000;
}
