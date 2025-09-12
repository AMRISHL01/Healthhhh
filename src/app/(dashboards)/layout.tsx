
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
import LanguageSwitcher from "@/components/language-switcher";
import { useTranslation } from "@/hooks/use-translation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogout = () => {
    router.push('/login');
  };
  
  const getRoleFromPath = () => {
    if (pathname.startsWith("/doctor")) return "doctor";
    if (pathname.startsWith("/patient")) return "patient";
    if (pathname.startsWith("/nurse")) return "nurse";
    if (pathname.startsWith("/admin")) return "admin";
    return "patient"; // Default
  }

  const role = getRoleFromPath();

  const getUserData = () => {
    if (role === "doctor") return { data: doctorUser, role: "Doctor", name: doctorUser.name };
    if (role === "patient") return { data: patientUser, role: "Patient", name: patientUser.name };
    if (role === "nurse") return { data: nurseUser, role: "Nurse", name: nurseUser.name };
    if (role === "admin") return { data: adminUser, role: "Admin", name: adminUser.name };
    return { data: patientUser, role: "Patient", name: "User" }; // Default
  };

  const { data: userData, role: roleName, name } = getUserData();

  const getNavItems = () => {
    if (role === "doctor") {
      return [
        { href: "/doctor", icon: Home, label: t("Dashboard") },
        { href: "/doctor/analytics", icon: BarChart, label: t("Analytics") },
        { href: "/doctor/tasks", icon: ClipboardList, label: t("Tasks & Scheduling") },
        { href: "#", icon: Settings, label: t("Settings") },
      ];
    }
    if (role === "patient") {
       const items = [
        { href: "/patient", icon: Home, label: t("Dashboard") },
        { href: "/patient/reports", icon: FileText, label: t("Health Reports") },
        { href: "/patient/chat", icon: MessageSquare, label: t("Chat with Doctor") },
      ];

      if (patientUser.alertStatus === 'critical') {
        items.push({ href: "/patient/emergency", icon: ShieldAlert, label: t("Emergency") });
      }

      items.push(
        { href: "#", icon: User, label: t("Profile") },
        { href: "#", icon: Settings, label: t("Settings") }
      );
      return items;
    }
    if (role === "nurse") {
      return [
        { href: "/nurse", icon: Home, label: t("Dashboard") },
        { href: "#", icon: User, label: t("Profile") },
        { href: "#", icon: Settings, label: t("Settings") },
      ];
    }
     if (role === "admin") {
      return [
        { href: "/admin", icon: Home, label: t("Dashboard") },
        { href: "/admin/roles", icon: Users, label: t("Role Management") },
        { href: "/admin/logs", icon: FileCog, label: t("System Logs") },
        { href: "#", icon: Settings, label: t("Settings") },
      ];
    }
    return [];
  };

  const navItems = getNavItems();
  
  const getDashboardTitle = () => {
    if (role === "doctor") return t("Doctor Dashboard");
    if (role === "patient") return t("Patient Dashboard");
    if (role === "nurse") return t("Nurse Dashboard");
    if (role === "admin") return t("Admin Dashboard");
    return t("Dashboard");
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
                    alt={name}
                  />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t(roleName)}
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
              <DropdownMenuLabel>{t('My Account')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{t('Profile')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t('Settings')}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('Log out')}</span>
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
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Shield className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 bg-background p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
