
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";

export default function TasksPage() {
    const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center h-full">
      <Card>
        <CardHeader>
          <CardTitle>{t('Tasks & Scheduling')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t('Task and scheduling page coming soon!')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
