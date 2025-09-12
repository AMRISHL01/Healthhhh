
'use client';
import { WandSparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateAiHealthSummary } from "@/ai/flows/generate-ai-health-summaries";
import type { Vital } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useState } from "react";

type AiSummaryProps = {
  vitals: Vital[];
};

export default function AiSummary({ vitals }: AiSummaryProps) {
    const { t } = useTranslation();
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSummary() {
            setLoading(true);
            try {
                const { summary } = await generateAiHealthSummary({
                    vitalsData: JSON.stringify(vitals),
                });
                setSummary(summary);
            } catch (error) {
                console.error("Failed to generate AI summary:", error);
                setSummary(t('Could not generate AI summary at this time.'));
            } finally {
                setLoading(false);
            }
        }
        getSummary();
    }, [vitals, t]);


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
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{summary}</p>
        )}
      </CardContent>
    </Card>
  );
}
