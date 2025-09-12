
'use client';
import { getAuth, Auth } from 'firebase/auth';
import { app } from '@/lib/firebase';
import {
  createContext,
  useContext,
  ReactNode,
} from 'react';

const AuthContext = createContext<Auth | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = getAuth(app);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useFirebaseAuth = () => {
  return useContext(AuthContext);
};
