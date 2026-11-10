"use client";

import * as React from "react";
import icon from "@/app/icon.png";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  LifeBuoyIcon,
  SendIcon,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import { User } from "@/types/auth.types";

const user:User|null = useAuthStore.getState().user;
const data = {
  user: {
    name: user?.name,
    email: user?.email,
    avatar: user?.avatarUrl,
  },
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: <TerminalSquareIcon />,
      isActive: true,
    },
    {
      title: "Explore Jobs",
      url: "#",
      icon: <BotIcon />,
    },
    {
      title: user?.role === "candidate" ? "Applied Jobs" : "Posted Jobs",
      url: "#",
      icon: <BookOpenIcon />,
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: <LifeBuoyIcon />,
    },
    {
      title: "Feedback",
      url: "#",
      icon: <SendIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
                <Image src={icon} className="size-8" alt="icon"/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight pt-4">
                <span className="truncate font-bold text-primary ">खोजौ JAGIR</span>
                <span className="truncate text-xs">
                  {user?.role?.toUpperCase()} DASHBOARD
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
