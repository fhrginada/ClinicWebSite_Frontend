'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ClinicRole } from '@/src/auth/jwt';
import { useAuth } from '@/src/context/AuthContext';

export default function RequireAuth({
  allowedRoles,
  children,
}: {
  allowedRoles: ClinicRole[];
  children: React.ReactNode;
}) {
  const { isAuthenticated, roles } = useAuth();
  const router = useRouter();
  const pathname = usePathname() ?? '/';

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (allowedRoles.length > 0 && !allowedRoles.some((r) => roles.includes(r))) {
      router.replace('/');
    }
  }, [allowedRoles, isAuthenticated, pathname, roles, router]);

  if (!isAuthenticated) return null;
  if (allowedRoles.length > 0 && !allowedRoles.some((r) => roles.includes(r))) return null;

  return <>{children}</>;
}
