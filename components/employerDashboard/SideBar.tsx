"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Plus,
  Users,
  Search,
  Building2,
  Settings,
  LifeBuoy,
  LogOut,
  ChevronsUpDown,
  Command,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavigation = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Jobs",
    url: "/dashboard/my-jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applicants",
    url: "/dashboard/applicants",
    icon: Users,
  },
  {
    title: "Explore Jobs",
    url: "/jobs",
    icon: Search,
  },
  {
    title: "Company Profile",
    url: "/dashboard/company-profile",
    icon: Building2,
  },
];

interface EmployerSidebarProps {
  name?: string;
  companyName?: string;
  email?: string;
  avatarUrl?: string;
  onLogout?: () => void;
}

export const SideBar = ({
  name = "Employer",
  companyName = "Your Company",
  email = "",
  avatarUrl,
  onLogout,
}: EmployerSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (url: string) => {
    if (url === "/dashboard") {
      return pathname === url;
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  };

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* Brand */}
      <SidebarHeader className="p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <BriefcaseBusiness className="size-5" />
          </div>

          <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-heading text-base font-bold tracking-tight">
              खोजौ <span className="text-primary">JAGIR</span>
            </span>
            <span className="text-xs text-muted-foreground">
              Employer workspace
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Main navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigation.map((item) => {
                const active = isActive(item.url);
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={item.title}
                      className="h-10 transition-colors"
                      onClick={() => router.push(item.url)}
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Primary action */}
        <SidebarGroup>
          <SidebarGroupLabel>Hiring</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  
                  tooltip="Post a Job"
                  className="h-10 bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground"
                >
                  <Link href="/dashboard/post-job">
                    <Plus />
                    <span>Post a Job</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom navigation and employer profile */}
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              
              isActive={isActive("/dashboard/settings")}
              tooltip="Settings"
            >
              <Link href="/dashboard/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton  tooltip="Help & Support">
              <Link href="/help">
                <LifeBuoy />
                <span>Help & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger >
                <SidebarMenuButton
                  size="lg"
                  tooltip={name}
                  className="mt-1 border border-sidebar-border"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-soft text-sm font-semibold text-primary">
                    {avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatarUrl}
                        alt={name}
                        className="size-full object-cover"
                      />
                    ) : (
                      initials || "E"
                    )}
                  </div>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {companyName}
                    </span>
                  </div>

                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align="end"
                sideOffset={8}
                className="w-60"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{name}</span>
                    {email && (
                      <span className="truncate text-xs font-normal text-muted-foreground">
                        {email}
                      </span>
                    )}
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem >
                  <Link href="/dashboard/company-profile">
                    <Building2 className="mr-2 size-4" />
                    Company Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem >
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                {onLogout && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={onLogout}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 size-4" />
                      Log out
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
