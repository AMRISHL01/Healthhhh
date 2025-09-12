
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/logo';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Logo className="h-16 w-16" />
          <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
            Forgot Your Password?
          </h1>
          <p className="text-muted-foreground">
            No worries! Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your email address to get a password reset link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-sm">
          Remembered your password?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
