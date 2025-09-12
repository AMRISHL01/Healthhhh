
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';

const permissions = [
  { id: 'view_patient_data', label: 'View Patient Data' },
  { id: 'edit_patient_data', label: 'Edit Patient Data' },
  { id: 'manage_users', label: 'Manage Users' },
  { id: 'view_system_logs', label: 'View System Logs' },
  { id: 'manage_roles', label: 'Manage Roles' },
] as const;

const formSchema = z.object({
  roleName: z.string().min(2, {
    message: 'Role name must be at least 2 characters.',
  }),
  permissions: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one permission.',
  }),
});

export default function RoleManagementPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleName: '',
      permissions: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('New role created:', values);
    toast({
      title: t('Role Created (Simulated)'),
      description: t('The role "{{roleName}}" has been successfully created.', {roleName: values.roleName}),
    });
    form.reset();
    setIsOpen(false);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t('Role Management')}</CardTitle>
          <CardDescription>{t('Manage user roles and permissions.')}</CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('Add New Role')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('Add New Role')}</DialogTitle>
              <DialogDescription>
                {t('Define a new role and set its permissions.')}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="roleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Role Name')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('e.g., Senior Nurse')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="permissions"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">{t('Permissions')}</FormLabel>
                      </div>
                      {permissions.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="permissions"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {t(item.label)}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">{t('Create Role')}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {t('Role management interface coming soon.')}
        </p>
      </CardContent>
    </Card>
  );
}
