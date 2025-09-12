
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { patientUser } from "@/lib/data";
import { useTranslation } from "@/hooks/use-translation";

const formSchema = z.object({
  heartRate: z.coerce.number().min(30, "Invalid heart rate").max(220, "Invalid heart rate"),
  spo2: z.coerce.number().min(70, "Invalid SpO2 level").max(100, "Invalid SpO2 level"),
  temperature: z.coerce.number().min(35, "Invalid temperature").max(43, "Invalid temperature"),
  bloodPressure: z.string().regex(/^\d{2,3}\/\d{2,3}$/, "Invalid format (e.g., 120/80)"),
});

export default function VitalsForm() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heartRate: undefined,
      spo2: undefined,
      temperature: undefined,
      bloodPressure: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addDoc(collection(db, "vitals"), {
        patientId: patientUser.id,
        ...values,
        timestamp: serverTimestamp(),
      });
      toast({
        title: t("Vitals Submitted!"),
        description: t("Your latest health data has been saved to Firestore."),
        variant: 'default',
      });
      form.reset();
    } catch (error) {
       console.error("Error adding document: ", error);
       toast({
        title: t("Submission Failed"),
        description: t("There was an error saving your vitals. Please try again."),
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Log New Vitals')}</CardTitle>
        <CardDescription>
          {t('Enter your latest measurements below.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="heartRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Heart Rate (bpm)')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 72" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="spo2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SpO₂ (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 98" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="bloodPressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Blood Pressure (e.g. 120/80)')}</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 120/80" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Temperature (°C)')}</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="e.g., 36.8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {t('Submit Vitals')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
