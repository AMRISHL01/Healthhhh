
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { systemLogs } from "@/lib/data";
import { format } from "date-fns";
import { useTranslation } from "@/hooks/use-translation";

export default function SystemLogsPage() {
    const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('System Logs')}</CardTitle>
        <CardDescription>
          {t('An audit trail of all actions and alerts within the system.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Timestamp')}</TableHead>
              <TableHead>{t('User / System')}</TableHead>
              <TableHead>{t('Action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {systemLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  {format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss")}
                </TableCell>
                <TableCell className="font-medium">{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
