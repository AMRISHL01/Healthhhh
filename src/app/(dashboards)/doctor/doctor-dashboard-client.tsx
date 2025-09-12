
'use client';

import { useState, useEffect } from "react";
import type { Patient } from "@/lib/types";
import PatientList from "./patient-list";
import PatientDetails from "./patient-details";
import DoctorTasks from "./doctor-tasks";
import { generateCareRecommendation } from "@/ai/flows/ai-generated-recommendations-for-doctors";
import { useTranslation } from "@/hooks/use-translation";

type DoctorDashboardClientProps = {
    patients: Patient[];
    tasks: { id: string; patientName: string; task: string; priority: 'high' | 'medium' | 'low' }[];
}

export default function DoctorDashboardClient({ patients, tasks }: DoctorDashboardClientProps) {
    const { t } = useTranslation();
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(patients.find(p => p.alertStatus === 'critical') || patients[0] || null);
    const [recommendation, setRecommendation] = useState<string | null>(null);
    const [loadingRecommendation, setLoadingRecommendation] = useState(true);

    useEffect(() => {
        async function getRecommendation() {
            if (!selectedPatient) return;

            if (!selectedPatient.vitals || selectedPatient.vitals.length === 0) {
                 setRecommendation(t('No vitals data available for recommendation.'));
                 setLoadingRecommendation(false);
                return
            }

            setLoadingRecommendation(true);
            try {
                const latestVitals = selectedPatient.vitals[0];
                const result = await generateCareRecommendation({
                    patientId: selectedPatient.id,
                    heartRate: latestVitals.heartRate,
                    spo2: latestVitals.spo2,
                    temperature: latestVitals.temperature,
                });
                setRecommendation(result.recommendation);
            } catch (error) {
                console.error(`Failed to get AI recommendation for patient ${selectedPatient.id}:`, error);
                setRecommendation(t("Could not generate AI recommendation at this time."));
            } finally {
                setLoadingRecommendation(false);
            }
        }
        getRecommendation();
    }, [selectedPatient, t]);


    return (
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <PatientList
                    patients={patients}
                    selectedPatient={selectedPatient}
                    onSelectPatient={setSelectedPatient}
                />
            </div>
            <div className="lg:col-span-2">
                {selectedPatient ? (
                    <PatientDetails 
                        patient={selectedPatient} 
                        recommendation={recommendation}
                        loadingRecommendation={loadingRecommendation}
                    />
                ) : (
                    <DoctorTasks tasks={tasks} />
                )}
            </div>
        </div>
    )
}
