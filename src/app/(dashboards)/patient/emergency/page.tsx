
'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Phone, ShieldAlert } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function EmergencyResponsePage() {
    const { t } = useTranslation();
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <Card className="w-full max-w-lg border-destructive bg-destructive/5">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold text-destructive">
            {t('Emergency Assistance Required')}
          </CardTitle>
          <CardDescription className="text-lg">
            {t('Your vitals indicate a critical situation. Please take action immediately.')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            {t('Use the button below to call emergency services. Show them your vitals on the app when they arrive.')}
          </p>
          <Button
            size="lg"
            className="w-full text-lg h-16"
            variant="destructive"
            asChild
          >
            <a href="tel:911">
              <Phone className="mr-4 h-6 w-6" />
              {t('Call Ambulance (911)')}
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            {t('If you are unable to call, please ask someone nearby for help.')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
