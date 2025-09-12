import {
  Activity,
  Droplet,
  Thermometer,
  HeartPulse,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { patientUser } from "@/lib/data";
import VitalsChart from "./vitals-chart";
import AiSummary from "./ai-summary";
import VitalsForm from "./vitals-form";
import { cn } from "@/lib/utils";

export default function PatientDashboard() {
  const latestVitals = patientUser.vitals[0];
  const isCritical = patientUser.alertStatus === 'critical';

  const vitalCards = [
    {
      title: "Heart Rate",
      value: `${latestVitals.heartRate} bpm`,
      icon: HeartPulse,
      color: "text-red-500",
    },
    {
      title: "SpO₂",
      value: `${latestVitals.spo2}%`,
      icon: Droplet,
      color: "text-blue-500",
    },
    {
      title: "Temperature",
      value: `${latestVitals.temperature}°C`,
      icon: Thermometer,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      {isCritical && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold text-destructive">
              <AlertTriangle className="mr-2 inline-block h-5 w-5" />
              Critical Alert!
            </CardTitle>
             <Button asChild variant="destructive">
              <Link href="/patient/emergency">Get Help Now</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              Your recent vitals are outside the normal range. Please seek
              immediate medical attention.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-full grid gap-6 sm:grid-cols-3">
          {vitalCards.map((vital) => (
            <Card key={vital.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {vital.title}
                </CardTitle>
                <vital.icon
                  className={cn("h-4 w-4 text-muted-foreground", vital.color)}
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vital.value}</div>
                <p className="text-xs text-muted-foreground">
                  Latest reading from today
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="col-span-full lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Vitals History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VitalsChart vitals={patientUser.vitals} />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full space-y-6 lg:col-span-1">
          <AiSummary vitals={patientUser.vitals} />
          <VitalsForm />
        </div>
      </div>
    </div>
  );
}