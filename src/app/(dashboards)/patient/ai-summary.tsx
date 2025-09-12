
'use client';
import { WandSparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/use-translation";

type AiSummaryProps = {
  summary: string | null;
  loading: boolean;
  hasError: boolean;
};

export default function AiSummary({ summary, loading, hasError }: AiSummaryProps) {
    const { t } = useTranslation();

    const displaySummary = hasError
    ? t('Could not generate AI summary at this time.')
    : summary;

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
          <p className="text-sm text-muted-foreground">{displaySummary}</p>
        )}
      </CardContent>
    </Card>
  );
}
