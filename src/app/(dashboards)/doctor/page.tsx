
"use client";

import { useState, Suspense } from "react";
import type { Patient } from "@/lib/types";
import { patients, doctorTasks } from "@/lib/data";
import PatientList from "./patient-list";
import PatientDetails from "./patient-details";
import AiRecommendation from "./ai-recommendation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertTriangle, ClipboardList } from "lucide-react";
import DoctorTasks from "./doctor-tasks";
import { Skeleton } from "@/components/ui/skeleton";

function AiRecommendationLoader() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                     <Skeleton className="h-5 w-5" />
                     <Skeleton className="h-5 w-40" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </CardContent>
        </Card>
    )
}


export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(patients[0]);
  const criticalAlerts = patients.filter(p => p.alertStatus === 'critical').length;

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

      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <PatientList
            patients={patients}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
          />
        </div>
        <div className="md:col-span-2">
          {selectedPatient ? (
            <PatientDetails patient={selectedPatient}>
                <Suspense fallback={<AiRecommendationLoader />}>
                    {/* @ts-expect-error Async Server Component */}
                    <AiRecommendation patient={selectedPatient} />
                </Suspense>
            </PatientDetails>
          ) : (
             <DoctorTasks tasks={doctorTasks} />
          )}
        </div>
      </div>
    </div>
  );
}
