import {
  Activity,
  Droplet,
  Thermometer,
  HeartPulse,
  AlertTriangle,
  WandSparkles,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { patientUser } from '@/lib/data';
import VitalsChart from './vitals-chart';
import AiSummary from './ai-summary';
import VitalsForm from './vitals-form';
import { cn } from '@/lib/utils';
import { generateAiHealthSummary } from '@/ai/flows/generate-ai-health-summaries';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { useTranslation } from '@/hooks/use-translation';


async function AiSummaryWrapper() {
  let summary: string | null = null;
  let hasError = false;
  try {
    const result = await generateAiHealthSummary({
      vitalsData: JSON.stringify(patientUser.vitals),
    });
    summary = result.summary;
  } catch (error) {
    console.error('Failed to generate AI summary:', error);
    hasError = true;
  }
  return <AiSummary summary={summary} loading={false} hasError={hasError} />;
}

function AiSummaryFallback() {
  // This is a client component, so it can use hooks.
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WandSparkles className="h-5 w-5 text-primary" />
          {t('AI Health Summary')}
        </CardTitle>
        <CardDescription>
          {t('An AI-generated overview of your recent health data.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardContent>
    </Card>
  );
}

// We create a separate client component for the main content
// to handle translations.
function PatientDashboardClient() {
  const { t } = useTranslation();
  const latestVitals = patientUser.vitals[0];
  const isCritical = patientUser.alertStatus === 'critical';

  const vitalCards = [
    {
      title: 'Heart Rate',
      value: `${latestVitals.heartRate} bpm`,
      icon: HeartPulse,
      color: 'text-red-500',
    },
    {
      title: 'SpO₂',
      value: `${latestVitals.spo2}%`,
      icon: Droplet,
      color: 'text-blue-500',
    },
    {
      title: 'Temperature',
      value: `${latestVitals.temperature}°C`,
      icon: Thermometer,
      color: 'text-orange-500',
    },
  ];

  return (
     <div className="space-y-6">
      {isCritical && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold text-destructive">
              <AlertTriangle className="mr-2 inline-block h-5 w-5" />
              {t('Critical Alert!')}
            </CardTitle>
            <Button asChild variant="destructive">
              <Link href="/patient/emergency">{t('Get Help Now')}</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              {t(
                'Your recent vitals are outside the normal range. Please seek immediate medical attention.'
              )}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-full grid gap-6 sm:grid-cols-3">
          {vitalCards.map((vital) => (
            <Card key={vital.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t(vital.title)}
                </CardTitle>
                <vital.icon
                  className={cn('h-4 w-4 text-muted-foreground', vital.color)}
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vital.value}</div>
                <p className="text-xs text-muted-foreground">
                  {t('Latest reading from today')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="col-span-full lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                {t('Vitals History')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VitalsChart vitals={patientUser.vitals} />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full space-y-6 lg:col-span-1">
          <Suspense fallback={<AiSummaryFallback />}>
            {/* @ts-ignore */}
            <AiSummaryWrapper />
          </Suspense>
          <VitalsForm />
        </div>
      </div>
    </div>
  )
}


export default function PatientDashboard() {
  return <PatientDashboardClient />;
}
