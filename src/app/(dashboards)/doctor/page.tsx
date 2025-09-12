"use client";

import { useState } from "react";
import type { Patient } from "@/lib/types";
import { patients } from "@/lib/data";
import PatientList from "./patient-list";
import PatientDetails from "./patient-details";
import AiRecommendation from "./ai-recommendation";

export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(patients[0]);

  return (
    <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      <div className="md:col-span-1 lg:col-span-1">
        <PatientList
          patients={patients}
          selectedPatient={selectedPatient}
          onSelectPatient={setSelectedPatient}
        />
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        <PatientDetails patient={selectedPatient}>
          <AiRecommendation patient={selectedPatient!} />
        </PatientDetails>
      </div>
    </div>
  );
}
