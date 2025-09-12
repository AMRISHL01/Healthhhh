
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { WandSparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AiRecommendation({ recommendation }: { recommendation: string | null }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <WandSparkles className="h-5 w-5 text-primary" />
                    AI Care Recommendation
                </CardTitle>
            </CardHeader>
            <CardContent>
                {recommendation ? (
                    <p className="text-sm text-muted-foreground">{recommendation}</p>
                ) : (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
