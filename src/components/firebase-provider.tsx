
'use client';
import { AuthProvider } from '@/hooks/use-firebase-auth';

export default function FirebaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
