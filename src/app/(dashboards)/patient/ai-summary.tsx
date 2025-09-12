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

type AiSummaryProps = {
  vitals: Vital[];
};

export default async function AiSummary({ vitals }: AiSummaryProps) {
  const { summary } = await generateAiHealthSummary({
    vitalsData: JSON.stringify(vitals),
  });

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
        {summary ? (
          <p className="text-sm text-muted-foreground">{summary}</p>
        ) : (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
