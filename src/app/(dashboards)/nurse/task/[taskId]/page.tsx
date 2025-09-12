
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { nurseTasks, patients } from "@/lib/data";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TaskCompletionPage({ params }: { params: { taskId: string } }) {
  const task = nurseTasks.find((t) => t.id === params.taskId);

  if (!task) {
    notFound();
  }
  
  const patient = patients.find((p) => p.id === task.patientId);

  return (
    <div>
       <Link href="/nurse" className="flex items-center gap-2 text-sm text-muted-foreground hover:underline mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>
            Complete the task and leave notes for the doctor.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Patient: {task.patientName}</h3>
            {patient && <p className="text-sm text-muted-foreground">{patient.age} years old, {patient.gender}</p>}
          </div>
           <div className="space-y-2">
            <h3 className="font-semibold">Scheduled Time</h3>
            <p className="text-sm text-muted-foreground">{format(new Date(task.time), "MMMM d, yyyy 'at' p")}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Task Description</h3>
            <p className="text-sm text-muted-foreground">
              {task.task}
            </p>
          </div>
           <div className="space-y-2">
              <Label htmlFor="notes">Visit Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter your observations, actions taken, and any patient feedback..."
                defaultValue={task.notes}
                readOnly={task.status === 'completed'}
              />
            </div>
        </CardContent>
        <CardFooter>
          {task.status === 'pending' && (
             <Button>Mark as Complete</Button>
          )}
           {task.status === 'completed' && (
             <p className="text-sm text-green-600 font-medium">This task has been completed.</p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
