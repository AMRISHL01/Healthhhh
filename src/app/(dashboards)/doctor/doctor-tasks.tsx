
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

type Task = {
  id: string;
  patientName: string;
  task: string;
  priority: 'high' | 'medium' | 'low';
}

type DoctorTasksProps = {
  tasks: Task[];
};

const priorityStyles = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-blue-100 text-blue-800 border-blue-200",
};

export default function DoctorTasks({ tasks }: DoctorTasksProps) {
    const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('My Tasks')}</CardTitle>
        <CardDescription>
          {t('A list of tasks needing your attention.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Patient')}</TableHead>
              <TableHead>{t('Task')}</TableHead>
              <TableHead>{t('Priority')}</TableHead>
              <TableHead className="text-right">{t('Action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.patientName}</TableCell>
                <TableCell>{t(task.task)}</TableCell>
                <TableCell>
                   <Badge variant="outline" className={cn("capitalize", priorityStyles[task.priority])}>
                      {t(task.priority)}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    {t('View Patient')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
