
import type { Patient } from "@/lib/types";
import { patients, doctorTasks, doctorUser } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertTriangle, ClipboardList } from "lucide-react";
import DoctorDashboardClient from "./doctor-dashboard-client";
import { generateCareRecommendation } from "@/ai/flows/ai-generated-recommendations-for-doctors";

type PatientWithRecommendation = Patient & {
  aiRecommendation: string;
};

async function getRecommendationsForPatients(patients: Patient[]): Promise<PatientWithRecommendation[]> {
    const recommendations = await Promise.all(
        patients.map(async (patient) => {
            if (!patient.vitals || patient.vitals.length === 0) {
                return { ...patient, aiRecommendation: "No vitals data available for recommendation." };
            }
            const latestVitals = patient.vitals[0];
            try {
                const { recommendation } = await generateCareRecommendation({
                    patientId: patient.id,
                    heartRate: latestVitals.heartRate,
                    spo2: latestVitals.spo2,
                    temperature: latestVitals.temperature,
                });
                return { ...patient, aiRecommendation: recommendation };
            } catch (error) {
                console.error(`Failed to get AI recommendation for patient ${patient.id}:`, error);
                return { ...patient, aiRecommendation: "Could not generate AI recommendation at this time." };
            }
        })
    );
    return recommendations;
}


export default async function DoctorDashboardPage() {
  const criticalAlerts = patients.filter(p => p.alertStatus === 'critical').length;
  const patientsWithRecommendations = await getRecommendationsForPatients(patients);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">Managed by you</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">Critical alerts needing review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctorTasks.length}</div>
            <p className="text-xs text-muted-foreground">Tasks to be completed</p>
          </CardContent>
        </Card>
      </div>

     <DoctorDashboardClient 
        patients={patientsWithRecommendations}
        tasks={doctorTasks}
     />
    </div>
  );
}

