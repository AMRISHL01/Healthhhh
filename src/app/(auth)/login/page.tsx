
'use client';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginForm } from './login-form';
import Logo from '@/components/logo';
import { useTranslation } from '@/hooks/use-translation';

export default function LoginPage() {
    const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="absolute top-4 left-4">
         <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-semibold">HealthFlow</span>
          </Link>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t('Login')}</CardTitle>
          <CardDescription>
            {t('Enter your email below to login to your account.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            {t("Don't have an account?")}{' '}
            <Link href="/signup" className="underline">
              {t('Sign up')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
