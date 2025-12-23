import RequireAuth from '@/components/RequireAuth';

export default function NurseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth allowedRoles={['Nurse']}>
      <div className="min-h-screen">{children}</div>
    </RequireAuth>
  );
}

