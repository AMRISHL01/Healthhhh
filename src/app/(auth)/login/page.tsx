import Link from "next/link";
import { Stethoscope, User } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/logo";

export default function RoleSelectionPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Logo className="h-16 w-16" />
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
            Welcome to HealthFlow Remote
          </h1>
          <p className="text-muted-foreground">
            Your partner in continuous and connected healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Link href="/patient" passHref>
            <Card className="transform-gpu cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl">Login as Patient</CardTitle>
                <CardDescription className="mt-2">
                  Access your health dashboard and vitals.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
          <Link href="/doctor" passHref>
            <Card className="transform-gpu cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Stethoscope className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl">Login as Doctor</CardTitle>
                <CardDescription className="mt-2">
                  View patient data and insights.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By logging in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
