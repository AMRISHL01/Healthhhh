
'use client';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { generateCareRecommendation } from "@/ai/flows/ai-generated-recommendations-for-doctors";
import type { Patient } from "@/lib/types";
import { WandSparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useState } from "react";

type AiRecommendationProps = {
  patient: Patient;
};

export default function AiRecommendation({ patient }: AiRecommendationProps) {
    const { t } = useTranslation();
    const [recommendation, setRecommendation] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function getRecommendation() {
            if (!patient.vitals || patient.vitals.length === 0) {
                 setRecommendation(t('No vitals data available for recommendation.'));
                 setLoading(false);
                return
            }

            setLoading(true);
            const latestVitals = patient.vitals[0];
            try {
                const result = await generateCareRecommendation({
                    patientId: patient.id,
                    heartRate: latestVitals.heartRate,
                    spo2: latestVitals.spo2,
                    temperature: latestVitals.temperature,
                });
                setRecommendation(result.recommendation);
            } catch (error) {
                console.error(`Failed to get AI recommendation for patient ${patient.id}:`, error);
                setRecommendation(t("Could not generate AI recommendation at this time."));
            } finally {
                setLoading(false);
            }
        }
        getRecommendation();
    }, [patient, t]);
    
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
