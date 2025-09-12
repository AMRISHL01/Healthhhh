
import {
  Activity,
  WandSparkles,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { patientUser } from '@/lib/data';
import AiSummary from './ai-summary';
import VitalsForm from './vitals-form';
import { generateAiHealthSummary } from '@/ai/flows/generate-ai-health-summaries';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import PatientDashboardClient from './patient-dashboard-client';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WandSparkles className="h-5 w-5 text-primary" />
          AI Health Summary
        </CardTitle>
        <CardDescription>
          An AI-generated overview of your recent health data.
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


export default function PatientDashboard() {
  return (
    <PatientDashboardClient>
        <Suspense fallback={<AiSummaryFallback />}>
            {/* @ts-ignore */}
            <AiSummaryWrapper />
        </Suspense>
        <VitalsForm />
    </PatientDashboardClient>
  );
}
