
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo';
import { useTranslation } from '@/hooks/use-translation';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
    const { t } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: t('Password Reset Email Sent'),
      description: t('If an account exists for {{email}}, a password reset link has been sent.', { email: values.email }),
    });
    form.reset();
  }

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
          <CardTitle className="text-2xl">{t('Forgot Password')}</CardTitle>
          <CardDescription>
            {t('Enter your email and we will send you a link to reset your password.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Email')}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t('Send Reset Link')}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t('Remember your password? ')}{' '}
            <Link href="/login" className="underline">
              {t('Log in')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
