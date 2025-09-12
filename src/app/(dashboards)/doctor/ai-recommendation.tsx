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

type AiRecommendationProps = {
  patient: Patient;
};

export default async function AiRecommendation({ patient }: AiRecommendationProps) {
    if (!patient.vitals || patient.vitals.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <WandSparkles className="h-5 w-5 text-primary" />
                        AI Care Recommendation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">No vitals data available for recommendation.</p>
                </CardContent>
            </Card>
        )
    }

    const latestVitals = patient.vitals[0];
    let recommendation: string;
    try {
        const result = await generateCareRecommendation({
            patientId: patient.id,
            heartRate: latestVitals.heartRate,
            spo2: latestVitals.spo2,
            temperature: latestVitals.temperature,
        });
        recommendation = result.recommendation;
    } catch (error) {
        console.error(`Failed to get AI recommendation for patient ${patient.id}:`, error);
        recommendation = "Could not generate AI recommendation at this time.";
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <WandSparkles className="h-5 w-5 text-primary" />
                    AI Care Recommendation
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{recommendation}</p>
            </CardContent>
        </Card>
    );
}

export function AiRecommendationLoader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WandSparkles className="h-5 w-5 text-primary" />
          AI Care Recommendation
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
