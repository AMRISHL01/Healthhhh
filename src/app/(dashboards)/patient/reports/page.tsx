
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";

export default function HealthReportsPage() {
    const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center h-full">
      <Card>
        <CardHeader>
          <CardTitle>{t('Health Reports')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t('Health reports page coming soon!')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
