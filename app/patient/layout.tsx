import RequireAuth from '@/components/RequireAuth';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth allowedRoles={['Patient']}>
      <div className="min-h-screen">{children}</div>
    </RequireAuth>
  );
}

