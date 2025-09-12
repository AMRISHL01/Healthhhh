
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import Image from "next/image";

export default function LandingPage() {
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
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-headline text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Monitor patients remotely with AI + IoT
            </h1>
            <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
              HealthFlow brings cutting-edge technology to healthcare, enabling
              continuous and connected patient monitoring for better outcomes.
            </p>
             <div className="mt-4 flex gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#demo">See Demo</Link>
              </Button>
            </div>
          </div>
        </section>
        <section
          id="demo"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              See It In Action
            </h2>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              Watch this short video to see how HealthFlow can revolutionize
              remote patient care.
            </p>
          </div>
          <div className="mx-auto max-w-4xl rounded-lg border bg-card shadow-sm">
            <div className="aspect-video w-full">
              <Image
                src="https://picsum.photos/seed/demovid/1280/720"
                alt="App Demo Video"
                width={1280}
                height={720}
                className="rounded-lg"
                data-ai-hint="app video"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by You, Powered by AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
