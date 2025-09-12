
'use client';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { WandSparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/use-translation";

type AiRecommendationProps = {
  recommendation: string | null;
  loading: boolean;
};

export default function AiRecommendation({ recommendation, loading }: AiRecommendationProps) {
    const { t } = useTranslation();
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <WandSparkles className="h-5 w-5 text-primary" />
                    {t('AI Care Recommendation')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ) : (
                    <p className="text-sm text-muted-foreground">{recommendation}</p>
                )}
            </CardContent>
        </Card>
    );
}

export function AiRecommendationLoader() {
    const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WandSparkles className="h-5 w-5 text-primary" />
          {t('AI Care Recommendation')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardContent>
    </Card>
  );
}
