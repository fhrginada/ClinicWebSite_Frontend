import RequireAuth from '@/components/RequireAuth';

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth allowedRoles={['Doctor']}>
      <div className="min-h-screen">{children}</div>
    </RequireAuth>
  );
}

