
'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { nurseTasks } from '@/lib/data';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

export default function NurseDashboard() {
  const tasks = nurseTasks;
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Assigned Tasks')}</CardTitle>
        <CardDescription>
          {t('Here are the patient visits and tasks assigned to you.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Patient')}</TableHead>
              <TableHead>{t('Task')}</TableHead>
              <TableHead>{t('Time')}</TableHead>
              <TableHead>{t('Status')}</TableHead>
              <TableHead className="text-right">{t('Action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.patientName}</TableCell>
                <TableCell>{t(task.task)}</TableCell>
                <TableCell>{format(new Date(task.time), 'p')}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      task.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    )}
                  >
                    {t(task.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/nurse/task/${task.id}`}>{t('View Task')}</Link>
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
