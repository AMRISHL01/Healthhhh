
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LogOut,
  Settings,
  User,
  Shield,
  Users,
  BarChart,
  FileText,
  MessageSquare,
  ClipboardList,
  Server,
  FileCog,
  ShieldAlert,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { patientUser, doctorUser, nurseUser, adminUser } from "@/lib/data";
import { useAuth } from "../(auth)/auth-provider";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };
  
  const getUserData = () => {
    if (user?.role === "doctor") return { data: doctorUser, role: "Doctor" };
    if (user?.role === "patient") return { data: patientUser, role: "Patient" };
    if (user?.role === "nurse") return { data: nurseUser, role: "Nurse" };
    if (user?.role === "admin") return { data: adminUser, role: "Admin" };
    return { data: patientUser, role: "Patient" }; // Default
  };

  const { data: userData, role } = getUserData();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  const getNavItems = () => {
    if (user?.role === "doctor") {
      return [
        { href: "/doctor", icon: Home, label: "Dashboard" },
        { href: "/doctor/analytics", icon: BarChart, label: "Analytics" },
        { href: "/doctor/tasks", icon: ClipboardList, label: "Tasks & Scheduling" },
        { href: "#", icon: Settings, label: "Settings" },
      ];
    }
    if (user?.role === "patient") {
       const items = [
        { href: "/patient", icon: Home, label: "Dashboard" },
        { href: "/patient/reports", icon: FileText, label: "Health Reports" },
        { href: "/patient/chat", icon: MessageSquare, label: "Chat with Doctor" },
      ];

      if (patientUser.alertStatus === 'critical') {
        items.push({ href: "/patient/emergency", icon: ShieldAlert, label: "Emergency" });
      }

      items.push(
        { href: "#", icon: User, label: "Profile" },
        { href: "#", icon: Settings, label: "Settings" }
      );
      return items;
    }
    if (user?.role === "nurse") {
      return [
        { href: "/nurse", icon: Home, label: "Dashboard" },
        { href: "#", icon: User, label: "Profile" },
        { href: "#", icon: Settings, label: "Settings" },
      ];
    }
     if (user?.role === "admin") {
      return [
        { href: "/admin", icon: Home, label: "Dashboard" },
        { href: "/admin/roles", icon: Users, label: "Role Management" },
        { href: "/admin/logs", icon: FileCog, label: "System Logs" },
        { href: "#", icon: Settings, label: "Settings" },
      ];
    }
    return [];
  };

  const navItems = getNavItems();
  
  const getDashboardTitle = () => {
    if (user?.role === "doctor") return "Doctor Dashboard";
    if (user?.role === "patient") return "Patient Dashboard";
    if (user?.role === "nurse") return "Nurse Dashboard";
    if (user?.role === "admin") return "Admin Dashboard";
    return "Dashboard";
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-semibold">HealthFlow</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className={item.label === 'Emergency' ? 'text-destructive hover:bg-destructive/10 hover:text-destructive' : ''}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://picsum.photos/seed/${userData.avatar}/100/100`}
                    alt={user.displayName || 'User'}
                  />
                  <AvatarFallback>{(user.displayName || 'U').charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold">{user.displayName || 'User'}</p>
                  <p className="text-xs text-muted-foreground">
                    {role}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="right"
              sideOffset={16}
              className="w-56"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="font-headline text-lg font-semibold md:text-xl">
             {getDashboardTitle()}
            </h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Shield className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </header>
        <main className="flex-1 bg-background p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
