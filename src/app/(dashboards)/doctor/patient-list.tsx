
"use client";

import Image from "next/image";
import type { Patient } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "@/hooks/use-translation";

type PatientListProps = {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient) => void;
};

const statusStyles = {
  normal: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  critical: "bg-red-100 text-red-800 border-red-200",
};

export default function PatientList({
  patients,
  selectedPatient,
  onSelectPatient,
}: PatientListProps) {
  const { t } = useTranslation();
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{t('Patient Overview')}</CardTitle>
        <CardDescription>{t('Select a patient to view details.')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col">
            {patients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => onSelectPatient(patient)}
                className={cn(
                  "flex items-center gap-4 p-4 text-left transition-colors hover:bg-muted/50 w-full",
                  selectedPatient?.id === patient.id && "bg-muted"
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`https://picsum.photos/seed/${patient.avatar}/100/100`}
                    alt={patient.name}
                    data-ai-hint="person portrait"
                  />
                  <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {patient.age}, {t(patient.gender)}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "capitalize",
                    statusStyles[patient.alertStatus]
                  )}
                >
                  {t(patient.alertStatus)}
                </Badge>
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
