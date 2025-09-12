import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function RoleManagementPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>Manage user roles and permissions.</CardDescription>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Role
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Role management interface coming soon.</p>
      </CardContent>
    </Card>
  );
}
