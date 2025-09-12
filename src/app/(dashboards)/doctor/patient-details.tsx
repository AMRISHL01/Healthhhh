import type { Patient } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HeartPulse,
  Droplet,
  Thermometer,
  WandSparkles,
  Activity,
  User,
} from "lucide-react";
import VitalsChart from "../patient/vitals-chart";
import { generateCareRecommendation } from "@/ai/flows/ai-generated-recommendations-for-doctors";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PatientDetailsProps = {
  patient: Patient | null;
};

async function AiRecommendation({ patient }: { patient: Patient }) {
  const latestVitals = patient.vitals[0];
  const { recommendation } = await generateCareRecommendation({
    patientId: patient.id,
    heartRate: latestVitals.heartRate,
    spo2: latestVitals.spo2,
    temperature: latestVitals.temperature,
  });

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

export default function PatientDetails({ patient }: PatientDetailsProps) {
  if (!patient) {
    return (
      <Card className="flex h-full flex-col items-center justify-center">
        <CardContent className="text-center">
          <User className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Select a patient</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a patient from the list to see their details.
          </p>
        </CardContent>
      </Card>
    );
  }

  const latestVitals = patient.vitals[0];

  const vitalCards = [
    { title: "Heart Rate", value: `${latestVitals.heartRate} bpm`, icon: HeartPulse },
    { title: "SpO₂", value: `${latestVitals.spo2}%`, icon: Droplet },
    { title: "Temperature", value: `${latestVitals.temperature}°C`, icon: Thermometer },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`https://picsum.photos/seed/${patient.avatar}/100/100`} alt={patient.name} />
            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{patient.name}</CardTitle>
            <CardDescription>{patient.age} years old, {patient.gender}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {vitalCards.map((vital) => (
              <div key={vital.title} className="flex items-center gap-4 rounded-lg border p-4">
                <vital.icon className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{vital.title}</p>
                  <p className="text-xl font-bold">{vital.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Vitals History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VitalsChart vitals={patient.vitals} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <AiRecommendation patient={patient} />
        </div>
      </div>
    </div>
  );
}
