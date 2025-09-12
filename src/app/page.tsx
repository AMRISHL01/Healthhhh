
'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import Image from "next/image";
import { useTranslation } from "@/hooks/use-translation";

export default function LandingPage() {
    const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-semibold">HealthFlow</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">{t('Login')}</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">{t('Sign Up')}</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-headline text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              {t('Monitor patients remotely with AI + IoT')}
            </h1>
            <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
              {t('HealthFlow brings cutting-edge technology to healthcare, enabling continuous and connected patient monitoring for better outcomes.')}
            </p>
             <div className="mt-4 flex gap-4">
              <Button asChild size="lg">
                <Link href="/signup">{t('Get Started')}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">{t('See Demo')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t('Built by You, Powered by AI.')}
          </p>
        </div>
      </footer>
    </div>
  );
}
