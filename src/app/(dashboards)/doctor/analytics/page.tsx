
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, AlertTriangle } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function AnalyticsPage() {
    const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('Total Patients')}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              {t('+5 since last month')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('Active Alerts')}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              {t('1 critical, 2 warnings')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('Most Common Abnormality')}
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t('High Heart Rate')}</div>
            <p className="text-xs text-muted-foreground">
              {t('In 12% of patients')}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('Patient Risk Clusters')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t('Patient risk cluster analysis coming soon.')}</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>{t('Trend Analytics')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t('Cross-patient trend analysis coming soon.')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
