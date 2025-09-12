"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { doctorUser, patientUser, nurseUser, adminUser } from "@/lib/data";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDoctor = pathname.startsWith("/doctor");
  const isPatient = pathname.startsWith("/patient");
  const isNurse = pathname.startsWith("/nurse");
  const isAdmin = pathname.startsWith("/admin");

  const getUser = () => {
    if (isDoctor) return { user: doctorUser, role: "Doctor" };
    if (isPatient) return { user: patientUser, role: "Patient" };
    if (isNurse) return { user: nurseUser, role: "Nurse" };
    if (isAdmin) return { user: adminUser, role: "Admin" };
    return { user: patientUser, role: "Patient" }; // Default
  };

  const { user, role } = getUser();

  const getNavItems = () => {
    if (isDoctor) {
      return [
        { href: "/doctor", icon: Home, label: "Dashboard" },
        { href: "/doctor/analytics", icon: BarChart, label: "Analytics" },
        { href: "/doctor/tasks", icon: ClipboardList, label: "Tasks & Scheduling" },
        { href: "#", icon: Settings, label: "Settings" },
      ];
    }
    if (isPatient) {
      return [
        { href: "/patient", icon: Home, label: "Dashboard" },
        { href: "/patient/reports", icon: FileText, label: "Health Reports" },
        { href: "/patient/chat", icon: MessageSquare, label: "Chat with Doctor" },
        { href: "#", icon: User, label: "Profile" },
        { href: "#", icon: Settings, label: "Settings" },
      ];
    }
    if (isNurse) {
      return [
        { href: "/nurse", icon: Home, label: "Dashboard" },
        { href: "#", icon: User, label: "Profile" },
        { href: "#", icon: Settings, label: "Settings" },
      ];
    }
     if (isAdmin) {
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
    if (isDoctor) return "Doctor Dashboard";
    if (isPatient) return "Patient Dashboard";
    if (isNurse) return "Nurse Dashboard";
    if (isAdmin) return "Admin Dashboard";
    return "Dashboard";
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
                    src={`https://picsum.photos/seed/${user.avatar}/100/100`}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold">{user.name}</p>
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
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
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
