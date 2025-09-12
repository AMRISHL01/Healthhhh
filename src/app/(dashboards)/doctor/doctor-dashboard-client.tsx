
'use client';

import { useState } from "react";
import type { Patient } from "@/lib/types";
import PatientList from "./patient-list";
import PatientDetails from "./patient-details";
import DoctorTasks from "./doctor-tasks";

type PatientWithRecommendation = Patient & { aiRecommendation: string };

type DoctorDashboardClientProps = {
    patients: PatientWithRecommendation[];
    tasks: { id: string; patientName: string; task: string; priority: 'high' | 'medium' | 'low' }[];
}

export default function DoctorDashboardClient({ patients, tasks }: DoctorDashboardClientProps) {
    const [selectedPatient, setSelectedPatient] = useState<PatientWithRecommendation | null>(patients[0] || null);

    return (
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
                <PatientDetails patient={selectedPatient} />
            ) : (
                <DoctorTasks tasks={tasks} />
            )}
            </div>
      </div>
    )
}
