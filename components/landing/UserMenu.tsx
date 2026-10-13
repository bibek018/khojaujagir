"use client";
import { toast } from "sonner";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/lib/app";
import { useAuthStore } from "@/stores/authStore";
export const UserMenu = ({ user }: { user: User }) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const toastID = toast.loading("Logging you out...");
    try {
      const response = await api.post("/auth/v1/logout");
      toast.success(response.data.message, {
        id: toastID,
      });
      setAuth(null, null);
      router.replace("/");
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message ||
          (err.request
            ? "Cannot reach server. Check your connection."
            : "Something went wrong")
        : "Something went wrong";
      toast.error(message, { id: toastID });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 overflow-hidden rounded-full p-0 bg-secondary focus:bg-secondary-active"
          >
            {user.avatarUrl ? (
              <Image
                src={`${user.avatarUrl}`}
                width={40}
                height={40}
                className="h-full w-full object-cover"
                alt="profile-image"
              />
            ) : (
              `${user.name[0]}`
            )}
          </Button>
        }
      />
      <DropdownMenuContent className="bg-background">
        <DropdownMenuItem className="cursor-pointer">
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          className="cursor-pointer"
        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
